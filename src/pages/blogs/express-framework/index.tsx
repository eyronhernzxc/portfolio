import React from "react";
import data from './data.ts'
import BlogIntro from "@/components/blog-intro";
import PreCode from "@/components/pre-code";
const CustomExpressFramework = () => {
    return (
        <main className="flex flex-col items-center w-full px-4 sm:px-6 md:px-0 mb-40">
            {/* Header Image */}
            <header className="w-full flex justify-center mt-8">
                <img
                    src={data.img}
                    alt={data.title}
                    className="w-full max-w-3xl h-72 md:h-96 object-cover !rounded-xl-lg shadow-lg"
                />
            </header>

            {/* Content */}
            <section className="max-w-3xl w-full mt-12 space-y-10 text-left">

                {/* Title */}
                <BlogIntro data={data}/>

                {/* Introduction */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-primary">
                        Introduction
                    </h2>
                    <p className="text-gray-400">
                        If you've ever worked with Express.js, you'll know it's powerful but often requires significant boilerplate code for routing, validation, and dependency injection. Today, I'm excited to share Express Made Easy - a framework that maintains all the flexibility of Express while adding powerful decorators and structured patterns that simplify API development.
                    </p>
                </section>

                {/* Setup */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-primary">
                        What Makes Express Made Easy Special?
                    </h2>

                    <p className="text-gray-400">
                        This framework keeps the Express.js foundation you love while introducing:
                    </p>
                    <ul className="list-disc list-inside text-gray-400">
                        <li>TypeScript-first approach with full type safety</li>
                        <li>Decorator-based routing for clean, intuitive API definition</li>
                        <li>Built-in validation with express-validator integration</li>
                        <li>Dependency injection for better testability and organization</li>
                        <li>Structured error handling with custom exceptions</li>
                        <li>Minimal boilerplate without sacrificing functionality</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-primary">Core Architecture Overview</h3>

                    <p className="text-gray-400">
                        The framework follows a clean separation of concerns with controllers handling HTTP logic, services containing business logic, and models defining data structures.
                    </p>

                    <h3 className="text-xl font-semibold text-primary">The Main Components</h3>
                    <h3 className="text-xl font-semibold text-primary">1. Configuration Management</h3>
                    <p className="text-gray-400">
                        The framework loads configuration from environment variables with sensible defaults:
                    </p>
                    <PreCode>
{`// src/config/app.ts
const config = {
    port: parseInt(process.env.PORT ?? '5001', 10),
    nodeEnv: process.env.NODE_ENV ?? 'development',
    url: process.env.BASE_URL ?? '/api/v1',
    timezone: 'Asia/Manila',
    locale: 'en',
    debug: (process.env.APP_DEBUG ?? 'false') === 'true'
};`}
                    </PreCode>
                </section>

                {/* Architecture */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-primary">
                        2. Decorator-Based Routing
                    </h2>

                    <p className="text-gray-400">
                        Say goodbye to verbose route definitions. Our routing decorators make API endpoints clean and self-documenting
                    </p>
                    <PreCode>
                        {`// src/user/user.controller.ts
@Controller('/users')
export class UserController {

    @Inject(UserServices)
    private userServices!: UserServices

    @Get('/')
    @Validate(FindAllUserSchema)
    findAll(req: Request, res: Response) {
        return this.userServices.findAll(req, res)
    }

    @Get('/:id')
    findOne(req: Request, res: Response) {
        return this.userServices.findOne(req, res)
    }

    @Post("/")
    @Validate(CreateUserSchema)
    create(req: Request, res: Response) {
        return this.userServices.create(req, res)
    }
}`}
                    </PreCode>
                </section>

                {/* Controller */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-primary">
                        3. Built-in Validation
                    </h2>
                    <p className="text-gray-400">
                        Validation becomes declarative and reusable with our @Validate decorator:
                    </p>
                    <PreCode >
{`// src/user/validators/create-user-validator.ts
export const CreateUserSchema: ValidationChain[] = [
    body('username')
        .notEmpty().withMessage('Username is required')
        .isString().withMessage('Username must be a string'),

    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email must be valid email address'),
];`}
                    </PreCode>
                    <p className="text-gray-400">
                        In this case we use <strong className="text-primary">express-validator</strong> but you can still use your favourite validation library.
                    </p>
                </section>

                {/* Validation */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-primary">
                        4. Dependency Injection
                    </h2>
                    <p className="text-gray-400">
                        Our lightweight DI container manages service dependencies automatically:
                    </p>

                    <PreCode >
{`// src/utils/decorators/injecting.ts
export function Inject(type: any) {
    return function (target: any, propertyKey: string) {
        Object.defineProperty(target, propertyKey, {
            get: () => container.get(type),
            enumerable: true,
            configurable: true,
        });
    };
}`}
                    </PreCode>

                    <span className="mt-4 mb-6 sm:mb-10 block w-full h-px "></span>
                    <h2 className="text-3xl font-semibold text-primary">
                        Getting Started
                    </h2>
                    <h2 className="text-2xl font-semibold text-primary">
                        Installation
                    </h2>

                    <PreCode >
                        {`npm install express body-parser express-validator reflect-metadata
npm install -D typescript @types/express ts-node nodemon`}
                    </PreCode>
                </section>

                {/* Services */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-primary">
                        Project Structure
                    </h2>

                    <PreCode >
{`src/
├── config/          # App configuration
├── constants/       # HTTP status codes and constants
├── exceptions/      # Custom exception classes
├── middlewares/     # Express middleware
├── user/           # Feature module example
│   ├── validators/  # Validation schemas
│   ├── user.controller.ts
│   ├── user.model.ts
│   └── user.services.ts
├── utils/          # Framework utilities
│   ├── decorators/  # Routing, validation, DI decorators
│   ├── app-error.ts
│   └── exit-handlers.ts
├── app.ts          # Main app class
├── middlewares.ts  # Middleware configuration
└── server.ts       # Server entry point`}
                    </PreCode>
                </section>

                {/* Error Handling */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-primary">
                        Creating Your First API
                    </h2>
                    <p className="text-gray-400">
                        1. Define Your Model:
                    </p>

                    <PreCode >
{`// src/product/product.model.ts
export type Product = {
    id: number;
    name: string;
    price: number;
    created_at: string;
    updated_at: string;
}`}
                    </PreCode>
                    <p className="text-gray-400">
                        2. Create a Service:
                    </p>

                    <PreCode >
                        {`// src/product/product.services.ts
import { Injectable } from '../utils/decorators/injecting';

@Injectable()
export class ProductServices {
    private products: Product[] = [];

    findAll() {
        return this.products;
    }
    
    // ... other service methods
}`}
                    </PreCode>
                    <p className="text-gray-400">
                        3. Build the Controller:
                    </p>

                    <PreCode >
                        {`// src/product/product.controller.ts
import { Controller, Get } from '../utils/decorators/routing';
import { Inject } from '../utils/decorators/injecting';
import { ProductServices } from './product.services';

@Controller('/products')
export class ProductController {
    
    @Inject(ProductServices)
    private productServices!: ProductServices;

    @Get('/')
    findAll(req: Request, res: Response) {
        const products = this.productServices.findAll();
        return res.json({ data: products });
    }
}`}
                    </PreCode>
                    <p className="text-gray-400">
                        4. Register Your Controller:
                    </p>

                    <PreCode >
                        {`// src/middlewares.ts
import { ProductController } from './product/product.controller';

class AppMiddleware {
    private controller = [
        UserController,
        ProductController  // Add your new controller
    ]
    
    // ... rest of the class
}`}
                    </PreCode>
                </section>

                {/* Conclusion */}
                <section className="space-y-4">
                    <h2 className="text-3xl font-semibold text-primary">
                        Why This Approach Wins
                    </h2>
                    <h2 className="text-2xl font-semibold text-primary">
                        Reduced Boilerplate
                    </h2>
                    <p className="text-gray-400">
                        Traditional Express setup often involves repetitive route definitions. Our framework cuts this down significantly:
                    </p>
                    <h2 className="text-gray-400">
                        Before (Traditional Express):
                    </h2>
                    <PreCode >
                        {`router.get('/users', userController.findAll);
router.get('/users/:id', userController.findOne);
router.post('/users', validateUser, userController.create);
// ... more routes`}
                    </PreCode>
                    <h2 className="text-gray-400">
                        After (Express Made Easy):
                    </h2>
                    <PreCode >
                        {`@Controller('/users')
class UserController {
    @Get('/') findAll() { }
    @Get('/:id') findOne() { }
    @Post('/') create() { }
}`}
                    </PreCode>
                    <h2 className="text-2xl font-semibold text-primary">
                        Better Error Handling
                    </h2>
                    <h2 className="text-gray-400">
                        The framework includes structured exception handling with custom error types:
                    </h2>
                    <PreCode >
                        {`// Automatic validation error handling
throw new ValidationException("Validation Failed", validationErrors);

// Easy not found handling
throw new NotFoundException('User not found');`}
                    </PreCode>

                    <h2 className="text-2xl font-semibold text-primary">
                        Type Safety
                    </h2>
                    <p className="text-gray-400">
                        Full TypeScript support means you catch errors at compile time rather than runtime, with intelligent type inference throughout your application.
                    </p>
                    <h2 className="text-2xl font-semibold text-primary">
                        Migration from Traditional Express
                    </h2>
                    <p className="text-gray-400">
                        If you're coming from traditional Express, you'll find the transition smooth:
                    </p>
                    <ol className="list-disc list-inside text-gray-400">
                        <li>Keep your existing middleware - they work exactly the same</li>
                        <li>Convert route definitions to use decorators</li>
                        <li>Organize business logic into service classes</li>
                        <li>Use our validation decorators instead of manual validation middleware</li>
                    </ol>

                    <h2 className="text-3xl font-semibold text-primary">
                        Advanced Features
                    </h2>
                    <h2 className="text-2xl font-semibold text-primary">
                        Custom Decorators
                    </h2>
                    <p className="text-gray-400">
                        Extend the framework with your own decorators using the same patterns:
                    </p>
                    <PreCode >
                        {`function Auth(role: string): MethodDecorator {
    return (target, propertyKey, descriptor) => {
        // Your authentication logic
    };
}`}
                    </PreCode>

                    <h2 className="text-2xl font-semibold text-primary">
                        Plugin System
                    </h2>
                    <p className="text-gray-400">
                        The modular architecture makes it easy to add features like logging, caching, or database integrations.
                    </p>
                    <h2 className="text-2xl font-semibold text-primary">
                        Performance Considerations
                    </h2>
                    <p className="text-gray-400">
                        The framework adds minimal overhead - most of the decorator processing happens at application startup, so runtime performance is comparable to vanilla Express.js.
                    </p>

                    <span className="mt-4 mb-6 sm:mb-10 block w-full h-px"></span>
                    <h2 className="text-2xl font-semibold text-primary">
                        Conclusion
                    </h2>
                    <p className="text-gray-400">
                        Express Made Easy gives you the best of both worlds: the robustness and ecosystem of Express.js combined with modern development patterns that reduce boilerplate and improve maintainability. It's particularly beneficial for:
                    </p>
                    <ol className="list-disc list-inside text-gray-400">
                        <li>Teams adopting TypeScript</li>
                        <li>Projects requiring consistent API patterns</li>
                        <li>Organize business logic into service classes</li>
                        <li>Developers who want faster iteration without sacrificing code quality</li>
                    </ol>
                    <p className="text-gray-400">
                        The framework is designed to be incrementally adoptable - you can start with one endpoint and gradually migrate your entire API.
                    </p>
                    <p className="text-gray-400">
                        Ready to try it out? Clone the example structure above and start building your next API with the Express.js you love, but with modern developer experience improvements that will save you hours of development time.
                    </p>
                </section>

            </section>
        </main>
    );
};

export default CustomExpressFramework;
