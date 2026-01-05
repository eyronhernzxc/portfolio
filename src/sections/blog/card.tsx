import { useEffect, useRef, useState } from "react";
import ColorThief from "colorthief";

const BlogCard = ({
                      title = "Blog Post Title",
                      desc = "This is a short description of the blog post.",
                      link = "#",
                      img = "/blog/reactify.jpg",
                      readtime = "1m",
                  }: any) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const [shadowColor, setShadowColor] = useState("rgba(0,0,0,0.5)");
    const [gradientClass, setGradientClass] = useState("gradient-1");
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const gradients = ["gradient-1", "gradient-2", "gradient-3", "gradient-4"];
        const randomGradient =
            gradients[Math.floor(Math.random() * gradients.length)];
        setGradientClass(randomGradient);
    }, []);

    useEffect(() => {
        const imgEl = imgRef.current;
        if (!imgEl) return;

        imgEl.onload = () => {
            const colorThief = new ColorThief();
            const result = colorThief.getColor(imgEl); // [r, g, b]
            setShadowColor(`rgba(${result[0]}, ${result[1]}, ${result[2]}, 0.5)`);
        };
    }, []);

    return (
        <div className="p-2.5 lg:p-0">
            <div
                className={`${gradientClass} relative border-2 border-white/10 w-full md:w-72 h-96 rounded-2xl p-5 cursor-pointer group flex flex-col justify-between transition-shadow duration-300`}
                onClick={() => window.open(link, "_blank")}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    boxShadow: isHovered ? `0 0 25px 10px ${shadowColor}` : undefined,
                }}
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
                    <p className="text-white/30 mt-2 text-sm transition-colors group-hover:text-white/70 flex-1">
                        {desc}
                    </p>

                    <div className="w-full p-1 mt-4 text-xs text-white/30">{readtime} read time</div>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
