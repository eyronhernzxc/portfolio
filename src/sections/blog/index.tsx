import { useEffect, useRef, useState } from "react";
import BlogCard from "./card";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
    const [displayCount, setDisplayCount] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Detect mobile
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 640);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Load blogs
    useEffect(() => {
        const loadBlogs = async () => {
            const blogList: BlogData[] = [];

            for (const path in blogModules) {
                const folderName = path.split("/").slice(-2, -1)[0];
                const importer = blogModules[path] as () => Promise<{ default: any }>;
                const module = await importer();
                const data = module.default;

                blogList.push({
                    title: data.title,
                    desc: data.description,
                    link: `/blogs/${folderName}`,
                    img: data.img,
                    readtime: data.readtime,
                });
            }

            blogList.sort((a, b) => a.title.localeCompare(b.title));
            setBlogs(blogList);

            setDisplayCount(isMobile ? 3 : 5);
        };

        loadBlogs();
    }, [isMobile]);

    const displayedBlogs = blogs.slice(0, displayCount);

    const animateNewCards = () => {
        if (!containerRef.current) return;

        // Select only visible cards that have not been animated yet
        const cards = Array.from(containerRef.current.querySelectorAll(".blog-card"))
            .slice(-3); // animate only the last 3 new cards

        gsap.fromTo(
            cards,
            { y: 150, opacity: 0, scale: 1 },
            {
                y: 0,
                opacity: 1,
                scale: 1.05,
                duration: 1.2,
                ease: "power3.out",
                stagger: 0.15,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none none",
                    markers: false,
                },
            }
        );
    };

    useEffect(() => {
        animateNewCards();
    }, [displayCount]); // triggers animation only when new blogs are added

    const handleSeeMore = () => {
        setDisplayCount((prev) => Math.min(prev + 3, blogs.length));
    };

    return (
        <div
            ref={containerRef}
            className="blog-section w-full flex flex-col items-center relative mb-40 px-4 -translate-y-20"
        >
            <p className="text-center text-sm text-white/50 uppercase tracking-widest">
                Guides & Tutorials
            </p>
            <p className="text-center text-3xl font-bold text-white/70">
                How to Build & Use My Projects
            </p>

            <div className="mt-14 max-w-5xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 md:gap-y-12 place-items-center px-6">
                {displayedBlogs
                    .slice()
                    .reverse()
                    .map((blog, index) => (
                        <div key={index} className="w-full md:w-72 max-w-sm blog-card">
                            <BlogCard
                                title={blog.title}
                                desc={blog.desc}
                                link={blog.link}
                                img={blog.img}
                                readtime={blog.readtime}
                            />
                        </div>
                    ))}
            </div>

            {displayCount < blogs.length && (
                <button
                    className="mt-8 px-6 py-3 bg-neutral-800 text-white rounded-lg transition hover:bg-neutral-700 cursor-pointer"
                    onClick={handleSeeMore}
                >
                    See More
                </button>
            )}
        </div>
    );
};

export { BlogSection };
