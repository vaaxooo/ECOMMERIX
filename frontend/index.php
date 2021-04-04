<?php

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

require_once(__DIR__.'/vendor/autoload.php');

$router = new \Bramus\Router\Router();

require_once('config/routes.php');

$router->run();

?>