<?php

include_once('geoPHP/geoPHP.inc'); 
//This PHP code is to find the Adjacent Parcels around given Parcel Number and within given radius  (in USA Feet).

function getObjectIDs($API_ENDPOINT)
    {
	/*
        $matches = array();
       //preg_match("/dbname=([^;]*)/", Yii::app()->db->connectionString, $matches);
        $typeofjson = (isset($matches[1]) && (stripos($matches[1],"midlothian") !== false)) ? "pjson" : "geojson";

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
            //CURLOPT_POSTFIELDS => "where=1%3D1&f=geojson&returnIdsOnly=true",
			CURLOPT_POSTFIELDS => array('where'=>'1=1','f'=>"geojson","returnIdsOnly"=>"true"),
            CURLOPT_HTTPHEADER => array(
                "Content-Type: application/x-www-form-urlencoded"
            ),
        ));
        $response = curl_exec($curl);
		echo $response;
        curl_close($curl);
		*/
		$data1 = array("where"=>"1=1","f"=>"pjson","returnIdsOnly"=>"true");
		$options = array(
			'http' => array(
				'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
				'method'  => 'POST',
				'content' => http_build_query($data1)
			)
		);
		$context  = stream_context_create($options);
//echo "reached here";


		$response = file_get_contents($API_ENDPOINT, false, $context);
		//echo 'ObjectIDs' . $response;
        $data = json_decode($response, true);
		//echo count($data["objectIds"]);
        return $data["objectIds"];
    }
function requestDataSetById($ids, $API_ENDPOINT)
    {
       //$ini = parse_ini_file('parcel_config.ini');
        $outfields = "Prop_ID_Text"; //$ini['fields']; [Uncomment the "$ini['fields']" to read config param from ini file and comment '"*"']
		$outsrs = "4326";
        $attributes = array();
        /*
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
            CURLOPT_POSTFIELDS => "objectids=" . $ids . "&f=geojson&returnGeometry=false&outfields=" . $outfields,
            CURLOPT_HTTPHEADER => array(
                "Content-Type: application/x-www-form-urlencoded"
            ),
        ));
        $response = curl_exec($curl);
        curl_close($curl);
		*/
		
		$data1 = array("objectids"=>$ids,"f"=>"pjson","returnGeometry"=>"true","outSR" => $outsrs,"outfields" => $outfields);
		$options = array(
			'http' => array(
				'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
				'method'  => 'POST',
				'content' => http_build_query($data1)
			)
		);
		$context  = stream_context_create($options);
		//echo "reached here";


		$response = file_get_contents($API_ENDPOINT, false, $context);
        $data = json_decode($response, true);
		//echo $data["features"];
        return $data["features"];
        // if (isset($data["features"])) foreach ($data["features"] as $feature) {
        //     $attributes[] = $feature["properties"];
        // }

        // return $attributes;
    }
	
function importParcels()
   {
       
       
            $API_ENDPOINT = "https://maps103.halff.com/chimera/rest/services/Ennis_Update/EnnisECAD/MapServer/0/query?";
            $all_results = array();
            //$counts = $this->getCount($API_ENDPOINT);
            $ids = getObjectIDs($API_ENDPOINT);
			//return;
            $count = 0;
            $requestID = array();
			//echo count($ids);
            foreach ($ids as $id) {
				
                $requestID[] = $id;
                $numItems = count($requestID);
				//if ($id > 26000 && $id<=27000){
				
					if ($numItems == 1000) {
						$count = $count + $numItems;
						$idlist = implode(",", $requestID);
						$result = requestDataSetById($idlist, $API_ENDPOINT);
						
						
					   //$all_results = $result;
						$all_results = array_merge($all_results, $result);
						//echo json_encode($all_results);
						//return;
					   //unset($requestID);
					   $requestID = array();
						 // if ($count > 2000) {
							  // break;
						 // }
						continue;
					} else {
						continue;
					}
				//}
            }
			
			//echo implode(",", $requestID);
            $result = requestDataSetById(implode(",", $requestID), $API_ENDPOINT);
			//echo json_encode($result);
			//echo count($all_results);
			if (isset($result))
			{
				$all_results = array_merge($all_results, $result);
			}
			$processed_results = array();
			 foreach ($all_results as $item) {
				$centroid =  addCentroid($item);
				array_push($processed_results,$centroid);
				//break;
			 }
            
			//echo $all_results;
			//echo count($all_results);
			
           $myJSON = json_encode($processed_results);
		   file_put_contents("data_esri.json", $myJSON);
		   echo $myJSON;
		  //echo "Done";
     
	}
	function addCentroid($feature)
	{
		$properties = $feature['attributes'];
		try{
			//echo json_encode($feature['properties']);
			$polygon = geoPHP::load(json_encode($feature['geometry']),'esrijson');
			if (isset($polygon)){
				echo 'No Geometry';
			}
			//$properties = $feature['properties'];
			// if (count($feature['geometry']['coordinates']) == 0){
				// return $properties;
			// }
			// if ($properties['PIN'] == 'C10-026-0-0005-00'){
				// return $feature;
			// }
			//echo $properties['PIN'] . "||";
			$properties['longitude'] = $polygon->centroid()->x();//. "," . $polygon->centroid()->y();
			$properties['latitude'] = $polygon->centroid()->y();
			
			$feature['attributes'] = $properties;
		}
		catch(Exception $e){
			return $properties;
		}
		//echo json_encode($feature['properties']);
		return $properties;
		//echo $polygon->centroid()->x() . "," . $polygon->centroid()->y();
	}
    
	//echo "Ashok";
	importParcels();

?>