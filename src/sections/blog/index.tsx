import { useState, useEffect } from "react";
import BlogCard from "./card";

const BlogSection = () => {
    const [showAll, setShowAll] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile screen
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 640); // Tailwind sm breakpoint
        handleResize(); // set initially
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Example blogs
    const blogs: any[] = [
        { title: "Blog 1", desc: "Description 1", link: "#", img: "/blog/blog1.jpg" },
        { title: "Blog 2", desc: "Description 2", link: "#", img: "/blog/blog1.jpg" },
        { title: "Blog 3", desc: "Description 3", link: "#", img: "/blog/blog1.jpg" },
        { title: "Blog 4", desc: "Description 4", link: "#", img: "/blog/blog1.jpg" },
        { title: "Blog 5", desc: "Description 5", link: "#", img: "/blog/blog1.jpg" },
        { title: "Blog 6", desc: "Description 6", link: "#", img: "/blog/blog1.jpg" },
        { title: "Blog 7", desc: "Description 7", link: "#", img: "/blog/blog1.jpg" },
        { title: "Blog 8", desc: "Description 8", link: "#", img: "/blog/blog1.jpg" },
        { title: "Blog 9", desc: "Description 9", link: "#", img: "/blog/blog1.jpg" },
    ];

    // Determine initial limit based on device
    const initialLimit = isMobile ? 3 : 8;
    const displayedBlogs = showAll ? blogs : blogs.slice(0, initialLimit);

    return (
        <div className="w-full flex flex-col items-center relative mb-24 px-4 -translate-y-20">
            <div className="max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 justify-items-center">
                {displayedBlogs.map((blog, index) => (
                    <BlogCard
                        key={index}
                        title={blog.title}
                        desc={blog.desc}
                        link={blog.link}
                        img={blog.img}
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
