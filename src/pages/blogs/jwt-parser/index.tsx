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
                    <h2 className="text-xl sm:text-2xl font-semibold text-white">Introduction</h2>
                    <p className="text-gray-400 text-sm sm:text-base">JSON Web Tokens (JWTs) are a popular way to securely transmit information between parties as a JSON object. They're commonly used for authentication and authorization in web applications. While there are plenty of libraries available for decoding JWTs, understanding how to build your own decoder from scratch can be a great learning experience and gives you full control over the process.</p>

                    <p className="text-gray-400 text-sm sm:text-base">In this article, we'll create a simple JWT decoder in JavaScript that doesn't rely on any external libraries. We'll focus on decoding the header and payload (claims) of a JWT, leaving signature verification as an exercise for the reader. This approach is perfect for scenarios where you want to minimize dependencies or understand the inner workings of JWT parsing.</p>

                    <h2 className="text-xl sm:text-2xl font-semibold text-white mt-4">Understanding JWT Structure</h2>
                    <p className="text-gray-400 text-sm sm:text-base">Before we dive into the code, let's quickly recap what a JWT looks like. A JWT consists of three parts separated by dots:</p>
                    <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm sm:text-base">
                        <li><strong>Header:</strong> Contains metadata about the token, typically the algorithm used for signing and the token type.</li>
                        <li><strong>Payload:</strong> Contains the claims or data you're transmitting.</li>
                        <li><strong>Signature:</strong> Used to verify that the sender is who they claim to be and that the message wasn't altered.</li>
                    </ul>
                    <p className="text-gray-400 text-sm sm:text-base">A typical JWT looks like this:</p>

                    <PreCode>
{`eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`}
                    </PreCode>
                    <p className="text-gray-400 text-sm sm:text-base">Each part is base64url-encoded JSON. Our decoder will decode the first two parts and return them as JavaScript objects.</p>
                </div>

                {/* Usage */}
                <div className="space-y-4">
                    <h2 className="text-xl sm:text-2xl font-semibold text-white">Step 1: Setting Up the Class Structure</h2>
                    <p className="text-gray-400 text-sm sm:text-base">We'll create a TokenDecoder class with a static decode method. This makes it easy to use without instantiating the class.</p>
                    <PreCode>{`class TokenDecoder {
  static decode(token) {
    // Implementation will go here
  }
}`}
                    </PreCode>
                    <h2 className="text-xl sm:text-2xl font-semibold text-white">Step 2: Input Validation</h2>
                    <p className="text-gray-400 text-sm sm:text-base">First, we need to ensure the input is a valid non-empty string:</p>
                    <PreCode>{`static decode(token) {
  if (typeof token !== "string" || !token.trim()) {
    throw new Error("Token must be a non-empty string");
  }
  // Rest of the implementation
}`}
                    </PreCode>
                    <h2 className="text-xl sm:text-2xl font-semibold text-white">Step 3: Splitting the JWT</h2>
                    <p className="text-gray-400 text-sm sm:text-base">JWTs are divided into three parts by dots. We'll split the token and validate that all three parts exist:</p>
                    <PreCode>
                        {`const [headerPart, claimsPart, signaturePart] = token.split(".");
if (!headerPart || !claimsPart || !signaturePart) {
  throw new Error("Invalid JWT format");
}`}
                    </PreCode>
                    <h2 className="text-xl sm:text-2xl font-semibold text-white">Step 4: Decoding Base64url</h2>
                    <p className="text-gray-400 text-sm sm:text-base">JWTs use base64url encoding, which is similar to base64 but with some differences:</p>
                    <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm sm:text-base">
                        <li>Uses "-" instead of "+"</li>
                        <li>Uses "_" instead of "/"</li>
                        <li>No padding required</li>
                    </ul>
                    <p className="text-gray-400 text-sm sm:text-base">We'll create a private method to handle this decoding:</p>
                    <PreCode>
                        {`#base64Decode(value) {
  if (value.length % 4) {
    value += "=".repeat(4 - (value.length % 4));
  }

  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");

  try {
    return Buffer.from(normalized, "base64").toString("utf8");
  } catch {
    throw new Error("Invalid base64url string");
  }
}`}
                    </PreCode>
                    <p className="text-gray-400 text-sm sm:text-base">This method:</p>

                    <ol className="list-disc list-inside text-gray-400 space-y-1 text-sm sm:text-base">
                        <li>Adds padding if necessary</li>
                        <li>Converts base64url characters to standard base64</li>
                        <li>Decodes using Node.js's Buffer (or atob in browsers)</li>
                        <li>Handles decoding errors</li>
                    </ol>


                    <h2 className="text-xl sm:text-2xl font-semibold text-white">Step 5: Parsing JSON</h2>
                    <p className="text-gray-400 text-sm sm:text-base">Once we have the decoded string, we need to parse it as JSON:</p>
                    <PreCode>
                        {`#jsonDecode(value) {
  try {
    return JSON.parse(value);
  } catch {
    throw new Error("Invalid JSON structure in token part");
  }
}`}
                    </PreCode>
                    <h2 className="text-xl sm:text-2xl font-semibold text-white">Step 6: Putting It All Together</h2>
                    <p className="text-gray-400 text-sm sm:text-base">Now we'll create a helper method that combines base64url decoding and JSON parsing, then use it in our main decode method:</p>
                    <PreCode>
                        {`#decodePart(value) {
  return this.#jsonDecode(this.#base64Decode(value));
}

static decode(token) {
  if (typeof token !== "string" || !token.trim()) {
    throw new Error("Token must be a non-empty string");
  }

  const [headerPart, claimsPart, signaturePart] = token.split(".");
  if (!headerPart || !claimsPart || !signaturePart) {
    throw new Error("Invalid JWT format");
  }

  const decoder = new TokenDecoder();
  return {
    header: decoder.#decodePart(headerPart),
    claims: decoder.#decodePart(claimsPart)
  };
}`}
                    </PreCode>


                    <h2 className="text-xl sm:text-2xl font-semibold text-white">Complete Implementation</h2>
                    <p className="text-gray-400 text-sm sm:text-base">Here's the full <strong className="text-white">TokenDecoder</strong> class:</p>
                    <PreCode>
                        {`class TokenDecoder {
  static decode(token) {
    if (typeof token !== "string" || !token.trim()) {
      throw new Error("Token must be a non-empty string");
    }

    const [headerPart, claimsPart, signaturePart] = token.split(".");
    if (!headerPart || !claimsPart || !signaturePart) {
      throw new Error("Invalid JWT format");
    }

    const decoder = new TokenDecoder();
    return {
      header: decoder.#decodePart(headerPart),
      claims: decoder.#decodePart(claimsPart)
    };
  }

  #decodePart(value) {
    return this.#jsonDecode(this.#base64Decode(value));
  }

  #base64Decode(value) {
    if (value.length % 4) {
      value += "=".repeat(4 - (value.length % 4));
    }

    const normalized = value.replace(/-/g, "+").replace(/_/g, "/");

    try {
      return Buffer.from(normalized, "base64").toString("utf8");
    } catch {
      throw new Error("Invalid base64url string");
    }
  }

  #jsonDecode(value) {
    try {
      return JSON.parse(value);
    } catch {
      throw new Error("Invalid JSON structure in token part");
    }
  }
}`}
                    </PreCode>

                    <h2 className="text-xl sm:text-2xl font-semibold text-white">Example Usage</h2>
                    <p className="text-gray-400 text-sm sm:text-base">Let's test our decoder with a sample JWT:</p>
                    <PreCode>
                        {`const decoded = TokenDecoder.decode(
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOlsiaHR0cHM6Ly9leGFtcGxlLmNvbSJdLCJpc3MiOiJodHRwczovL2V4YW1wbGUuY29tIiwic3ViIjoiMTIzNDU2Nzg5MCIsImlhdCI6MTc2MTI5Njc3NSwidGVzdCI6InRlc3RlciJ9.tzyBFaTFwsrvhnq6GYlLc_fKDOmm2OyBI8CNG3x3a48"
);

console.log('HEADER:', decoded.header);
console.log('CLAIMS:', decoded.claims);`}
                    </PreCode>
                    <p className="text-gray-400 text-sm sm:text-base">This will output:</p>
                    <PreCode>
                        {`HEADER: { typ: 'JWT', alg: 'HS256' }
CLAIMS: { 
  aud: [ 'https://example.com' ], 
  iss: 'https://example.com', 
  sub: '1234567890', 
  iat: 1761296775, 
  test: 'tester' 
}`}
                    </PreCode>
                    <h2 className="text-xl sm:text-2xl font-semibold text-white">Browser Compatibility</h2>
                    <p className="text-gray-400 text-sm sm:text-base">If you're using this in a browser environment, you'll need to replace <strong className="text-white">Buffer.from()</strong> with <strong className="text-white">atob()</strong>:</p>
                    <PreCode>
                        {`#base64Decode(value) {
  if (value.length % 4) {
    value += "=".repeat(4 - (value.length % 4));
  }

  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");

  try {
    return decodeURIComponent(atob(normalized).split('').map(c => 
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join(''));
  } catch {
    throw new Error("Invalid base64url string");
  }
}`}
                    </PreCode>
                    <h2 className="text-xl sm:text-2xl font-semibold text-white">Important Security Note</h2>
                    <p className="text-gray-400 text-sm sm:text-base">Remember, this decoder only extracts the header and payload from a JWT. It does not verify the signature, which means you cannot trust the contents for security-critical operations. Always verify the signature using the appropriate algorithm and secret key before using the decoded data.</p>

                    <h2 className="text-xl sm:text-2xl font-semibold text-white">Conclusion</h2>
                    <p className="text-gray-400 text-sm sm:text-base">Building your own JWT decoder is a great way to understand how JWTs work under the hood. This implementation provides a solid foundation that you can extend with signature verification, support for different algorithms, and additional validation as needed.</p>
                    <p className="text-gray-400 text-sm sm:text-base">The key takeaways are:</p>

                    <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm sm:text-base">
                        <li>JWTs consist of three base64url-encoded parts</li>
                        <li>Proper input validation is crucial</li>
                        <li>Base64url decoding requires handling special characters and padding</li>
                        <li>Always parse decoded strings as JSON</li>
                        <li>Never trust JWT contents without signature verification</li>
                    </ul>
                    <p className="text-gray-400 text-sm sm:text-base">This approach gives you full control over the decoding process and can be easily adapted for different environments or extended with additional features. Happy coding!</p>

                </div>

                <p className="text-gray-400 text-sm sm:text-base italic border-l-2 border-gray-600 pl-4">
                    I built this JWT Dracarys from scratch to better understand JWT parsing without relying on external libraries. You can also use it as an npm package in your own projects. If you found it helpful, your support would be greatly appreciated.
                </p>
            </section>
        </main>
    )
}

export default JWTParserUsage
