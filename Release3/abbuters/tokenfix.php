<?php	
echo 'Current PHP version: ' . phpversion();
        //Establish our requesting url
        //global $wp;
        //$RequestingPage = home_url( $wp->request );
	    //Check to see if the request came from the proper application

		//The url to the token endpoint of the server containing the secure service
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
        echo 'token'.$result;
        $someObject = json_decode($result);
        echo $someObject->token;
		echo curl_errno($ch) . '<br/>';
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
		//Close Curl
	    curl_close($ch);
  