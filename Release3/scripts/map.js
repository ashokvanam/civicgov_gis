require([

    //Widgets
    "esri/widgets/LayerList",    
    "esri/widgets/Search",
    "esri/widgets/Sketch",
    "esri/widgets/DistanceMeasurement2D",
    "esri/widgets/AreaMeasurement2D",
    "esri/widgets/Legend",
    "esri/widgets/Expand",


    //Map Components
    "esri/views/MapView",
    "esri/WebMap",
    "esri/Map",
    "esri/layers/FeatureLayer",
    "esri/layers/GraphicsLayer",    
    "esri/layers/CSVLayer",
    "esri/Graphic",    
    "esri/tasks/support/Query",
    "esri/tasks/QueryTask",
    "esri/geometry/SpatialReference",
    "esri/PopupTemplate",

    //Service
    "esri/geometry/geometryEngine",
    "esri/geometry/support/webMercatorUtils",
    "esri/geometry/projection",
    


    
], function (
    LayerList, Search, Sketch,DistanceMeasurement2D,AreaMeasurement2D,Legend,Expand,
    MapView, WebMap, Map,FeatureLayer,
    GraphicsLayer, CSVLayer,Graphic,Query,QueryTask,SpatialReference,PopupTemplate,
    GeometryEngine, webMercatorUtils, projection
  ) {
    
    /************************************************************
     * Creates a new WebMap instance. A WebMap must reference
     * a PortalItem ID that represents a WebMap saved to
     * arcgis.com or an on-premise portal.
     *
     * To load a WebMap from an on-premise portal, set the portal
     * url with esriConfig.portalUrl.
     ************************************************************/
    var PARCEL_LAYER;
    var activeWidget = null;
    var zoomToResults= true;
    var isSpatialSearch = false;
   // initControls();
    var graphicSelectionLayer = new GraphicsLayer({
        id: 'Selection', title: 'Selected Parcel',
        listMode:'hide'
    });
    var graphicResultLayer = new GraphicsLayer({
        id: 'Results', title: 'Search Results'
    });
    function createPointGraphic(x,y){
        var point = {
            type: "point", // autocasts as new Point()
            longitude: x,
            latitude: y
          };
        // Create a graphic and add the geometry and symbol to it
        var pointGraphic = new Graphic({
            geometry: point,
            symbol: markerSymbol
          });
          return  pointGraphic;

    }
    function queryLinkedLayer(layerName,features){
        var layerConfig = map_config.search;
		var searchLayerConfig = getLayerConfig(layerName);
            var valuesToSearch= new Array();
            for (var i in features)
            {
                var eachGraphic = features[i];
                if (searchLayerConfig.keyFieldType == "text"){
                    valuesToSearch.push("'" + features[i].attributes[layerConfig.keyField] + "'");
                }
                else
                {
                    valuesToSearch.push(features[i].attributes[layerConfig.keyField]);
                }
            }
			
			
            var searchLayer = findLayerByName(layerName); //usually it is parcel layer
			
            var values = "(" + valuesToSearch.join() + ")";
            findByParcel(searchLayer,searchLayerConfig.keyField,"IN",values);
        
    }
    function getLayerConfig(layerName){

		for (var i in map_config.layers){
			var layerConfig = map_config.layers[i];
			if (layerConfig.name == layerName)
			{
				return layerConfig;
			}
		}
        // var layerConfig = map_config.layers.find(function(each){
            // return each.name=== layerName;
        // });
        // return layerConfig;
    }
    function findParcelLayer()
    {
        for (var i in webmap.layers.items) {
            // alert(webmap.layers.items[i].url);
            if (webmap.layers.items[i].title == 'Condo')
            {
                PARCEL_LAYER = webmap.layers.items[i];
                return;
            }
        }
    }
    function findLayerByName(layerName)
    {
        var featureLayer;
		var layers =  webmap.allLayers.items;
        for (var i in layers) {
            // alert(webmap.layers.items[i].url);
            if (layers[i].title == layerName)
            {
                featureLayer = layers[i];
                return featureLayer;
            }
        }
    }

   
    function exportResultsLayer()
    {
        var results = new Array();
        var searchIDs = new Array();
        if (graphicResultLayer.graphics.items.length == 0){
            document.getElementById('divResults').innerHTML = "No records found";
            return;
        }
        
       // displayFeatures(graphicResultLayer.graphics.items);
        var layerconfig =  getLayerConfig("Parcel");
        for (var i in graphicResultLayer.graphics.items)
        {
            var eachGraphic = graphicResultLayer.graphics.items[i];
            
            //results.push(eachGraphic.attributes[layerconfig.keyField]);
            searchIDs.push(eachGraphic.attributes[layerconfig.keyField])
        }
       // document.getElementById('divResults').innerHTML = JSON.stringify(results);
        for (var i in searchIDs){
            if (map_config.search.keyFieldType == "text"){
                searchIDs[i] = "'"+ searchIDs[i] +"'";
            }
        }
        if (isSpatialSearch){
            searchAddress(map_config.search.keyField,"in",searchIDs.join(","));
        }
		else{
		displayFeatures(graphicResultLayer.graphics.items);
		}
        
        
    }
	function exportResults(features)
    {
        var results = new Array();
        if (features.length == 0){
            document.getElementById('divResults').innerHTML = "No records found";
            
            return;
        }
        
        displayFeatures(features);
        for (var i in features)
        {
            var eachFeature = features[i];
            results.push(eachFeature.attributes[map_config.search.parcelLinkField]);
        }
        document.getElementById('divResults').innerHTML = JSON.stringify(results);
    }
    function setPopupOnLayers(){
        for (var item in map_config.layers){
            var layerConfig = map_config.layers[item];
            var foundLayer = webmap.allLayers.find(function(layer) {
                return layer.title === layerConfig.name;
               });
               if (foundLayer){
                foundLayer.popupEnabled = layerConfig.selectable;
                foundLayer.popupTemplate = {
                    title: layerConfig.name +":" + "{"+ layerConfig.keyField +"}",
                    content:generatePopupContent(layerConfig)
                  };
               }
        }
    }
    function addCGLayers(){
        
        for (var i in map_config.cg_layers){
            var layer = new CSVLayer({
                // URL to the service
                url:map_config.cg_layers[i].url,
                latitudeField:map_config.cg_layers[i].latitude,
                longitudeField:map_config.cg_layers[i].longitude,
                title:map_config.cg_layers[i].name,
                
                renderer :{
                    type:"simple",
                    symbol:map_config.cg_layers[i].style
                }
              });
              layer.popupEnabled = map_config.cg_layers[i].selectable;
              layer.popupTemplate = {
                    title: "{"+ map_config.cg_layers[i].keyField +"}",
                    content:generateRecordsPopupContent(map_config.cg_layers[i])
                  };
               
              // Pass a simple renderer to the layer
          //  layer.renderer = markerSymbol;
          
            webmap.add(layer);
        }
    }
	function createLayer(layerName){
		var layerConfig = getLayerConfig(layerName);
		
		const layer = new FeatureLayer({
		  // URL to the service
		  url: layerConfig.url
		});
		return layer;
    }
    function clearResults(){
        graphicResultLayer.removeAll();
        graphicSelectionLayer.removeAll();
        document.getElementById('divResultsAll').innerHTML ="";
        document.getElementById('divResults').innerHTML = "";
    }
	function searchAddress(field,operator,val){
        var where;
        if(isNaN(val)){ //if it is text
            field = 'upper(' + field + ')';
        }
        if (operator == "in"){
            where  = field + ' ' + operator + ' (' + val + ')';
        }
        else
        {
            if(isNaN(val)){ //if it is text
                val = 'upper(' + val + ')';
            }
            
            where  = field + ' ' + operator + ' ' + val;
        }
        querySearchRest(where);
	}
	function generateSearchControls()
	{
		//Math.floor((Math.random() * 10) + 1);
		for(var each in searchcontrols_config)
		{	
			var divSearchControl = searchControlSet(searchcontrols_config[each].name);			
			var btn ;
			var txt ;
			for (var i =0;i < divSearchControl.children.length; i++)
			{
				//alert(divSearchControl.children[i].type);
				if (divSearchControl.children[i].type == 'button')
				{
					btn = divSearchControl.children[i];
				}
				else if (divSearchControl.children[i].type == 'text')
				{
					txt = divSearchControl.children[i];
				}
            }
            // var searchLayer = findLayerByName(searchcontrols_config[each].layer);
			// if (!searchLayer)
			// {
				// searchLayer = createLayer(searchcontrols_config[each].layer);
			// }
            btn.relatedTxt = txt;
            btn.searchKeyField = searchcontrols_config[each].keyField;
            btn.searchKeyFieldType = searchcontrols_config[each].keyFieldType;
            btn.searchOperator = searchcontrols_config[each].operator;
           // btn.targetLayer = searchLayer;
			btn.onclick = function(){
                var adjText = this.relatedTxt.value;
                //alert(adjText.value);
				
				//findByParcel(this.targetLayer,this.searchKeyField,this.searchOperator, adjText.value);
				if (this.searchKeyFieldType == "text"){      
                    if (this.searchOperator == "like"){
                        adjText = "'%" + adjText +"%'" ;    
                    } 
                    else{
                        adjText = "'" + adjText +"'" ;
                    }             
                    
                }
				searchAddress(this.searchKeyField,this.searchOperator,adjText);
			};
			divSearch.appendChild(divSearchControl);
		}
	}
    var webmap = new WebMap({
      portalItem: { // autocasts as new PortalItem()
        id: map_config.WEB_MAP_ID
      }
    });
   
    document.getElementById('btnAbutter').onclick = function () {
        findAbutters(document.getElementById('txtDistance').value);
    };
   
    document.getElementById('btnExportJSON').onclick = function () {
        
        exportResultsLayer();
    };
    document.getElementById('btnClearResults').onclick = function () {
        clearResults();
       
    };
    
       

    /************************************************************
     * Set the WebMap instance to the map property in a MapView.
     ************************************************************/
    var view = new MapView({
      map: webmap,
      //, 
     // center:[-71.491909,42.747868],
   //  center:[ -72.251491,41.807086],
      zoom:15,
      container: "viewDiv"
    });
    

    view.on('click',function(e){
        //_customMap.showDetails(e.mapPoint);
    });
    //Search Widget
   
    
    view.when(function(){
        setPopupOnLayers();
        
        /* var legend = new Legend({
           // label: "Layers",
            container :'divLegend',
            
            view: view
          });
          
          // Add widget to the bottom right corner of the view
        view.ui.add(legend, "top-right"); */
		populateLegendStyle();
        var layerList = new LayerList({
            view: view
          });
          // Add widget to the top right corner of the view
		var custom = document.getElementById('divLegend');
        view.ui.add(custom, {
          position: "bottom-left",
        //  index: 2
        });
        view.ui.add(layerList, "top-right");
        //setSelectLayer(graphicLayer);
        webmap.add(graphicSelectionLayer);
        webmap.add(graphicResultLayer);
       // webmap.reorder(graphicSelectionLayer, 0);
       // webmap.reorder(graphicSelectionLayer, 1);
       // findParcelLayer();
        //view.ui.add(document.getElementById('divAbutter'), {position:"bottom-right"});
       
        
        //view.ui.add(searchWidget, {
        //    position: "top-left"
        //});

        var sketch = new Sketch({
            layer: graphicSelectionLayer,
            view: view
        });
        sketch.on('create', function (e) {
            //  alert(e.graphic);
            if (e.state =='complete')
            {
				if(graphicSelectionLayer.graphics.length > 1)
				{
					graphicSelectionLayer.remove(graphicSelectionLayer.graphics.items[0]);
                }
                isSpatialSearch = true;
                findIntersected();
            }
        });

        view.ui.add(sketch, "bottom-left");

        view.ui.add("topbar", "bottom-left");
		if (map_config.ASSET_NUMBER)
		{ 
           /*  var layer = findLayerByName(searchcontrols_config.Asset.layer);
            if (searchcontrols_config.Asset.keyFieldType == "text"){      
                if (searchcontrols_config.Asset.operator == "like"){
                    map_config.ASSET_NUMBER = "'%" + map_config.ASSET_NUMBER +"%'" ;    
                }
                else{
                    map_config.ASSET_NUMBER = "'" + map_config.ASSET_NUMBER +"'" ;
                }             
            } */
			if (map_config.search.parcelLinkFieldType == "text")
			{			
				map_config.ASSET_NUMBER = "'" + map_config.ASSET_NUMBER +"'" ;
			}
            searchAddress(map_config.search.parcelLinkField,"=",map_config.ASSET_NUMBER);
            //searchAddress(searchcontrols_config.Asset.keyField,searchcontrols_config.Asset.operator,map_config.ASSET_NUMBER);
            //findByParcel(layer,searchcontrols_config.Asset.keyField,searchcontrols_config.Asset.operator, map_config.ASSET_NUMBER);
		}
        generateSearchControls(0);
        view.on("click", function(event) {
            var point=createPointGraphic(event.mapPoint.longitude,event.mapPoint.latitude);
            clearResults();
            graphicSelectionLayer.removeAll();
            graphicSelectionLayer.add(point);
            isSpatialSearch = true;
            zoomToResults = false;
            findIntersected();
            /*
            view.hitTest(event).then(function(response) {
              // check if a feature is returned from the hurricanesLayer
              // do something with the result graphic
              var layer = findLayerByName(selectable_layers_config.layers[0]);
              const graphic = response.results.filter(function(result) {
               
                return result.graphic.layer === layer;
              })[0].graphic;
            // alert(graphic);
            zoomToResults = false;
              findByParcel(layer,searchcontrols_config.Asset.keyField,searchcontrols_config.Asset.operator, graphic.attributes[map_config.ASSET_ID]);
            });
            */
          });
          setMap(view);
          addCGLayers();
    });
    document.getElementById("distanceButton").addEventListener("click",
        function () {
          setActiveWidget(null);
          if (!this.classList.contains('active')) {
            setActiveWidget('distance');
          } else {
            setActiveButton(null);
          }
        });

      document.getElementById("areaButton").addEventListener("click",
        function () {
          setActiveWidget(null);
          if (!this.classList.contains('active')) {
            setActiveWidget('area');
          } else {
            setActiveButton(null);
          }
        });

    function setActiveWidget(type) {
        switch (type) {
            case "distance":
            activeWidget = new DistanceMeasurement2D({
                view: view
            });

            // skip the initial 'new measurement' button
            activeWidget.viewModel.newMeasurement();

            view.ui.add(activeWidget, "top-right");
            setActiveButton(document.getElementById('distanceButton'));
            break;
            case "area":
            activeWidget = new AreaMeasurement2D({
                view: view
            });

            // skip the initial 'new measurement' button
            activeWidget.viewModel.newMeasurement();

            view.ui.add(activeWidget, "top-right");
            setActiveButton(document.getElementById('areaButton'));
            break;
            case null:
            if (activeWidget) {
                view.ui.remove(activeWidget);
                activeWidget.destroy();
                activeWidget = null;
            }
            break;
        }
    }

    function setActiveButton(selectedButton) {
        // focus the view to activate keyboard shortcuts for sketching
        view.focus();
        var elements = document.getElementsByClassName("active");
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove("active");
        }
        if (selectedButton) {
            selectedButton.classList.add("active");
        }
    }
    function findByParcel(layer,field,operator,val)
    {
        var where;
        if (operator == 'like')
        {
            where  = field + " " + operator + " '%" + val + "%'";
        }
        else
        {
            where  = field + ' ' + operator + ' ' + val;
        }
        attributeQueryMapServer(layer,where);
    }

	function geometryUsedForQuery(geometry)
	{
		var geoGraphic = new Graphic({
                geometry: geometry,
                symbol: buffersymbol
                // attributes: queryResults.features[i].attributes
            });
            graphicSelectionLayer.graphics.removeAll();
            graphicSelectionLayer.add(geoGraphic);
	}
    function findAbutters(radius)
    {
        if (graphicResultLayer) {
            if (graphicResultLayer.graphics.length < 1) {

                alert('No parcel Selected');
                return;
            }
        }
        else {
            alert('No parcel Selected');
            return;
        }
        var unionBufferGeom = null;
        var geomArray = new Array();
        for (var i in graphicResultLayer.graphics.items)
        {
            var bufferGeometry = GeometryEngine.buffer(graphicResultLayer.graphics.items[i].geometry, radius, 'feet');
            geomArray.push(bufferGeometry);
          
        }
        unionBufferGeom = GeometryEngine.union(geomArray);
        if (unionBufferGeom)
        {
            // var buffergraphic = new Graphic({
                // geometry: unionBufferGeom,
                // symbol: buffersymbol
               // attributes: queryResults.features[i].attributes
            // });
            // graphicSelectionLayer.graphics.removeAll();
            // graphicSelectionLayer.add(buffergraphic);
            geometryUsedForQuery(unionBufferGeom);
            isSpatialSearch = true;
            spatialQueryMapServer(unionBufferGeom);
        }
        else

        {
            alert('Error - Buffer Geometry not created');
        }
        
    }

    function findIntersected()
    {
        if (graphicSelectionLayer) {
            if (graphicSelectionLayer.graphics.length < 1) {

                alert('No parcel Selected');
                return;
            }
        }
        else {
            alert('No parcel Selected');
            return;
        }
        var bufferGeometry = GeometryEngine.geodesicBuffer(graphicSelectionLayer.graphics.items[0].geometry, 8, 'feet');
		//geometryUsedForQuery(graphicSelectionLayer.graphics.items[0].geometry);
        //spatialQueryMapServer(graphicSelectionLayer.graphics.items[0].geometry);
        geometryUsedForQuery(bufferGeometry);
        spatialQueryMapServer(bufferGeometry);
        //graphicSelectionLayer.graphics.removeAll();
    }

	function featuresQueryResult(queryResults)
	{  
        var queryLayer = null;
        document.getElementById('divResults').innerHTML = "";
        if(queryResults.features.length == 0){
            document.getElementById('divResults').innerHTML = "No records found";
            //document.getElementById('divResultsAll').innerHTML = '';
            $(".customResults").html("");
            return;
        }
        
    
		for (var i in queryResults.features) {
            var geom = queryResults.features[i].geometry;
            
			if (geom){
                if( i==0){
                    graphicResultLayer.removeAll();
                }
            
                var resultGraphic = new Graphic({
                    geometry: geom,
                    symbol: getResultSymbol(geom),
                    attributes: queryResults.features[i].attributes
                });

                
                graphicResultLayer.add(resultGraphic);	
                if (i ==0){
                    queryLayer = queryResults.features[i].layer;
                }	 
			}
        }
		if (queryResults.features[0].geometry)
		{

			var unionBufferGeom = null;
			var geomArray = new Array();
			for (var i in graphicResultLayer.graphics.items)
			{
				var bufferGeometry = GeometryEngine.buffer(graphicResultLayer.graphics.items[i].geometry, 5, 'feet');
				geomArray.push(bufferGeometry); 
			  
			}
			unionBufferGeom = GeometryEngine.union(geomArray);
			if (zoomToResults){
				view.goTo({target:unionBufferGeom}).then(function(){
					if (view.scale < 750){
						view.goTo({target:unionBufferGeom,scale:750});
					}
				});
            }
            //queryLinkedLayer('',queryResults.features);
            if (isSpatialSearch){
               // exportResultsLayer();
                exportResults(queryResults.features);
            }
            
		}
		else{
			//exportResultsLayer();
            exportResults(queryResults.features);
            
            if (isSpatialSearch == false){
                queryLinkedLayer('Road',queryResults.features);
            }
            
            isSpatialSearch = false;
            
			
		}
        zoomToResults = true;
        
        
       
    }
    function queryTaskErrorHandler(err){
        console.log(err);
    }
    function spatialQueryMapServer(geometry) {
        var layer = findLayerByName(spatialsearch_config.Parcel.layer);
        var query = layer.createQuery();
        query.spatialRelationship ="intersects";
        query.geometry = geometry;
        query.returnGeometry = true;
        query.outFields = ["*"]; 
        query.outSpatialReference = new SpatialReference(3857);
        layer.queryFeatures(query).then(featuresQueryResult).otherwise(queryTaskErrorHandler);       
    }
    function attributeQueryMapServer(layer,where) {
        
        var query = layer.createQuery();
        query.returnGeometry = true;
       
        query.outFields = ["*"];
     
        query.outSpatialReference = new SpatialReference(3857);
     
        query.where =where;
       
        layer.queryFeatures(query).then(featuresQueryResult).otherwise(queryTaskErrorHandler);
        
    }
	function querySearchRest(where){
		var queryurl = map_config.search.url; // Represents the REST endpoint for a layer of cities.
		  var queryTask = new QueryTask({
			url: queryurl
		  });
		  var query = new Query();
		  query.returnGeometry = false;
		  query.outFields = ["*"];
		  query.where = where;  // Return all cities with a population greater than 1 million

		  // When resolved, returns features and graphics that satisfy the query.
          queryTask.execute(query).then(featuresQueryResult).otherwise(queryTaskErrorHandler);
          
	}



    
  });