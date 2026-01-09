import data from './data'
import PreCode from "@/components/pre-code";
import BlogIntro from "@/components/blog-intro";
const JWTParserUsage = () => {
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
                <BlogIntro data={data}/>

                {/* Installation */}
                <div className="space-y-4">
                    <h2 className="text-xl sm:text-2xl font-semibold text-white">Installation</h2>
                    <p className="text-gray-400 text-sm sm:text-base">Install via npm:</p>
                    <pre className="glass-balanced gradient-1 p-4 !rounded-xl text-sm overflow-x-auto">
{`npm i jsonwebtoken-parser`}
                    </pre>

                    <h2 className="text-xl sm:text-2xl font-semibold text-white mt-4">Importing</h2>
                    <pre className="glass-balanced gradient-1 p-4 !rounded-xl text-sm overflow-x-auto">
{`import { Jwt } from "jsonwebtoken-parser";`}
                    </pre>
                </div>

                {/* Usage */}
                <div className="space-y-4">
                    <h2 className="text-xl sm:text-2xl font-semibold text-white">Basic Usage</h2>
                    <PreCode>

                        {`const tokenString = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ...";

const { headers, claims, parsed, signature, validate } = new Jwt(tokenString);

// OR
const jwt = new Jwt(tokenString);`}

                    </PreCode>

                    <h2 className="text-xl sm:text-2xl font-semibold text-white mt-4">Accessing Headers & Claims</h2>
                    <PreCode>
{`const sub = claims.get('sub');
const typ = headers.get('typ');
const hasExp = claims.has('exp');`}
                    </PreCode>

                    <h2 className="text-xl sm:text-2xl font-semibold text-white mt-4">Validating JWT Claims</h2>
                    <PreCode>
                        {`const isExpired = validate.isExpired();
const isRelatedTo = validate.isRelatedTo(sub);
const hasBeenIssuedBy = validate.hasBeenIssuedBy('https://example.com');`}
                    </PreCode>

                    <h2 className="text-xl sm:text-2xl font-semibold text-white mt-4">Accessing Signature</h2>
                    <PreCode>
{`console.log("Signature (hex):", signature);`}
                    </PreCode>

                    <h2 className="text-xl sm:text-2xl font-semibold text-white mt-4">Full Decoded Object</h2>
                    <PreCode>
                        {`console.log("Full decoded object:", parsed);`}
                    </PreCode>

                    <h2 className="text-xl sm:text-2xl font-semibold text-white mt-4">Notes</h2>
                    <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm sm:text-base">
                        <li>This library does not support JWE (encrypted JWTs). Only JWS is supported.</li>
                        <li>Headers and claims are returned as Map objects for convenience.</li>
                        <li>Always verify the signature on the backend before trusting the claims.</li>
                    </ul>
                </div>

            </section>
        </main>
    )
}

export default JWTParserUsage
