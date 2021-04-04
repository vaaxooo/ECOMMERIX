<?php

/* API */

/**
 * Controllers\Products.php
 */
$router->post('/products/getProducts', 'App\controllers\Products@getProducts');
$router->post('/products/getProductData', 'App\controllers\Products@getProductData');

/**
 * Controllers\Categories.php
 */
$router->get('/categories/getCategories', 'App\controllers\Categories@getCategories');


/**
 * Controllers\Adverts.php
 */
$router->get('/adverts/getBannerAdverts', 'App\controllers\Adverts@getBannerAdverts');

?>