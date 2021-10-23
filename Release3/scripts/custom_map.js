//var _selectLayer = null;
//var _geometryEngine = null;
var _mapView = null;
//var _customMap = null;
function initControls(){
    $( "#divResultsAll" ).dialog({
        autoOpen: false,
        show: {
          effect: "blind",
          duration: 1000
        },
        hide: {
          effect: "explode",
          duration: 1000
        }
      });
}
function setMap(view){
    _mapView = view;
}
//http://tabulator.info/
function generatePopupContent(layerConfig){

    var i = 0;
    var divPopup = document.createElement('div')
    //divPopup.style.height = "250px";
    var tblFeatureInfo = document.createElement('table');
    tblFeatureInfo.id =   "results";

    tblFeatureInfo.border = "1";
    
    for (var i =0;i<layerConfig.fields.length;i++){
        var row =document.createElement('tr');
        var colField = document.createElement('td');
        
        var colValue = document.createElement('td');
        colField.innerHTML = layerConfig.displayFieldNames[i];
        colValue.innerHTML = "{" + layerConfig.fields[i] + "}";
        row.appendChild(colField);
        row.appendChild(colValue);
        tblFeatureInfo.appendChild (row);
    }
    var recordsConfig = layerConfig.records;
   // if (layerConfig.addRecord){
    var tblrecords = document.createElement('table');
    tblrecords.id =   "attributes";
    var row =document.createElement('tr');
        for (var j in recordsConfig){
            if (recordsConfig[j].disabled == false){
                var eachRecordLink = addRecordsLink(recordsConfig[j].name,recordsConfig[j].add);                
                divPopup.appendChild(eachRecordLink);
                var colValue = document.createElement('td');
                colValue.appendChild(eachRecordLink);
                row.appendChild(colValue);
            }
        }
        tblrecords.appendChild(row); 
   // }
   divPopup.appendChild(tblrecords);
    divPopup.appendChild(tblFeatureInfo);
    return divPopup.outerHTML;
}
function generateRecordsPopupContent(layerConfig){

    var i = 0;
    var divPopup = document.createElement('div')
    //divPopup.style.height = "250px";
    var tblFeatureInfo = document.createElement('table');
    tblFeatureInfo.id =   "results";

    tblFeatureInfo.border = "1";
    
    for (var i =0;i<layerConfig.fields.length;i++){
        var row =document.createElement('tr');
        var colField = document.createElement('td');
        
        var colValue = document.createElement('td');
        colField.innerHTML = layerConfig.displayFieldNames[i];
		if (layerConfig.displayFieldNames[i] == "Link"){
			
			colValue.appendChild(addRecordsLink("Details","{" + layerConfig.fields[i] + "}"));
		}
		else
		{
			colValue.innerHTML = "{" + layerConfig.fields[i] + "}";
		}
        
        row.appendChild(colField);
        row.appendChild(colValue);
        tblFeatureInfo.appendChild (row);
    }    
    divPopup.appendChild(tblFeatureInfo);
    return divPopup.outerHTML;
}
function generateAddRecorLinks(layerConfig, attributes){

    var i = 0;
    var divPopup = document.createElement('div')
    //divPopup.style.height = "250px";
    var tblFeatureInfo = document.createElement('table');
    tblFeatureInfo.id =   "results";

    tblFeatureInfo.border = "1";
    /*
    for (var i =0;i<layerConfig.fields.length;i++){
        var row =document.createElement('tr');
        var colField = document.createElement('td');
        var colValue = document.createElement('td');
        colField.innerHTML = layerConfig.displayFieldNames[i];
        colValue.innerHTML = "{" + layerConfig.fields[i] + "}";
        row.appendChild(colField);
        row.appendChild(colValue);
        tblFeatureInfo.appendChild (row);
    }
    */
    var recordsConfig = layerConfig.records;
   // if (layerConfig.addRecord){
    var tblrecords = document.createElement('table');
    tblrecords.id =   "attributes";
    var row =document.createElement('tr');
        for (var j in recordsConfig){
            if (recordsConfig[j].disabled == false){

                var url = recordsConfig[j].add;
                // url = url.replace("{"+layerConfig.civicgovField+"}",parcelID);
                var params = recordsConfig[j].params;
                for (var p in params){
                    var eachItem = params[p];
                    if (p ==0){
                        url = url + eachItem[0] + "=" + attributes[eachItem[1]];
                    }
                    else{
                        url = url  + "&" + eachItem[0] + "=" + attributes[eachItem[1]];
                    }
                }
               
                var eachRecordLink = addRecordsLink(recordsConfig[j].name,url);                
                divPopup.appendChild(eachRecordLink);
                var colValue = document.createElement('td');
                colValue.appendChild(eachRecordLink);
                row.appendChild(colValue);
            }
        }
        tblrecords.appendChild(row); 
   // }
   divPopup.appendChild(tblrecords);
    divPopup.appendChild(tblFeatureInfo);
    return divPopup;
}
function addRecordsLink(linkName,url){
    var link = document.createElement('a');
    link.href = url;
    link.target ="_blank";
    link.innerHTML = linkName;
    return link;
}
function displayFeatures(features,layerConfig)
{
    document.getElementById('divResultsAll').innerHTML = '';
    // var tab = document.getElementById('tblResults');
    var divTab = document.createElement('div');
    var tab = document.createElement('table');
    tab.border = "1";
    tab.id = "attributes";
   // tab.class = 'attributes';
    for (var i in features) {
        var feature = features[i];
        //var colHeader = document.createElement('th');
        //colHeader.innerHTML = map_config.FIELDS[j];
        var row = document.createElement('tr');
        //row.appendChild(colHeader);
        var col = document.createElement('td');
        var content = '';
        for (var j in layerConfig.fields){// map_config.search.FIELDS) {            
            if (content == '')
            {
                content = layerConfig.displayFieldNames[j] + ":" + feature.attributes[layerConfig.fields[j]];
            }
            else
            {
                content = content + '<br>' + layerConfig.displayFieldNames[j] + ":" + feature.attributes[layerConfig.fields[j]];
            }
        }
       //var records = generateAddRecorLinks(map_config.search,feature.attributes[map_config.search.civicgovField]);
       var records = generateAddRecorLinks(layerConfig,feature.attributes);
        //generatePopupContent(map_config.search)
        
        col.innerHTML = content;
        col.geometry     = features[i].geometry;
        col.onclick =function(){
            this.geometry
            
        }
        // var highlightBtn = document.createElement('button');
        // highlightBtn.innerText ="Highlight";
        // highlightBtn.geometry = features[i].geometry
        // col.appendChild(highlightBtn);
        col.appendChild(records);
        row.appendChild(col);
        tab.appendChild(row);
        divTab.appendChild(tab);
        document.getElementById('divResultsAll').appendChild(divTab);
       // $( "#divResultsAll" ).dialog( "open" );
        if(records.innerHTML.length > 0){
            $('#divResultsAll').trigger('contentchanged');
        }
    }
}
function searchControlSet(name)
{
	//Math.floor((Math.random() * 10) + 1);
	var txt = document.createElement('input');
	txt.name = name;
	txt.tagName = 'text';
	txt.id = name + Math.floor((Math.random() * 100) + 1);
	txt.placeholder =  name;
	var btn = document.createElement('input');
	btn.type ='button';
	btn.name = name;
	btn.tagName ='button';
	btn.value = 'Search ' + name;
	btn.id = name + Math.floor((Math.random() * 100) + 1);
	
	var div =  document.createElement('div');
	div.id = 'div' + name + Math.floor((Math.random() * 100) + 1);
	div.appendChild(txt);
	div.appendChild(btn);
	return div;
}

function promptLayerSelection(layerlist,callbackLayer){
    var cnt=0;
    var dialogDiv = document.createElement('div');
    
    dialogDiv.id='prompt';
    //dialogDiv.style="width:25%;height:25%;z-index:99";
    var lastItemKey='';
    for (var i in layerlist){
        cnt++;
        var opt = document.createElement('input')
        opt.id='layer-'+i;
        opt.type='radio';
        opt.name='layer';
        
        opt.addEventListener('change', function() {
            callbackLayer(this.value);
            $( dialogDiv ).dialog( "close" );    
        })
        opt.value=i;
        lastItemKey=i;
        var label = document.createElement('label');
        label.innerHTML = i;
        label.for = opt.id;
        dialogDiv.appendChild(opt);
        dialogDiv.appendChild(label)
    }
    if (cnt==1){
        callbackLayer(lastItemKey);
        return;
    }
    $(dialogDiv ).dialog({
        //position: { my: "center center", at: "center center" },
        title:'Select Layer',
        resizable: false,
        height: "auto",
        width: 400,
        buttons: [
            {
              text: "Ok",
              icon: "ui-icon-heart",
              click: function() {
                $( this ).dialog( "close" );                
              }
         
              // Uncommenting the following line would hide the text,
              // resulting in the label being used as a tooltip
              //showText: false
            }
          ]
        //modal: true,
    });
    $(dialogDiv ).dialog( "open" );
}



