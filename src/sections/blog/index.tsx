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

            setDisplayCount(isMobile ? 3 : 4);
        };

        loadBlogs();
    }, [isMobile]);

    const displayedBlogs = blogs.slice(0, displayCount);

    const animateNewCards = () => {
        if (!containerRef.current) return;

        const cards = Array.from(
            containerRef.current.querySelectorAll<HTMLDivElement>(
                ".blog-card[data-animated='false']"
            )
        );

        if (!cards.length) return;

        gsap.fromTo(
            cards,
            { y: 120, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                stagger: 0.15,
                onComplete: () => {
                    cards.forEach(card =>
                        card.setAttribute("data-animated", "true")
                    );
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

};

export { BlogSection };
