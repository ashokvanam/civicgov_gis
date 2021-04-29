<?php
//This PHP code is to find the Adjacent Parcels around given Parcel Number and within given radius  (in USA Feet).

$config = include('config.php');

$url_buffer=$BUFFER_SERVICE;
$url_layer_query=$LAYER_QUERY_URL;

$assetID = $SEARCH_KEY_FIELD; //#2:Config: PUT ID
$outFields = $OUTPUT_FIELDS;

$parcelNumber = $_GET["search_item"];
$distance = $_GET["radius"];
$distance = $distance * 0.3048;

if ($SEARCH_KEY_TYPE == "text")
{
	$parcelNumber = "'" . $parcelNumber ."'";
}

function getToken()
{//"username=$USERNAME&password=$PASSWORD&client=ip&ip=$SERVER_IP&f=json"
	/* $TOKEN_URL = $API_BASE_URL + "/tokens/generateToken";
	$token_param = array("username" => $USERNAME,"password"=>$PASSWORD,"client"=>"ip","ip"=>$SERVER_IP,"f"=>"geojson");
	$options = array(
		'http' => array(
			'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
			'method'  => 'POST',
			'content' => http_build_query($token_param)
		)
	);
	$context  = stream_context_create($options);


	$response = file_get_contents($TOKEN_URL, false, $context);
	echo $response;
	$data = json_decode($response, true);
    return  $data['token']; */

    $url = "https://services5.integritygis.com/arcgis/tokens/";
	    
    //The fields included in the request
    $fields = array(
        'request' => 'getToken',
        'username' => 'Marshall',
        'password' => 'U2xFHu2k@Y',
        'expiration' => 120,
        //'clientid' => 'ref.' . $RequestingPage . '/',
        'client'=> 'ip',
        'ip' => '198.37.116.250',
        'f' => 'json'
    );
    $fields_string = "";
    foreach($fields as $key=>$value) {
        $fields_string .= $key.'='.$value.'&'; 
    }
    //Instantiate Curl
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch,CURLOPT_POST,count($fields));
    curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    //curl_setopt($ch, CURLOPT_REFERER, $RequestingPage);
    
    $result = curl_exec($ch);
    curl_close($ch);
    //echo 'token'.$result;
    $someObject = json_decode($result);
    //echo $someObject->token;
   return $someObject->token;
  /* echo curl_errno($ch) . '<br/>';
		echo curl_error($ch) . '<br/>';
		//If Curl was not instantiated successfully
		if (!curl_exec($ch)) {
			echo 'An error has occurred: ' . curl_error($ch);
		}
		//Otherwise return the result
		else {
			//Treat the response as JSON, and split by attribute.
			$someObject = json_decode($result);
			echo '<script type="text/javascript">';
			echo "\r\n";
			echo 'var val = "'.$someObject->token .'"';
			echo "\r\n";
			echo '</script>';
			echo "\r\n";
		}
		//Close Curl */
	    
}
//ECHO $parcelNumber;
$token = getToken();
//ECHO $parcelNumber;
$data = array("where" => $assetID ."=".$parcelNumber,"f"=>"pjson","returnGeometry"=>"true","outSR"=>"4326","outFields"=>"*","token"=>$token);
$fields_string = "";
		foreach($data as $key=>$value) {
			$fields_string .= $key.'='.$value.'&'; 
		}

//$data = array("where" => "PROPERTYIFGD='R317362'");
$ch = curl_init($url_layer_query);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch,CURLOPT_POST,count($data));
		curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	    //curl_setopt($ch, CURLOPT_REFERER, $RequestingPage);
	    
        $parcel = curl_exec($ch);

       // echo $parcel;
       // return;

/* // use key 'http' even if you send the request to https://...
$options = array(
    'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data)
    )
);
$context  = stream_context_create($options);
//echo "reached here";

//echo  http_build_query($data);
//ECHO $url_layer_query;
$parcel = file_get_contents($url_layer_query, false, $context); */
//echo $parcel;
if ($parcel === FALSE) {   }

//echo $parcel;

$parcel_object=json_decode($parcel);  

if (count($parcel_object->features) ==0){
	echo "No records";
	return;
}
$parcel_geom = json_encode($parcel_object->features[0]->geometry);

if ($GEOMETRY_TYPE == "point")
{
$parcel_geom= "{'geometryType':'esriGeometryPoint',"."'geometries':[". $parcel_geom;
$parcel_geom = $parcel_geom . "]}";
}
else if ($GEOMETRY_TYPE == "line")
{
$parcel_geom= "{'geometryType':'esriGeometryPolyline',"."'geometries':[". $parcel_geom;
$parcel_geom = $parcel_geom . "]}";
}
else if ($GEOMETRY_TYPE == "polygon")
{
$parcel_geom= "{'geometryType':'esriGeometryPolygon',"."'geometries':[". $parcel_geom;
$parcel_geom = $parcel_geom . "]}";
}
//echo $parcel_geom;
// $parcel_geom= "{'geometryType':'esriGeometryPolygon',"."'geometries':[". $parcel_geom;
// $parcel_geom = $parcel_geom . "]}";

//echo $parcel_geom;
$data = array("geometries" => $parcel_geom,"inSR"=>"4326","outSR"=>"4326","bufferSR"=>"3857","distances"=>$distance,"f"=>"pjson","token"=>$token);
$fields_string = "";
		foreach($data as $key=>$value) {
			$fields_string .= $key.'='.$value.'&'; 
		}

//$data = array("where" => "PROPERTYIFGD='R317362'");
$ch = curl_init($url_buffer);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch,CURLOPT_POST,count($data));
		curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	    //curl_setopt($ch, CURLOPT_REFERER, $RequestingPage);
	    
        $buffer_geom = curl_exec($ch);
/* 
// use key 'http' even if you send the request to https://...
$options = array(
    'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data)
    )
);
$context  = stream_context_create($options);
$buffer_geom = file_get_contents($url_buffer, false, $context); */
//echo $buffer_geom;
if ($buffer_geom === FALSE) {  }

//echo "Buffer Geometry--" . $buffer_geom;
$buffer_geom_object = json_decode($buffer_geom);

//echo 'Ashok';
$buffer_geom = json_encode($buffer_geom_object->geometries[0]);
//echo $buffer_geom;

$data = array("geometry" => $buffer_geom,"geometryType"=>"esriGeometryPolygon","inSR"=>"4326","outSR"=>"4326","spatialRel"=>"esriSpatialRelIntersects","outFields"=>$outFields,"f"=>"pjson","returnGeometry"=>"false","token"=>$token);


/* // use key 'http' even if you send the request to https://...
$options = array(
    'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data)
    )
);
$context  = stream_context_create($options);
$parcel_abutters = file_get_contents($url_layer_query, false, $context); */

$fields_string = "";
		foreach($data as $key=>$value) {
			$fields_string .= $key.'='.$value.'&'; 
		}

//$data = array("where" => "PROPERTYIFGD='R317362'");
$ch = curl_init($url_layer_query);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch,CURLOPT_POST,count($data));
		curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	    //curl_setopt($ch, CURLOPT_REFERER, $RequestingPage);
	    
        $parcel_abutters = curl_exec($ch);
if ($parcel_abutters === FALSE) {  }

$abbuter_result = json_decode($parcel_abutters);
echo json_encode($abbuter_result->features);


?>