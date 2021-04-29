<?php

include_once('geoPHP/geoPHP.inc');
//This PHP code is to find the Adjacent Parcels around given Parcel Number and within given radius  (in USA Feet).
$TOKEN = '';
function getToken()
{//"username=$USERNAME&password=$PASSWORD&client=ip&ip=$SERVER_IP&f=json"
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
    $TOKEN = $someObject->token;
    //return $someObject->token;
  
	    
}
function getObjectIDs($API_ENDPOINT)
{
    $data1 = array("where" => "1=1", "f" => "geojson", "returnIdsOnly" => "true" , "token"=>$TOKEN);
    $options = array(
        'http' => array(
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($data1)
        )
    );
    $context = stream_context_create($options);

    $response = file_get_contents($API_ENDPOINT, false, $context);
    $data = json_decode($response, true);
    return $data["objectIds"];
}

function requestDataSetById($ids, $API_ENDPOINT)
{
    $outfields = "PROPERTYID"; //$ini['fields']; [Uncomment the "$ini['fields']" to read config param from ini file and comment '"*"']
    $data1 = array("objectids" => $ids, "f" => "geojson", "returnGeometry" => "true", "outfields" => $outfields, "token"=>$TOKEN);
    $options = array(
        'http' => array(
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($data1)
        )
    );
    $context = stream_context_create($options);

    $response = file_get_contents($API_ENDPOINT, false, $context);
    $data = json_decode($response, true);
    return $data["features"];
}

function importParcels()
{
    header("Content-Type: text/csv");
    header("Content-Disposition: attachment; filename=latlon.csv");

    $API_ENDPOINT = "https://services5.integritygis.com/arcgis/rest/services/Public/Marshall_Assessor_Data/MapServer/10/query?";
    $all_results = array();
    $ids = getObjectIDs($API_ENDPOINT);
    $count = 0;
    $requestID = array();
    $fp = fopen("php://output", "wb");
    foreach ($ids as $id) {
        $requestID[] = $id;
        $numItems = count($requestID);

        // process csv in chunks of 1000
        if ($numItems == 1000) {
            $count = $count + $numItems;
            $idlist = implode(",", $requestID);
            $result = requestDataSetById($idlist, $API_ENDPOINT);
            $requestID = array();
            foreach ($result as $row) {
                $centroid = addCentroid($row);
                if (!empty($centroid))
                    fputcsv($fp, $centroid);
            }
            continue;
        } else {
            continue;
        }
    }

    // process the last chunk that may be less than 1000
    $result = requestDataSetById(implode(",", $requestID), $API_ENDPOINT);
    foreach ($result as $row) {
        $centroid = addCentroid($row);
        if (!empty($centroid))
            fputcsv($fp, $centroid);
    }

    fclose($fp);
}

function addCentroid($feature)
{
    $properties = array();
    try {
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

importParcels();

?>