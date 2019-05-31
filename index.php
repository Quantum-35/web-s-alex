<?php

use Banq\Banq;

require 'vendor/autoload.php';

try{
    $banq = new Banq();

    //Load environment variables
    Banq::loadEnv();

    $banq->run();
}
catch (Exception $e){
    http_response_code(500);
}
