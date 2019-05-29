<?php

namespace Banq;

use Banq\Controllers\AppController;
use Banq\Controllers\ErrorController;
use Banq\Controllers\NotFoundController;
use Dotenv\Dotenv;
use Psr\Container\ContainerInterface;
use Slim\App;

class Banq
{
    /**
     * @var \Slim\App
     */
    private $app;

    public function __construct()
    {
        //config
        $config['displayErrorDetails'] = self::isDevMode();
        $config['addContentLengthHeader'] = true;
        $this->app = new App(["settings" => $config]);

        //Setup
        $c = $this->app->getContainer();
        $this->setupErrorHandling($c);
        $this->initRoutes();
    }

    public static function isDevMode(): bool
    {
        $stage = getenv('STAGE');
        return $stage == 'testing';
    }


    /**
     * @throws \Slim\Exception\MethodNotAllowedException
     * @throws \Slim\Exception\NotFoundException
     */
    public function run()
    {
        $this->app->run();
    }

    /**
     * Setup error handling
     * @param ContainerInterface $c
     */
    private function setupErrorHandling($c)
    {
        if (!self::isDevMode()) {
            $c['errorHandler'] = function ($c) {
                return new ErrorController();
            };
        }

        $c['notFoundHandler'] = function ($c) {
            return new NotFoundController();
        };
    }

    /**
     * Add the route handlers
     */
    private function initRoutes()
    {
        $this->app->get('/', AppController::class . ':home');
        $this->app->get('/index.html', AppController::class . ':home');
    }

    /**
     * Load environment variables
     */
    public static function loadEnv()
    {
        $dotenv = new Dotenv(realpath("config/"));
        $dotenv->overload();

        //confirm required fields have been set
        $dotenv->required([
            'STAGE'
        ]);
    }
}