<?php

use Dotenv\Dotenv;

require 'vendor/autoload.php';
require_once "vendor/deployer/deployer/recipe/common.php";

$dotenv = new Dotenv(realpath("config/"), 'deploy.env');
$dotenv->overload();

//Load environment variables
$host = getenv('DEPLOY_HOST');
$user = getenv('DEPLOY_USER');
$pemFile = getenv('DEPLOY_PEM_FILE');
$stage = getenv('STAGE');
$path = getenv('DEPLOY_PATH');

server('DO', $host)
    ->user($user)
    ->pemFile($pemFile)
    ->stage($stage)
    ->env('deploy_path', $path);


set('default_stage', 'production');
set('copy_dirs', [
    'config/.env',
    'src',
    'css',
    'img',
    'js',
    'pages',
    '.htaccess',
    'composer.json',
    'composer.lock',
    'favicon.ico',
    'index.php',
    'robots.txt'
 ]);

//File to be copied
set('writable_dirs', ['vendor']);
set('http_user', 'www-data');

task('deploy:upload', function() {
    $files = get('copy_dirs');
    $releasePath = env('release_path');

    foreach ($files as $file)
    {
        upload($file, "{$releasePath}/{$file}");
    }
});

task('deploy:create-folders', function(){
    run("mkdir -p {{release_path}}/vendor");
});

task('deploy:production', [
    'deploy:prepare',
    'deploy:release',
    'deploy:upload',
    'deploy:create-folders',
    'deploy:writable',
    'deploy:vendors',
    'deploy:symlink',
    'current',
])->desc('Deploy application to '.$stage);

after('deploy:production', 'success');