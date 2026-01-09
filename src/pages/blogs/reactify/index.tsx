import data from './data'
import BlogIntro from "@/components/blog-intro";
import PreCode from "@/components/pre-code";

const InfyHowToUse = () => {
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

            {/* Blog Title & Intro */}
            <section className="max-w-full sm:max-w-3xl mt-8 md:mt-12 text-left space-y-10 px-2 sm:px-4">

                {/* Title and Intro */}
                <BlogIntro data={data}/>

                {/* Starter Topic */}
                <div className="space-y-8">
                    <p className="text-2xl sm:text-3xl font-semibold text-white">
                        Are you tired of manually creating folders and writing repetitive React code?
                    </p>
                    <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                        If you’re a React developer, you know the pain: every new component, hook, page, or provider starts with the same boilerplate. Folder structures, import statements, and basic setup — it all adds up and slows you down.
                    </p>

                    <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                        Enter <strong>Infy React CLI</strong> — a lightweight and flexible command-line tool designed to scaffold React components, hooks, pages, and providers instantly, so you can focus on building features instead of boilerplate.
                    </p>

                    {/* Features */}
                    <div className="space-y-4">
                        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">Why Infy React CLI?</h2>
                        <ul className="list-disc list-inside text-gray-400 space-y-1 leading-relaxed text-sm sm:text-base">
                            <li>Generate ready-to-use React code in seconds</li>
                            <li>Supports nested folder paths (e.g., <code>ui/Button</code>)</li>
                            <li>Flexible file extensions: JS, JSX, TS, TSX</li>
                            <li>Customizable folder structure via <code>.infyrc.json</code></li>
                            <li>Perfect for solo developers and teams</li>
                        </ul>
                    </div>

                    {/* Installation */}
                    <div className="space-y-4">
                        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">Installation</h2>

                        <p className="text-gray-400 text-sm sm:text-base">Global installation (via npm):</p>
                        <PreCode>
{`npm install -g infy-react-cli`}
                        </PreCode>

                        <p className="text-gray-400 text-sm sm:text-base">Or via yarn:</p>
                        <PreCode>
{`yarn global add infy-react-cli`}
                        </PreCode>

                        <p className="text-gray-400 text-sm sm:text-base">Local installation (recommended for teams):</p>
                        <PreCode>
{`npm install infy-react-cli --save-dev
npx infy g component Button`}
                        </PreCode>

                        <p className="text-sm sm:text-base text-gray-400">
                            You can also install directly from npm:{" "}
                            <a
                                href="https://www.npmjs.com/package/infy-react-cli"
                                target="_blank"
                                rel="noreferrer noopener"
                                className="text-blue-400 hover:text-blue-500 underline"
                            >
                                npmjs.com/package/infy-react-cli
                            </a>
                        </p>
                    </div>

                    {/* Supported Generators */}
                    <div className="space-y-4">
                        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">Supported Generators</h2>

                        {/* Make table horizontally scrollable */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-gray-400 border border-gray-700 rounded-md text-sm sm:text-base">
                                <thead>
                                <tr className="border-b border-gray-700">
                                    <th className="px-3 py-2">Type</th>
                                    <th className="px-3 py-2">Example Command</th>
                                    <th className="px-3 py-2">Output Path</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr className="border-b border-gray-700">
                                    <td className="px-3 py-2">component</td>
                                    <td className="px-3 py-2">infy g component Card</td>
                                    <td className="px-3 py-2">src/components/Card.jsx</td>
                                </tr>
                                <tr className="border-b border-gray-700">
                                    <td className="px-3 py-2">hook</td>
                                    <td className="px-3 py-2">infy g hook useCounter</td>
                                    <td className="px-3 py-2">src/hooks/useCounter.js</td>
                                </tr>
                                <tr className="border-b border-gray-700">
                                    <td className="px-3 py-2">page</td>
                                    <td className="px-3 py-2">infy g page Home</td>
                                    <td className="px-3 py-2">src/pages/Home.jsx</td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">provider</td>
                                    <td className="px-3 py-2">infy g provider AppProvider</td>
                                    <td className="px-3 py-2">src/provider/AppProvider.jsx</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Closing */}
                    <div className="space-y-2">
                        <p className="text-gray-400 text-sm sm:text-base">
                            Say goodbye to repetitive tasks and hello to faster React development with <strong>Infy React CLI</strong>!
                        </p>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default InfyHowToUse
