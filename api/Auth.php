<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $apiKey = 'your_api_key_here'; //replace with actual key

  
    if (isset($_SERVER['HTTP_API_KEY']) && $_SERVER['HTTP_API_KEY'] === $apiKey) {
       
        $spacexApiUrl = 'https://api.spacexdata.com/v3/capsules';

       
        $ch = curl_init($spacexApiUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $spacexData = curl_exec($ch);
        curl_close($ch);

        
        echo $spacexData;
    } else {
        
        http_response_code(401);
        echo json_encode(array("message" => "Unauthorized"));
    }
} else {

    http_response_code(405);
    echo json_encode(array("message" => "Method Not Allowed"));
}

?>
