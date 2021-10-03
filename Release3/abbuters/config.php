<?php
//Configuration file for Search API 
//This configuration is used to define the ArcGIS REST API, Buffer/Abbutter Operation Service, 
//Data to be displayed in the output.

//http://tasks.arcgisonline.com/arcgis/rest/services/Geometry/GeometryServer/buffer

 $BUFFER_SERVICE = "https://newgis.nashuanh.gov/arcgisapp3/rest/services/Utilities/Geometry/GeometryServer/buffer";
 $LAYER_QUERY_URL = "https://newgis.nashuanh.gov/arcgisapp3/rest/services/WFS/Nashua_RoadCL/MapServer/0/query?";
 // $LAYER_QUERY_URL = 'https://newgis.nashuanh.gov/arcgisapp3/rest/services/WFS/Nashua_RoadCL/MapServer/0/query?';
 $SEARCH_KEY_FIELD ="SEGMENT_ID";
 $SEARCH_KEY_TYPE = "number";
 $GEOMETRY_TYPE = 'line';
 $OUTPUT_FIELDS = "SEGMENT_ID";
 
 
 

?>