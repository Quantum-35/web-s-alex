<?php

namespace Banq\Controllers;

use Slim\Http\Response;

class ErrorController
{
    /**
     * @param $request
     * @param Response $response
     * @param $exception
     * @return mixed
     */
    public function __invoke($request, $response, $exception)
    {
        return $response
            ->withStatus(500)
            ->withHeader('Content-Type', 'text/html')
            ->write(
                "<body style='background: #eeeeee; text-align: center; padding: 20px'>" .
                "<div style='margin: 20px auto; padding: 20px; background: #fff; width: 500px; border-radius: 10px'><h2>Internal Server Error</h2>" .
                "<p>The server encountered an internal error and was unable to complete your request.</p>" .
                "<p>Please contact <a href='mailto:info@ban-q.com'>info@ban-q.com </a> for help.</p></div>" .
                "</body>"
            );
    }
}