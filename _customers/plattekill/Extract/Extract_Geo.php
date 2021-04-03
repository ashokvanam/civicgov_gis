<?php

include_once('geoPHP/geoPHP.inc');
//This PHP code is to find the Adjacent Parcels around given Parcel Number and within given radius  (in USA Feet).

function getObjectIDs($API_ENDPOINT)
{
    $data1 = array("where" => "1=1 and SWIS_CODE='514200'", "f" => "geojson", "returnIdsOnly" => "true");
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
    $data1 = array("objectids" => $ids, "f" => "geojson", "returnGeometry" => "true", "outfields" => $outfields);
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

    $API_ENDPOINT = "https://gis.ulstercountyny.gov/arcgis/rest/services/Tax_Parcels/Tax_Parcel_Data/MapServer/0/query?";
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