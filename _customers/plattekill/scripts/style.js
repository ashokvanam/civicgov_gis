// Create a symbol for rendering the graphic
var fillSymbol = {
    type: "simple-fill", // autocasts as new SimpleFillSymbol()
    color: [0, 0, 255, 0.8],
    outline: { // autocasts as new SimpleLineSymbol()
        color: [255, 255, 255],
        width: 2
    }
};
var buffersymbol = {
    type: "simple-fill", // autocasts as new SimpleFillSymbol()
    color: [0, 255, 0, 0.3],
    outline: { // autocasts as new SimpleLineSymbol()
        color: [255, 255, 255],
        width: 0.5
    }
};


// Create a symbol for rendering the graphic
var fillResultSymbol = {
    type: "simple-fill", // autocasts as new SimpleFillSymbol()
    color: [255, 255, 0, 0.5],
    outline: { // autocasts as new SimpleLineSymbol()
        color: [0, 0, 0],
        width: 4
    }
};
var resultMarker = {
    type: "simple-marker", // autocasts as new SimpleFillSymbol()
    color: [255, 255, 0, 0.5],
    outline: { // autocasts as new SimpleLineSymbol()
        color: [0, 0, 0],
        width: 4
    }
};

// Create a symbol for drawing the line
var lineSymbol = {
    type: "simple-line", // autocasts as SimpleLineSymbol()
    color: [226, 119, 40],
    width: 4
};

// Create a symbol for drawing the point
var markerSymbol = {
    type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
    color: [226, 119, 40],
    legendColor:"#ff0000",
    legendText:'Marker',
    outline: { // autocasts as new SimpleLineSymbol()
        color: [255, 255, 255],
        width: 2
    }
};
var violationSymbol = {
    type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
    color: [255, 0, 0],
    legendColor:"#ff0000",
    legendText:'Violation',
    size: 12,
    outline: { // autocasts as new SimpleLineSymbol()
        color: [255, 255, 255],
        width: 0.5
    }
};
var permitSymbol = {
    type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
    color: [0, 255, 0],
    legendColor:"#00ff00",
    legendText:'Permit',
    size:11,
    outline: { // autocasts as new SimpleLineSymbol()
        color: [255, 255, 255],
        width: 0.5
    }
};
var complaintSymbol = {
    type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
    color: [125, 0, 255],
    legendColor:"#7a00ff",
    legendText:'Complaint',
    size: 10,
    outline: { // autocasts as new SimpleLineSymbol()
        color: [255, 255, 255],
        width: 0.5
    }
};
var inspectionSymbol = {
    type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
    color: [0, 255, 255],
    legendColor:"#00ffff",
    legendText:'Inspection',
    size:9,
    outline: { // autocasts as new SimpleLineSymbol()
        color: [255, 255, 255],
        width: 0.5
    }
};
var projectSymbol = {
    type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
    color: [255, 125, 255],
    legendColor:"#ff7dff",
    legendText:'Project',
    size:8,
    outline: { // autocasts as new SimpleLineSymbol()
        color: [255, 255, 255],
        width: 0.5
    }
};
var licenseSymbol = {
    type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
    color: [255, 255, 125],
    legendColor:"#ffff7d",
    legendText:'License',
    size:8,
    outline: { // autocasts as new SimpleLineSymbol()
        color: [255, 255, 255],
        width: 0.5
    }
};
function populateLegendStyle(){
    for (var i in map_config.layers){
        //var eachStyle = map_config.layers[i].;
        var eachDiv = document.createElement('div');
        eachDiv.style.width="16px";
        eachDiv.style.height="16px";
        eachDiv.style.backgroundColor = map_config.layers[i].legendColor;      
        
        var txt = document.createElement('label');
        //txt.type ='label';
        txt.innerHTML = map_config.layers[i].legendText;
        document.getElementById('divLegend').appendChild(eachDiv);
        document.getElementById('divLegend').appendChild(txt);
    }
    
    for (var i in map_config.cg_layers){
        var eachStyle = map_config.cg_layers[i].style;
        var eachDiv = document.createElement('div');
        eachDiv.style.width="16px";
        eachDiv.style.height="16px";
        eachDiv.style.backgroundColor = eachStyle.legendColor;
       
        eachDiv.style.borderRadius = '50%';
        var txt = document.createElement('label');
        //txt.type ='label';
        txt.innerHTML = eachStyle.legendText;
        document.getElementById('divLegend').appendChild(eachDiv);
        document.getElementById('divLegend').appendChild(txt);
    }
}
function getResultSymbol(geom)
{
    if (geom.type == 'point')
    {
        return markerSymbol
    }
    else if (geom.type == 'polygon')
    {
        return fillResultSymbol;
    }
}