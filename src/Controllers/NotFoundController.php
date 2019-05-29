<?php

namespace Banq\Controllers;

use Slim\Http\Response;

class NotFoundController {


    /**
     * @param $request
     * @param Response $response
     * @return mixed
     */
    public function __invoke($request, $response) {
        return $response
            ->withStatus(404)
            ->withHeader('Content-Type', 'text/html')
            ->write(
                "<body style='background: #eeeeee; text-align: center; padding: 20px'>" .
                "<div style='margin: 20px auto; padding: 20px; background: #fff; width: 500px; border-radius: 10px'><h2>Page Not Found.</h2>".
                "<h4>Sorry we couldn't find what you were looking for</h4>".
                "<p>If you arrived here via a broken link, we apologize for the inconvenience.</p>".
                "<p><a href='/'>Go Back to Homepage</a></p></div>".
                "</body>"
            );
    }
}