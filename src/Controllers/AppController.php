<?php

namespace Banq\Controllers;
use Psr\Container\ContainerInterface;

class AppController
{
    const PATH_PAGES = "pages/";

    protected $container;

    // constructor receives container instance
    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function home($request, $response, $args) {
        return $this->getPage("index.html", $response);
    }
    public function about($request, $response, $args) {
        return $this->getPage("deposit.html", $response);
    }
    public function deposit($request, $response, $args) {
        return $this->getPage("about.html", $response);
    }

    /**
     * Return the specified page as the response to the specified route
     * @param $pageName
     * @param \Slim\Http\Response $response
     * @return \Slim\Http\Response|static
     */
    public function getPage($pageName, $response)
    {
        $filePath = self::PATH_PAGES . $pageName;
        return FileResponse::getResponse($response, $filePath);
    }
}