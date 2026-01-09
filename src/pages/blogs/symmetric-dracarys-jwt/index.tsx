import React from "react";
import data from './data';
import BlogIntro from "@/components/blog-intro";
import PreCode from "@/components/pre-code";

const DracarysJWTLaravel = () => {
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
            <section className="max-w-full sm:max-w-3xl mt-8 md:mt-12 text-left space-y-10 px-2 sm:px-4 text-wrap">

                {/* Title and Intro */}
                <BlogIntro data={data} />

                {/* Why JWT in Laravel */}
                <div className="space-y-3 sm:space-y-4">
                    <h2 className="text-xl sm:text-2xl font-semibold text-white">Why Use JWT in Laravel?</h2>
                    <p className="text-gray-400 text-sm sm:text-base">
                        JSON Web Tokens (JWT) have become the standard for secure, stateless authentication in modern web applications.
                        Unlike traditional session-based authentication, which requires server-side session storage, JWT allows you to encode
                        all necessary user data in a signed token that the client can store. Laravel developers benefit from JWT for APIs,
                        Single Page Applications (SPA), and mobile apps because it simplifies authentication across different platforms.
                    </p>
                    <p className="text-gray-400 text-sm sm:text-base">
                        In this comprehensive guide, we’ll explore **Dracarys JWT**, a lightweight Laravel package that makes token-based authentication straightforward.
                        By following this tutorial, you’ll be able to generate tokens, validate them, and securely manage user sessions without relying on server-side storage.
                    </p>
                </div>

                {/* Installation */}
                <div className="space-y-3 sm:space-y-4">
                    <h2 className="text-lg sm:text-xl font-semibold text-white">Installation</h2>
                    <p className="text-gray-400 text-sm sm:text-base">
                        To integrate Dracarys JWT into your Laravel 11 project, you first need to install it using Composer:
                    </p>
                    <PreCode>
                        {`composer require dracarys/jwt`}
                    </PreCode>
                    <p className="text-gray-400 text-sm sm:text-base">
                        This command downloads the package and automatically registers it with Laravel using the package auto-discovery feature.
                        After installation, you’re ready to generate a secure JWT secret key.
                    </p>
                </div>

                {/* Generate JWT Secret */}
                <div className="space-y-3 sm:space-y-4">
                    <h2 className="text-lg sm:text-xl font-semibold text-white">Generating a JWT Secret Key</h2>
                    <p className="text-gray-400 text-sm sm:text-base">
                        Every JWT requires a secret key to sign tokens securely. Dracarys JWT provides a simple way to generate and manage this key.
                        Start by creating a custom Artisan command:
                    </p>
                    <PreCode>
                        {`php artisan make:command GenerateJwtKeyCommand`}
                    </PreCode>
                    <p className="text-gray-400 text-sm sm:text-base">
                        This will create a new command file in <code className="text-white">app/Console/Commands/. Define the command's **signature** and **description**:</code>
                    </p>
                    <PreCode>
                        
{`protected $signature = 'jwt:secret';
protected $description = 'Generate a JWT secret and save it to the .env file.';`}
                        
                    </PreCode>
                    <p className="text-gray-400 text-sm sm:text-base mt-2">
                        Implement the handle method to generate a strong, random key and save it automatically to your <code className="text-white">.env file:</code>
                    </p>
                    <PreCode>
                        
{`public function handle(): void
{
    $jwtSecret = base64_encode(random_bytes(64));

    $envPath = base_path('.env');
    $envContent = File::get($envPath);

    $keyValue = "JWT_SECRET=$jwtSecret";

    if (str_contains($envContent, 'JWT_SECRET=')) {
        $envContent = preg_replace('/JWT_SECRET=.*/', $keyValue, $envContent);
    } else {
        $envContent .= PHP_EOL . $keyValue;
    }

    File::put($envPath, $envContent);

    $this->info('JWT Secret generated successfully');
    $this->line($keyValue);
}`}
                        
                    </PreCode>
                    <p className="text-gray-400 text-sm sm:text-base">
                        Running <code className="text-white">php artisan jwt:secret</code> will create a strong, unique key and persist it in your environment file,
                        which will be used for signing all JWT tokens in your application.
                    </p>
                </div>

                {/* JWT Service */}
                <div className="space-y-3 sm:space-y-4">
                    <h2 className="text-lg sm:text-xl font-semibold text-white">Creating a JWT Service</h2>
                    <p className="text-gray-400 text-sm sm:text-base">
                        To centralize JWT operations, create a dedicated Service class. First, create the directory and service file:
                    </p>
                    <PreCode>
                        
{`# Create directory
mkdir app\\Service\\Jwt

# Create service file
touch app\\Service\\Jwt\\JwtService.php`}
                        
                    </PreCode>
                    <p className="text-gray-400 text-sm sm:text-base">
                        In <code className="text-white">JwtService.php, configure the symmetric encryption using SHA256:</code>
                    </p>
                    <PreCode>
                        
{`public function config()
{
    $secret = env('JWT_SECRET');
    return Configuration::symmetric(new Sha256(), new Symmetric($secret));
}`}
                        
                    </PreCode>
                    <p className="text-gray-400 text-sm sm:text-base">
                        Add a method to create tokens with claims such as `aud`, `iss`, `sub`, and `iat`:
                    </p>
                    <PreCode>
                        
{`public function createToken()
{
    $claims = new TokenData([
        'aud' => 'https://example.com',
        'iss' => 'https://example.com',
        'sub' => '1234567890',
        'iat' => time(),
    ]);

    return $this->config()->createToken($claims, $headers)->toString();
}`}
                        
                    </PreCode>
                    <p className="text-gray-400 text-sm sm:text-base">
                        Include methods to parse and validate JWTs, ensuring tokens are authentic and have not been tampered with:
                    </p>
                    <PreCode>
                        
{`public function parseToken($tokenString) { 
    if (empty($tokenString)) {
            throw new UnauthorizedException('Token string is empty');
        }
    try {
        return $this->config()->parser()->parse($tokenString);
    } catch (\\Throwable $e) {
        throw new UnauthorizedException('Failed to parse token: ' . $e->getMessage());
    }
}

public function validateToken($tokenString) { 
    $parsedToken = $this->parseToken($tokenString);
    
    try {
        $validator = $this->config()->validator($parsedToken)
            ->permittedFor('https://example.com')
            ->issuedBy('https://example.com')
            ->signedWith($config->signer(), $config->verificationKey())
            ->custom(fn($token) => $token->claims()->get('role') === 'tester')
            ->relatedTo(1234567890)
            ->assert();
    } catch (\\Throwable $e) {
        throw new AuthenticationException('Invalid or expired token');
    } 
}`}
                        
                    </PreCode>

                    {/* Conclusion */}
                    <div className="mt-8 sm:mt-10 space-y-2">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">Conclusion</h2>
                        <p className="text-gray-400 text-sm sm:text-base">
                            By implementing Dracarys JWT in Laravel, you gain a flexible, stateless authentication system that is secure and performant.
                            With this setup, your applications can efficiently handle API authentication, SPA login flows, and token validation without the overhead of sessions.
                        </p>
                        <p className="text-gray-400 text-sm sm:text-base">
                            This approach provides a foundation for advanced features like **role-based access control**, **multi-platform authentication**, and **secure token refresh mechanisms**.
                        </p>
                        <p className="text-gray-400 text-sm sm:text-base">
                            JWT is now a cornerstone of modern API design, and mastering its integration in Laravel with Dracarys will significantly improve the security and scalability of your projects.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default DracarysJWTLaravel;
