import useCardScale from "./hooks";

const Card = ({ title, description, src, url, i, color, targetScale }: any) => {
    const { imageRef, cardRef, container } = useCardScale(targetScale);
    return (
        <div
            ref={container}
            className={`h-screen flex items-start justify-center sticky top-44`}>
            <div
                ref={cardRef}
                className={`flex flex-col relative md:h-[500px] w-[1000px] p-[50px] origin-top border-2 border-white/10 rounded-3xl overflow-hidden ${color}`}
                style={{
                    top: `calc(-5vh + ${i * 40}px)`,
                }}>
                <div
                    className={`flex h-full md:mt-[50px] gap-[50px] flex-col md:flex-row`}>
                    <div
                        className={`md:h-full w-full md:w-[40%] relative text-white`}>
                        <h2
                            className={`m-0 text-xl md:text-4xl text-left tracking-wide`}>
                            {title}
                        </h2>
                        <span className={`block h-5 w-full `} />
                        <p className="text-base first-letter:text-3xl tracking-wide ">
                            {description}
                        </p>
                        <a
                            href={url}
                            target="_blank"
                            className=" hidden md:block absolute bottom-0 left-0 transition-colors hover:bg-white/10 border-2 border-white/10 rounded-full py-3 px-6">
                            {url == "#" ? "See More" : "Live Preview"}
                        </a>
                    </div>

                    <div className="group relative w-full grow md:w-[60%] h-full rounded-3xl overflow-hidden bg-neutral-950 border-2 border-white/20">
                        <div className="w-full h-full" ref={imageRef}>
                            <img
                                src={`/img/${src}`}
                                alt="image"
                                className="
                                    w-full h-full object-cover
                                    grayscale
                                    transition-all duration-500 ease-out
                                    group-hover:grayscale-0
                                "
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
