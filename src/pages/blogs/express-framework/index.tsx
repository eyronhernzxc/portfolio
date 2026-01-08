import React from "react";
import data from './data.ts'
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
                <div className="space-y-3">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-200">{data.title}</h1>
                    <p className="text-gray-400 text-sm sm:text-base">{data.description}</p>
                    <p className="text-gray-500 text-xs sm:text-sm">{data.readtime} read time</p>
                </div>

                <hr className="border-white/20" />

                {/* Introduction */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white">
                        Introduction
                    </h2>
                    <p className="text-gray-400">
                        Express.js has long been the go-to framework for building APIs
                        in Node.js. However, as applications scale, maintaining clean
                        architecture and avoiding repetitive boilerplate becomes
                        increasingly difficult.
                    </p>
                    <p className="text-gray-400">
                        This article introduces a custom Express framework written in
                        TypeScript that uses decorators, dependency injection, and
                        built-in validation to simplify API development.
                    </p>
                </section>

                {/* Setup */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white">
                        Setting Up the Project
                    </h2>

                    <p className="text-gray-400">
                        The framework is built with TypeScript and follows a modular
                        architecture.
                    </p>

                    <h3 className="text-xl font-semibold text-white">Prerequisites</h3>
                    <ul className="list-disc list-inside text-gray-400">
                        <li>Node.js (v14 or higher)</li>
                        <li>npm or yarn</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-white">Installation</h3>

                    <pre className="glass-balanced gradient-1 p-4 !rounded-xl text-sm overflow-x-auto">
{`git clone <repository-url>
cd express-framework-main
npm install
npm run dev`}
                    </pre>
                </section>

                {/* Architecture */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white">
                        Framework Architecture
                    </h2>

                    <ul className="list-disc list-inside text-gray-400">
                        <li>Decorators for routing and DI</li>
                        <li>Controllers for request handling</li>
                        <li>Services for business logic</li>
                        <li>Validators for request validation</li>
                        <li>Middleware and custom exceptions</li>
                    </ul>
                </section>

                {/* Controller */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white">
                        Creating a Controller
                    </h2>

                    <pre className="glass-balanced gradient-1 p-4 !rounded-xl text-sm overflow-x-auto">
{`@Controller('/users')
export class UserController {

    @Inject(UserServices)
    private userServices!: UserServices;

    @Get('/')
    findAll(req, res) {
        return this.userServices.findAll(req, res);
    }

    @Post('/')
    @Validate(CreateUserSchema)
    create(req, res) {
        return this.userServices.create(req, res);
    }
}`}
                    </pre>
                </section>

                {/* Validation */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white">
                        Request Validation
                    </h2>

                    <pre className="glass-balanced gradient-1 p-4 !rounded-xl text-sm overflow-x-auto">
{`export const CreateUserSchema = [
    body('username').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
];`}
                    </pre>

                    <p className="text-gray-400">
                        Validation is automatically executed before controller methods
                        run. Invalid requests throw a ValidationException.
                    </p>
                </section>

                {/* Services */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white">
                        Implementing Services
                    </h2>

                    <pre className="glass-balanced gradient-1 p-4 !rounded-xl text-sm overflow-x-auto">
{`@Injectable()
export class UserServices {
    private users = [];

    findAll(req, res) {
        return res.json(this.users);
    }

    create(req, res) {
        const user = { id: Date.now(), ...req.body };
        this.users.push(user);
        return res.status(201).json(user);
    }
}`}
                    </pre>
                </section>

                {/* Error Handling */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white">
                        Error Handling
                    </h2>

                    <p className="text-gray-400">
                        Custom exceptions and a global error handler ensure consistent
                        API responses.
                    </p>

                    <pre className="glass-balanced gradient-1 p-4 !rounded-xl text-sm overflow-x-auto">
{`export const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors || null,
    });
};`}
                    </pre>
                </section>

                {/* Conclusion */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white">
                        Conclusion
                    </h2>
                    <p className="text-gray-400">
                        This custom Express framework provides a scalable, structured
                        way to build APIs using modern TypeScript patterns.
                    </p>
                    <p className="text-gray-400">
                        It’s ideal for developers who want more control than traditional
                        Express apps while avoiding the complexity of full-fledged
                        frameworks.
                    </p>
                </section>

            </section>
        </main>
    );
};

export default CustomExpressFramework;
