<?php

//IMPORT PARCELS FROM GIS *******************************
function getCount($API_ENDPOINT)
{
	$typeofjson = "pjson";
	$API_ENDPOINT = "https://services9.arcgis.com/37pqcAYwowkkAZyP/ArcGIS/rest/services/Parcel/FeatureServer/0/query?";

	$curl = curl_init();
	curl_setopt_array($curl, array(
		CURLOPT_URL => $API_ENDPOINT,
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => "",
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 0,
		CURLOPT_FOLLOWLOCATION => true,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_CUSTOMREQUEST => "POST",
		CURLOPT_POSTFIELDS => "where=1%3D1&f=$typeofjson&returnCountOnly=true",
		CURLOPT_HTTPHEADER => array(
			"Content-Type: application/x-www-form-urlencoded"
		),
	));
	$response = curl_exec($curl);
	curl_close($curl);

	$data = json_decode($response, true);
	return $data["count"];	
}

function getObjectIDs($API_ENDPOINT)
{
	$typeofjson = "pjson";
	$API_ENDPOINT = "https://services9.arcgis.com/37pqcAYwowkkAZyP/ArcGIS/rest/services/Parcel/FeatureServer/0/query?";

	$curl = curl_init();
	curl_setopt_array($curl, array(
		CURLOPT_URL => $API_ENDPOINT,
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => "",
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 0,
		CURLOPT_FOLLOWLOCATION => true,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_CUSTOMREQUEST => "POST",
		CURLOPT_POSTFIELDS => "where=1%3D1&f=$typeofjson&returnIdsOnly=true",
		CURLOPT_HTTPHEADER => array(
			"Content-Type: application/x-www-form-urlencoded"
		),
	));
	$response = curl_exec($curl);
	curl_close($curl);
	$data = json_decode($response, true);
	return $data["objectIds"];
}

function requestDataSetById($ids, $API_ENDPOINT)
{
	//$ini = parse_ini_file('parcel_config.ini');
	$outfields = "*"; //$ini['fields']; [Uncomment the "$ini['fields']" to read config param from ini file and comment '"*"']
	$attributes = array();
	$typeofjson = "pjson";
	$API_ENDPOINT = "https://services9.arcgis.com/37pqcAYwowkkAZyP/ArcGIS/rest/services/Parcel/FeatureServer/0/query?";

	$curl = curl_init();
	curl_setopt_array($curl, array(
		CURLOPT_URL => $API_ENDPOINT,
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => "",
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 0,
		CURLOPT_FOLLOWLOCATION => true,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_CUSTOMREQUEST => "POST",
		CURLOPT_POSTFIELDS => "objectids=" . $ids . "&f=$typeofjson&returnGeometry=false&outfields=" . $outfields,
		CURLOPT_HTTPHEADER => array(
			"Content-Type: application/x-www-form-urlencoded"
		),
	));
	$response = curl_exec($curl);
	curl_close($curl);
	$data = json_decode($response, true);

	if (isset($data["features"])) foreach ($data["features"] as $feature) {
		$attributes[] = $feature["attributes"];
	}

	return $attributes;
}

function importParcels()
{
	$typeofjson = "pjson";
	$data = "https://maps103.halff.com/chimera/rest/services/Ennis_Update/EnnisECAD/MapServer/0/query?";
	if(!empty($data)) {
		$API_ENDPOINT = $data['value'];
		$all_results = array();
		$counts = getCount($API_ENDPOINT);
		$ids = getObjectIDs($API_ENDPOINT);
		$count = 0;
		$requestID = [];
		$fp = fopen('parcels_data.csv', 'w');

		foreach ($ids as $id) {
			$requestID[] = $id;
			$numItems = count($requestID);
			if ($numItems == 1000) {
				$count = $count + $numItems;
				$idlist = implode(",", $requestID);
				$result = requestDataSetById($idlist, $API_ENDPOINT);				
				$requestID = array();
				if ($count <= 1000) fputcsv($fp, array_keys($result[0]));
				foreach ($result as $row)
					fputcsv($fp, $row);
				continue;
			} else {
				continue;
			}
		}

		$result = requestDataSetById(implode(",", $requestID), $API_ENDPOINT);
		foreach ($result as $row)
			fputcsv($fp, $row);

		fclose($fp);
		return "parcels_data.csv";
	}
}

//*******************************************************

importParcels();