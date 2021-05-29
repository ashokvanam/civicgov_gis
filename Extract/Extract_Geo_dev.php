<?php

include_once('geoPHP/geoPHP.inc');
//This PHP code is to find the Adjacent Parcels around given Parcel Number and within given radius  (in USA Feet).

function RequestREST($url,$request_data_array)
{

	    
	    //The fields included in the request
		/* $fields = array(
			'request' => 'getToken',
			'username' => 'Marshall',
			'password' => 'U2xFHu2k@Y',
			'expiration' => 120,
            //'clientid' => 'ref.' . $RequestingPage . '/',
            'client'=> 'ip',
            'ip' => '198.37.116.250',
			'f' => 'json'
		); */
		$fields = $request_data_array;
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
		return $result;
}

function getObjectIDs($API_ENDPOINT)
{
    //$data1 = array("where" => "1=1 and SWIS_CODE='514200'", "f" => "geojson", "returnIdsOnly" => "true");
	try{
        $data1 = array("where" => "RPS_Link='51080004806500010690000000'", "f" => "geojson", "returnIdsOnly" => "true");
            
        $response = RequestREST($API_ENDPOINT,$data1);
        //echo $response;
        $data = json_decode($response, true);
	}
	catch (Exception $e) {
		echo 'Caught exception: ',  $e->getMessage(), "\n";
	}
    return $data["objectIds"];
}

function requestDataSetById($ids, $API_ENDPOINT)
{
    $outfields = "RPS_Link"; //$ini['fields']; [Uncomment the "$ini['fields']" to read config param from ini file and comment '"*"']
    $data1 = array("objectids" => $ids, "f" => "geojson", "returnGeometry" => "true", "outfields" => $outfields);
    
	$response = RequestREST($API_ENDPOINT,$data1);
    echo $response;
    $data = json_decode($response, true);	
    return $data["features"];
}

function importParcels()
{
    // header("Content-Type: text/csv");
    // header("Content-Disposition: attachment; filename=latlon.csv");

    $API_ENDPOINT = "https://gis.ulstercountyny.gov/arcgis/rest/services/Tax_Parcels/Tax_Parcel_Data/MapServer/0/query?";
    $all_results = array();
    $ids = getObjectIDs($API_ENDPOINT);
	//echo count($ids);
    $count = 0;
    $requestID = array();
    //$fp = fopen("php://output", "wb");
    foreach ($ids as $id) {
        $requestID[] = $id;
        $numItems = count($requestID);

        // process csv in chunks of 1000
        if ($numItems == 1000) {
            $count = $count + $numItems;
            $idlist = implode(",", $requestID);
            $result = requestDataSetById($idlist, $API_ENDPOINT);
			echo $result;
            $requestID = array();
            foreach ($result as $row) {
                $centroid = addCentroid($row);
                //if (!empty($centroid))
                  //  fputcsv($fp, $centroid);
            }
            continue;
        } else {
            continue;
        }
    }
    $idlist = implode(",", $requestID);
    echo $idlist;
    // process the last chunk that may be less than 1000
    $result = requestDataSetById(implode(",", $requestID), $API_ENDPOINT);
    
    foreach ($result as $row) {
	echo $result;
        $centroid = addCentroid($row);
        //if (!empty($centroid))
           // fputcsv($fp, $centroid);
    }

    //fclose($fp);
}

function addCentroid($feature)
{
    $properties = array();
    try {
	echo $feature['geometry'];
        if (count($feature['geometry']['coordinates']) > 0) {
            $polygon = geoPHP::load(json_encode($feature['geometry']), 'json');
            $properties = $feature['properties'];
            $properties['longitude'] = $polygon->centroid()->x();
            $properties['latitude'] = $polygon->centroid()->y();
        }
    } catch (Exception $e) {
        return false;
    }
    return $properties;
}
//getObjectIDs("https://gis.ulstercountyny.gov/arcgis/rest/services/Tax_Parcels/Tax_Parcel_Data/MapServer/0/query?");
importParcels();

?>