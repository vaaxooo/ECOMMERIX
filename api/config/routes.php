<?php

/* API */
$router->get('/filters/getFilters', 'App\controllers\Filters@getFilters');
/**
 * Controllers\WEB.php
 */
$router->post('/web/getSerializeData', 'App\controllers\SiteSettings@getSerializeData');
$router->post('/web/getLanguageTranslate', 'App\controllers\SiteSettings@getLanguageTranslate');

/**
 * Controllers\Products.php
 */
$router->post('/products/getProducts', 'App\controllers\Products@getProducts');
$router->post('/products/getProductData', 'App\controllers\Products@getProductData');

/**
 * Controllers\Categories.php
 */
$router->post('/categories/getCategories', 'App\controllers\Categories@getCategories');


/**
 * Controllers\Adverts.php
 */
$router->post('/adverts/getBannerAdverts', 'App\controllers\Adverts@getBannerAdverts');

/**
 * Controllers\Coupons.php
 */
$router->post('/coupons/checkCoupon', 'App\controllers\Coupons@checkCoupon');


/**
 * Controllers\Articles.php
 */
$router->post('/articles/getArticles', 'App\controllers\Articles@getArticles');
$router->post('/articles/getArticleData', 'App\controllers\Articles@getArticleData');


/**
 * Controllers\Pages.php
 */
$router->post('/pages/getPages', 'App\controllers\Pages@getPages');
$router->post('/pages/getPageData', 'App\controllers\Pages@getPageData');

?>