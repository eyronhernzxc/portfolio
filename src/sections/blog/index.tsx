import { useState, useEffect } from "react";
import BlogCard from "./card";

// Grab all data.ts from blogs folders
const blogModules = import.meta.glob("../../pages/blogs/*/data.ts");

interface BlogData {
    title: string;
    desc: string;
    link: string;
    img: string;
    readtime: string;
}

const BlogSection = () => {
    const [blogs, setBlogs] = useState<BlogData[]>([]);
    const [showAll, setShowAll] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 640);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const loadBlogs = async () => {
            const blogList: BlogData[] = [];

            for (const path in blogModules) {
                const folderName = path.split("/").slice(-2, -1)[0]; // get folder name
                const importer = blogModules[path] as () => Promise<{ default: any }>;
                const module = await importer();
                const data = module.default;

                blogList.push({
                    title: data.title,
                    desc: data.description,
                    link: `/blogs/${folderName}`,
                    img: data.img,
                    readtime: data.readtime
                });
            }

            blogList.sort((a, b) => a.title.localeCompare(b.title));

            setBlogs(blogList);
        };

        loadBlogs();
    }, []);

    const initialLimit = isMobile ? 3 : 8;
    const displayedBlogs = showAll ? blogs : blogs.slice(0, initialLimit);

    return (
        <div className="w-full flex flex-col items-center relative mb-24 px-4 -translate-y-20">
            <p className="text-center text-sm text-white/50 uppercase tracking-widest">
                Code in Action
            </p>
            <p className="text-center text-3xl font-bold text-white/70">
                Tutorials & How-To’s
            </p>
            <div className="mt-14 max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 justify-items-center">
                {displayedBlogs.map((blog, index) => (
                    <BlogCard
                        key={index}
                        title={blog.title}
                        desc={blog.desc}
                        link={blog.link}
                        img={blog.img}
                        readtime={blog.readtime}
                    />
                ))}
            </div>

            {!showAll && blogs.length > initialLimit && (
                <button
                    className="mt-8 px-6 py-3 bg-neutral-800 text-white rounded-lg transition hover:bg-neutral-700 cursor-pointer"
                    onClick={() => setShowAll(true)}
                >
                    See More
                </button>
            )}
        </div>
    );
};

export { BlogSection };
