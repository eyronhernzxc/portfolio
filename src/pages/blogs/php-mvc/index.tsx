import data from './data';

const PHPMVCFrameworkTutorial = () => {
    return (
        <main className="flex flex-col items-center justify-start w-full px-4 sm:px-6 md:px-0 mb-40">
            {/* Header Image */}
            <header className="w-full flex items-center justify-center mt-6 md:mt-8">
                <img
                    src={data.img}
                    alt={`${data.title} image`}
                    className="w-full max-w-full md:max-w-3xl h-64 sm:h-72 md:h-96 object-cover rounded-lg shadow-lg"
                />
            </header>

            {/* Blog Content */}
            <section className="max-w-full sm:max-w-3xl mt-8 md:mt-12 text-left space-y-10 px-2 sm:px-4">

                {/* Title and Intro */}
                <div className="space-y-3 sm:space-y-4">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-200">{data.title}</h1>
                    <p className="text-gray-400 text-sm sm:text-base">{data.description}</p>
                    <p className="text-gray-500 text-xs sm:text-sm">{data.readtime} read time</p>
                </div>

                <span className="mt-4 mb-6 sm:mb-10 block w-full h-px bg-white"></span>

                {/* Tutorial Content */}
                <div className="space-y-6 text-gray-400 text-sm sm:text-base">

                    <h2 className="text-xl sm:text-2xl font-semibold text-white">Introduction</h2>
                    <p>
                        In the world of web development, frameworks like Laravel, Symfony, and CodeIgniter have made building applications easier.
                        But have you ever wondered how these frameworks work under the hood? In this tutorial, we'll create a lightweight PHP MVC (Model-View-Controller) framework from scratch.
                        This will give you a deeper understanding of how MVC frameworks operate and provide a solid foundation for your own projects.
                    </p>
                    <p>Our framework will include:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>A custom router with parameter support</li>
                        <li>Base controller and model classes</li>
                        <li>A request wrapper for handling HTTP requests</li>
                        <li>Helper functions for rendering views and JSON responses</li>
                        <li>PSR-4 autoloading</li>
                    </ul>
                    <p>By the end of this guide, you'll have a functional MVC framework that you can extend and customize for your needs.</p>

                    <h2 className="text-xl sm:text-2xl font-semibold text-white mt-4">Prerequisites</h2>
                    <p>Before we start, make sure you have:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>PHP 8.0 or higher installed</li>
                        <li>Composer for dependency management</li>
                        <li>A web server (Apache/Nginx) or PHP's built-in server</li>
                        <li>Basic knowledge of PHP, OOP, and MVC concepts</li>
                    </ul>

                    <h2 className="text-xl sm:text-2xl font-semibold text-white mt-4">Project Structure</h2>
                    <p>Let's start by setting up our project structure. Create a new directory for your project and organize it like this:</p>
                    <pre className="glass-balanced gradient-1 p-4 !rounded-xl text-sm overflow-x-auto">
                        <code>
{`php-mvc-framework/
├── composer.json
├── config/
│   └── config.php
├── core/
│   ├── Controller.php
│   ├── Facade.php
│   ├── Helpers.php
│   ├── Model.php
│   ├── Request.php
│   └── Router.php
├── public/
│   └── index.php
└── src/
    ├── Controllers/
    │   └── HomePageController.php
    ├── Models/
    │   └── Journal.php
    ├── Resources/
    │   ├── css/
    │   │   └── index.css
    │   └── views/
    │       ├── index.php
    │       └── notfound.php
    └── Routes/
        └── index.php`}
                        </code>
                    </pre>

                    <h2 className="text-xl sm:text-2xl font-semibold text-white mt-4">Step 1: Setting Up Composer and Autoloading</h2>
                    <p>First, let's create our <code>composer.json</code> file to handle autoloading and dependencies:</p>
                    <p>Run <code>composer install</code> to generate the autoloader.</p>
                    <pre className="glass-balanced gradient-1 p-4 !rounded-xl text-sm overflow-x-auto">
                        <code>
{`{
    "name": "your-name/php-mvc-framework",
    "autoload": {
        "psr-4": {
            "App\\\\": "src/",
            "Core\\\\": "core/"
        },
        "files": [
            "core/Helpers.php"
        ]
    },
    "authors": [
        {
            "name": "Your Name",
            "email": "your-email@example.com"
        }
    ],
    "require": {}
}`}
                        </code>
                    </pre>

                    <h2 className="text-xl sm:text-2xl font-semibold text-white mt-4">Step 2: Configuration File</h2>
                    <p>Create <code>config.php</code> to store our application constants.</p>
                    <pre className="glass-balanced gradient-1 p-4 !rounded-xl text-sm overflow-x-auto">
                        <code>
{`<?php

// Site Name
define('SITE_NAME', 'My PHP MVC App');

// App Paths
define('APP_ROOT', dirname(dirname(__FILE__)));
define('URL_ROOT', '/');
define('URL_SUBFOLDER', '');

// DB Params (for future use)
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'my_database');`}
                        </code>
                    </pre>

                    <h2 className="text-xl sm:text-2xl font-semibold text-white mt-4">Step 3: Core Classes</h2>
                    <p><strong>Request Class:</strong> The Request class wraps PHP's superglobals and provides a clean interface for accessing request data.</p>
                    <pre className="glass-balanced gradient-1 p-4 !rounded-xl text-sm overflow-x-auto">
                        <code>
{`<?php

namespace Core;

class Request
{
    public $get;
    public $post;
    public $server;
    public $files;
    public $cookie;
    public $request;

    public function __construct()
    { 
        $this->get = $_GET;
        $this->post = $_POST;
        $this->server = $_SERVER;
        $this->files = $_FILES;
        $this->cookie = $_COOKIE;

        $jsonData = file_get_contents('php://input');
        $jsonInput = json_decode($jsonData, true);

        // Merge all into a unified request array
        $this->request = array_merge($this->get, $this->post, is_array($jsonInput) ? $jsonInput : []);
    }

    public function __get($key)
    {
        return $this->request[$key] ?? null;
    }

    public function all()
    {
        return array_merge($this->get, $this->post);
    }

    public function input($key, $default = null)
    {
        $data = $this->all();
        return $data[$key] ?? $default;
    } 
}`}
                        </code>
                    </pre>

                    <p><strong>Router Class:</strong> The Router handles URL routing with support for parameters and dependency injection.</p>
                    <pre className="glass-balanced gradient-1 p-4 !rounded-xl text-sm overflow-x-auto">
                        <code>
{`<?php

namespace Core;

class Router
{
    protected $routes = [];

    private function addRoute($route, $controller, $action = "__invoke", $method)
    {
        $this->routes[$method][$route] = ['controller' => $controller, 'action' => $action];
    }

    public function get($route, $controller, $action)
    {
        $this->addRoute($route, $controller, $action, "GET");
    }

    public function post($route, $controller, $action)
    {
        $this->addRoute($route, $controller, $action, "POST");
    }

    public function put($route, $controller, $action)
    {
        $this->addRoute($route, $controller, $action, 'PUT');
    }

    public function delete($route, $controller, $action)
    {
        $this->addRoute($route, $controller, $action, 'DELETE');
    }

    public function dispatch()
    {
        $uri = strtok($_SERVER['REQUEST_URI'], '?');
        $method = $_SERVER['REQUEST_METHOD'];

        foreach ($this->routes[$method] ?? [] as $route => $handler) {
            $pattern = preg_replace('/{(\\w+)}/', '(?P<$1>\\w+)', $route);
            $pattern = "#^" . $pattern . "$#";

            if (preg_match($pattern, $uri, $matches)) {
                $controller = $handler['controller'];
                $action = $handler['action'];
                $controllerInstance = new $controller();
                $params = array_filter($matches, 'is_string', ARRAY_FILTER_USE_KEY);

                $reflection = new \\ReflectionMethod($controllerInstance, $action);
                $args = [];
                foreach ($reflection->getParameters() as $param) {
                    $type = $param->getType();
                    if ($type && $type instanceof \\ReflectionNamedType && $type->getName() === 'Core\\\\Request') {
                        $args[] = new \\Core\\Request();
                    } elseif (isset($params[$param->getName()])) {
                        $args[] = $params[$param->getName()];
                    } else {
                        $args[] = null;
                    }
                }
                call_user_func_array([$controllerInstance, $action], $args);
                return;
            }
        }
        return view('notfound');
    }
}`}
                        </code>
                    </pre>

                    <p><strong>Base Controller and Model Classes:</strong></p>
                    <pre className="glass-balanced gradient-1 p-4 !rounded-xl text-sm overflow-x-auto">
                        <code>
{`<?php
namespace Core;

class Controller
{
    // Base controller class - can be extended for common functionality
}

<?php
namespace Core;

abstract class Model
{
    public function update() {}
    public function get() {}
    public function getAll() {}
    public function delete() {}

    public static function create($request)
    {
        // Basic create method - override in child classes
        return [];
    }
}`}
                        </code>
                    </pre>

                    <p><strong>Helper Functions:</strong> Create <code>Helpers.php</code> with utility functions.</p>
                    <pre className="glass-balanced gradient-1 p-4 !rounded-xl text-sm overflow-x-auto">
                        <code>
{`<?php

if(!function_exists('json')){
    function json($data, $code = 200) {
        header('Content-Type: application/json');
        http_response_code($code);
        echo json_encode($data);
        return;
    }
}

if(!function_exists('view')){
    function view($view, $data = [])
    {
        extract($data);
        include "../src/Resources/views/$view.php";
    }
}`}
                        </code>
                    </pre>

                    <h2 className="text-xl sm:text-2xl font-semibold text-white mt-4">Step 4: Application Entry Point</h2>
                    <p>Create <code>index.php</code> as the main entry point.</p>
                    <pre className="glass-balanced gradient-1 p-4 !rounded-xl text-sm overflow-x-auto">
                        <code>
{`<?php

require '../vendor/autoload.php';
require_once '../config/config.php';

$router = require '../src/Routes/index.php';`}
                        </code>
                    </pre>

                    <h2 className="text-xl sm:text-2xl font-semibold text-white mt-4">Step 5: Routes Configuration</h2>
                    <p>Define your routes in <code>index.php</code>.</p>
                    <pre className="glass-balanced gradient-1 p-4 !rounded-xl text-sm overflow-x-auto">
                        <code>
{`<?php
use App\\Controllers\\HomePageController;
use Core\\Router;

$router = new Router();

$router->get('/', HomePageController::class, 'index');
$router->get('/user/{id}', HomePageController::class, 'show');

$router->dispatch();`}
                        </code>
                    </pre>

                    <h2 className="text-xl sm:text-2xl font-semibold text-white mt-4">Step 6: Creating Controllers and Models</h2>
                    <p><strong>HomePageController:</strong></p>
                    <pre className="glass-balanced gradient-1 p-4 !rounded-xl text-sm overflow-x-auto">
                        <code>
{`<?php
namespace App\\Controllers;

use App\\Models\\Journal;
use Core\\Controller;
use Core\\Request;

class HomePageController extends Controller
{
    private $journal;

    public function __construct()
    {
        $this->journal = new Journal;
    }

    public function index(Request $request)
    {
        return view('index', [
            'title' => "My MVC App", 
            "description" => "You're all set up and ready to build"
        ]);
    }

    public function show($id, Request $request) {
        return view('index', [
            'title' => "User Profile", 
            "description" => "Welcome User $id"
        ]);
    }
}`}
                        </code>
                    </pre>

                    <p><strong>Journal Model:</strong></p>
                    <pre className="glass-balanced gradient-1 p-4 !rounded-xl text-sm overflow-x-auto">
                        <code>
{`<?php
namespace App\\Models;

use Core\\Model;

class Journal extends Model
{
    // Extend with journal-specific methods
}`}
                        </code>
                    </pre>

                    <h2 className="text-xl sm:text-2xl font-semibold text-white mt-4">Step 7: Views</h2>
                    <p>Create a simple view in <code>index.php</code>:</p>
                    <pre className="glass-balanced gradient-1 p-4 !rounded-xl text-sm overflow-x-auto">
                        <code>
{`<?php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $title; ?></title>
</head>
<body>
    <h1><?php echo $title; ?></h1>
    <p><?php echo $description; ?></p>
</body>
</html>`}
                        </code>
                    </pre>

                    <p>And a 404 view in <code>notfound.php</code>:</p>
                    <pre className="glass-balanced gradient-1 p-4 !rounded-xl text-sm overflow-x-auto">
                        <code>
{`<?php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Not Found</title>
</head>
<body>
    <h1>404 - Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
</body>
</html>`}
                        </code>
                    </pre>

                    <h2 className="text-xl sm:text-2xl font-semibold text-white mt-4">Step 8: Running the Application</h2>
                    <p>To run your application:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Navigate to the public directory</li>
                        <li>Start a PHP server: <code>php -S localhost:8000</code></li>
                        <li>Visit <a href="http://localhost:8000" className="text-blue-400">http://localhost:8000</a> in your browser</li>
                        <li>You should see your home page. Try visiting <a href="http://localhost:8000/user/123" className="text-blue-400">http://localhost:8000/user/123</a> to test parameterized routes.</li>
                    </ul>

                    <h2 className="text-xl sm:text-2xl font-semibold text-white mt-4">Conclusion</h2>
                    <p>Congratulations! You've built a basic PHP MVC framework from scratch. This framework includes:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>A flexible routing system with parameter support</li>
                        <li>Dependency injection for controllers</li>
                        <li>Clean separation of concerns with MVC</li>
                        <li>Helper functions for common tasks</li>
                        <li>PSR-4 autoloading</li>
                    </ul>
                    <p>This is just the foundation. You can extend it by:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Adding database integration</li>
                        <li>Implementing middleware</li>
                        <li>Adding more HTTP methods</li>
                        <li>Creating form validation</li>
                        <li>Adding authentication</li>
                    </ul>
                    <p>The beauty of building your own framework is that you understand every part of it and can customize it to fit your specific needs. Happy coding!</p>
                    <p><em>This tutorial was created to help developers understand the inner workings of PHP MVC frameworks. The code is simplified for educational purposes and may need additional security measures for production use.</em></p>
                </div>
            </section>
        </main>
    )
}

export default PHPMVCFrameworkTutorial;
