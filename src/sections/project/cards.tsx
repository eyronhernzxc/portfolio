import { useEffect, useRef, useState } from "react";
import ColorThief from "colorthief";
import useCardScale from "./hooks";
import GlareHover from "@/components/glare-hover";

const Card = ({ title, description, src, url, i, color, targetScale }: any) => {
    const { imageRef, cardRef, container } = useCardScale(targetScale);

    const imgRef = useRef<HTMLImageElement>(null);
    const [shadowColor, setShadowColor] = useState("rgba(0,0,0,0.5)");
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const imgEl = imgRef.current;
        if (!imgEl) return;

        imgEl.onload = () => {
            try {
                const colorThief = new ColorThief();
                const [r, g, b] = colorThief.getColor(imgEl);
                setShadowColor(`rgba(${r}, ${g}, ${b}, 0.45)`);
            } catch (e) {
                console.warn("ColorThief failed:", e);
            }
        };
    }, []);

    return (
        <div
            ref={container}
            className="h-screen flex items-start justify-center sticky top-44"
        >


            <div
                ref={cardRef}
                className={`flex flex-col relative md:h-[500px] w-[1000px] p-[50px] origin-top border-2 border-white/10 rounded-3xl overflow-hidden ${color}`}
                style={{
                    top: `calc(-5vh + ${i * 40}px)`,
                    boxShadow: isHovered
                        ? `0 0 40px 5px ${shadowColor}`
                        : undefined,
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >

                <div className="flex h-full md:mt-[50px] gap-[50px] flex-col md:flex-row">
                    {/* Text Section */}
                    <div className="md:h-full w-full md:w-[40%] relative text-white">
                        <h2 className="m-0 text-xl md:text-4xl text-left tracking-wide">
                            {title}
                        </h2>

                        <span className="block h-5 w-full" />

                        <p className="text-base first-letter:text-3xl tracking-wide">
                            {description}
                        </p>

                        <a
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className="hidden md:block absolute bottom-0 left-0 transition-colors hover:bg-white/10 border-2 border-white/10 rounded-full py-3 px-6"
                        >
                            {url === "#" ? "See More" : "Live Preview"}
                        </a>
                    </div>

                    {/* Image Section */}
                    <div className="group relative w-full grow md:w-[60%] h-full rounded-3xl overflow-hidden bg-neutral-950 border-2 border-white/20">
                        <div className="w-full h-full" ref={imageRef}>
                            <img
                                ref={imgRef}
                                src={`/img/${src}`}
                                alt="image"
                                crossOrigin="anonymous"
                                className="
                                    w-full h-full object-cover
                                    grayscale
                                    transition-all duration-500 ease-out
                                    group-hover:grayscale-0
                                "
                            />
                            <GlareHover
                                className="!size-full !border-none !absolute top-0 left-0"
                                glareOpacity={0.3}
                                glareAngle={-30}
                                glareSize={300}
                                transitionDuration={800}
                                playOnce={false}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Card;
