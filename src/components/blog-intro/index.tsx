
const BlogIntro = ({data}: any) => {
    return(<div className="space-y-3 sm:space-y-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-200">{data.title}</h1>
        <p className="text-gray-400 text-sm sm:text-base">{data.description}</p>
        <p className="text-gray-500 text-xs sm:text-sm">{data.readtime} read time</p>

        {/* NPM Link */}
        <div className="mt-2">
            <a
                href={data.source_code}
                target="_blank"
                rel="noreferrer noopener"
                className="text-blue-400 hover:text-blue-500 underline text-sm sm:text-base"
            >
                View source code
            </a>
        </div>

        <span className="mt-4 mb-6 sm:mb-10 block w-full h-px bg-white"></span>
    </div>)
}
export default BlogIntro