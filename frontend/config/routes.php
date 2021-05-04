<?php

/*
 * App\views
 * */
$router->get('/', function ($breadcrumb = null) {
    $file_path = 'app/main/index.php';
    file_exists($file_path) ? require_once($file_path)
        : require_once("app/errors/404.php");
});

$router->get('/c/(.*)', function ($breadcrumb) {
    $file_path = 'app/main/categories/category.php';
    file_exists($file_path) ? require_once($file_path)
        : require_once("app/errors/404.php");
});

/**
 * BEGIN PRODUCTS
 */
$router->get('/p/(.*)', function ($breadcrumb) {
    $file_path = 'app/main/products/product.php';
    file_exists($file_path) ? require_once($file_path)
        : require_once("app/errors/404.php");
});

/**
 * END PRODUCTS
 */

/**
 * BEGIN ARTICLES
 */
$router->get('/a/(.*)', function ($breadcrumb) {
    $file_path = 'app/main/articles/article.php';
    file_exists($file_path) ? require_once($file_path)
        : require_once("app/errors/404.php");
});
/**
 * END ARTICLES
 */

/**
 * BEGIN DYNAMIC PAGES
 */
$router->get('/page/(.*)', function ($breadcrumb) {
    $file_path = 'app/main/pages/page.php';
    file_exists($file_path) ? require_once($file_path)
        : require_once("app/errors/404.php");
});
/**
 * END DYNAMIC PAGES
 */

$router->get('/(.*)', function ($action, $breadcrumb = null) {
    $file_path = 'app/main/' . $action . '.php';
    file_exists($file_path) ? require_once($file_path)
        : require_once("app/errors/404.php");
});


?>