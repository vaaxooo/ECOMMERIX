<?php

namespace App\controllers;

use App\controllers\Controller;

class MainController extends Controller
{

    public function __construct()
    {
        
    }

    public function index()
    {
    	return $this->twig->render('main/index.php');
    }

}