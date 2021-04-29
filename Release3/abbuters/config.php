<?php
//Configuration file for Search API 
//This configuration is used to define the ArcGIS REST API, Buffer/Abbutter Operation Service, 
//Data to be displayed in the output.

//http://tasks.arcgisonline.com/arcgis/rest/services/Geometry/GeometryServer/buffer
 $USERNAME = "Marshall";
 $PASSWORD="U2xFHu2k@Y";
 $SERVER_IP ="198.37.116.250";
 $API_BASE_URL ="https://services5.integritygis.com/arcgis/";
 $BUFFER_SERVICE = "https://services5.integritygis.com/arcgis/rest/services/Utilities/Geometry/GeometryServer/buffer";
 $LAYER_QUERY_URL = "https://services5.integritygis.com/arcgis/rest/services/Public/Marshall_Assessor_Data/MapServer/10/query?";//"https://utility.arcgis.com/usrsvcs/servers/f2d2dc348ead48469efb26f9101b9c9e/rest/services/Public/Marshall_Assessor_Data/MapServer/10/query?";
 // $LAYER_QUERY_URL = 'https://newgis.nashuanh.gov/arcgisapp3/rest/services/WFS/Nashua_RoadCL/MapServer/0/query?';
 $SEARCH_KEY_FIELD ="PARCEL_ID";
 $SEARCH_KEY_TYPE = "text";
 $GEOMETRY_TYPE = 'polygon';
 $OUTPUT_FIELDS = "PARCEL_ID";

?>