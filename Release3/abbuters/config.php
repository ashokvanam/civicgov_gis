<?php
//Configuration file for Search API 
//This configuration is used to define the ArcGIS REST API, Buffer/Abbutter Operation Service, 
//Data to be displayed in the output.

//http://tasks.arcgisonline.com/arcgis/rest/services/Geometry/GeometryServer/buffer

 $BUFFER_SERVICE = "https://www.webgis.net/arcgis/rest/services/Utilities/Geometry/GeometryServer/buffer";
 $LAYER_QUERY_URL = "https://www.webgis.net/arcgis/rest/services/VA/CulpeperWebGIS/MapServer/205/query?";
 // $LAYER_QUERY_URL = 'https://newgis.nashuanh.gov/arcgisapp3/rest/services/WFS/Nashua_RoadCL/MapServer/0/query?';
 $SEARCH_KEY_FIELD ="RECID";
 $SEARCH_KEY_TYPE = "text";
 $GEOMETRY_TYPE = 'polygon';
 $OUTPUT_FIELDS = "RECID";
 
 
 

?>