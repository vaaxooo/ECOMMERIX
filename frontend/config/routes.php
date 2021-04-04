<?php

/*
 * App\views
 * */
$router->get('/', function() {

    $file_path = 'app/main/index.php';
    if(file_exists($file_path))
    {
        require_once($file_path);
    }else{
        echo "Page not found!";
    }

});

$router->get('/category/(.*)', function($category) {

    $file_path = 'app/main/category.php';
    if(file_exists($file_path))
    {
        require_once($file_path);
    }else{
        echo "Page not found!";
    }

});

$router->get('/product/(.*)', function($product) {

    $file_path = 'app/main/product.php';
    if(file_exists($file_path))
    {
        require_once($file_path);
    }else{
        echo "Page not found!";
    }

});

$router->get('/(.*)', function($action) {

    $file_path = 'app/'.$action.'.php';
    if(file_exists($file_path))
    {
        require_once($file_path);
    }else{
        echo "Page not found!";
    }

});

?>