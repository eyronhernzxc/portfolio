import { useEffect, useRef, useState } from "react";
import ColorThief from "colorthief";

const BlogCard = ({
    title = "Blog Post Title",
    desc = "This is a short description of the blog post.",
    link = "#",
    img = "/blog/blog1.jpg",
}: any) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const [shadowColor, setShadowColor] = useState("rgba(0,0,0,0.5)");
    const [gradientClass, setGradientClass] = useState("gradient-1");

    // Pick a random gradient on mount
    useEffect(() => {
        const gradients = [
            "gradient-1",
            "gradient-2",
            "gradient-3",
            "gradient-4",
        ];
        const randomGradient =
            gradients[Math.floor(Math.random() * gradients.length)];
        setGradientClass(randomGradient);
    }, []);

    // Extract dominant color for shadow
    useEffect(() => {
        const imgEl = imgRef.current;
        if (!imgEl) return;

        imgEl.onload = () => {
            const colorThief = new ColorThief();
            const result = colorThief.getColor(imgEl); // [r, g, b]
            setShadowColor(
                `rgba(${result[0]}, ${result[1]}, ${result[2]}, 0.5)`
            );
        };
    }, []);

    return (
        <div className="p-2.5 lg:p-0">
            <div
                className={`${gradientClass} border-2 border-white/10 w-full md:w-72 h-96 rounded-2xl  p-5 cursor-pointer group`}
                onClick={() => window.open(link, "_blank")}>
                <div
                    className="w-full h-40 rounded-xl overflow-hidden"
                    style={{
                        boxShadow: `0 0 25px 10px ${shadowColor}`,
                    }}>
                    <img
                        ref={imgRef}
                        src={img}
                        alt="image"
                        className="group-hover:grayscale-0 grayscale object-cover group-hover:scale-110 transition-transform duration-500 w-full h-full"
                        crossOrigin="anonymous" // required for ColorThief
                    />
                </div>
                <h1 className="text-white/30 text-xl mt-4 transition-colors group-hover:text-white">
                    {title}
                </h1>
                <p className="text-white/30 mt-2 text-sm transition-colors group-hover:text-white/70">
                    {desc}
                </p>
            </div>
        </div>
    );
};

export default BlogCard;
