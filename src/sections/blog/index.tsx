import { useEffect, useRef, useState } from "react";
import BlogCard from "./card";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";

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
    const [showAll, setShowAll] = useState(false);
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

    useGSAP(() => {
        if (!containerRef.current) return;

        const cards = containerRef.current.querySelectorAll(".blog-card");

        gsap.set(cards, { y: 150, opacity: 0, scale: 1 });

        const tl = gsap.to(cards, {
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
                toggleActions: "play reverse play reverse",
                markers: false,
            }
        });

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [displayedBlogs]);

    return (
        <div
            ref={containerRef}
            className="blog-section w-full flex flex-col items-center relative mb-24 px-4 -translate-y-20"
        >
            <p className="text-center text-sm text-white/50 uppercase tracking-widest">
                Code in Action
            </p>
            <p className="text-center text-3xl font-bold text-white/70">
                Tutorials & How-To’s
            </p>
            <div className="mt-14 max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 justify-items-center">
                {displayedBlogs
                    .slice()
                    .reverse() // bottom-to-top effect
                    .map((blog, index) => (
                        <div key={index} className="blog-card w-full">
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
