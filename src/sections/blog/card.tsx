import { useEffect, useRef, useState } from "react";
import {BentoTilt} from "@/components/bento";

const BlogCard = ({
                      title = "Blog Post Title",
                      desc = "This is a short description of the blog post.",
                      link = "#",
                      img = "/blog/reactify.jpg",
                      readtime = "1m",
                  }: any) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const [gradientClass, setGradientClass] = useState("gradient-1");

    useEffect(() => {
        const gradients = ["gradient-1", "gradient-2", "gradient-3", "gradient-4"];
        const randomGradient =
            gradients[Math.floor(Math.random() * gradients.length)];
        setGradientClass(randomGradient);
    }, []);


    return (
            <BentoTilt  className="p-2.5 lg:p-0 blog-card" data-animated="false">
            <div
                className={`${gradientClass} overflow-hidden glass-balanced relative border-2 border-white/10 w-full md:w-72 h-[26rem] rounded-2xl p-5 cursor-pointer group flex flex-col justify-between transition-shadow duration-300`}

            >
                <div className="w-full h-40 rounded-xl overflow-hidden">
                    <img
                        ref={imgRef}
                        src={img}
                        alt="image"
                        className="group-hover:grayscale-0 grayscale object-cover group-hover:scale-110 transition-transform duration-500 w-full h-full"
                        crossOrigin="anonymous"
                    />

                </div>

                <div className="mt-4 flex-1 flex flex-col">
                    <h1 className="text-white/30 text-xl transition-colors group-hover:text-white">
                        {title}
                    </h1>
                    <p className="text-white/30 mt-2 text-sm transition-colors group-hover:text-white/70 flex-1 line-clamp-2">
                        {desc}
                    </p>
                    <div className="w-full p-1 mt-4 text-xs text-white/30">{readtime} read time</div>
                    <button
                        className={`
                        mt-3
                        relative p-3  cursor-pointer text-white/50 shadow-lg
                        transition-all duration-500  flex items-center justify-center gradient-4 glass-balanced overflow-hidden
                        !w-full !h-10 text-sm hover:text-white
                `}
                    onClick={() => window.open(link, "_blank")}
                    >
                        Learn More
                    </button>
                </div>
            </div>

        </BentoTilt>
    );
};

export default BlogCard;
