<?php

namespace App\controller;

class Controller
{
	protected $twig;

	public function construct()
	{
		$loader = new \Twig\Loader\FilesystemLoader('../views/');
		$this->twig = new \Twig\Environment($loader, [
		    'debug' => true,
		]);
	}

}