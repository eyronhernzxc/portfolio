import { Fragment, useEffect, useState } from "react";
import { LightRaysBackground } from "@/components/bg/light-rays";
import Noise from "@/components/bg/noise";
import GradualBlurMemo from "@/components/gradual-blur";
import LogoLoop from "@/components/loop-icon";
import { TopBar } from "@/components/navigation/top-bar";
import { BlogSection } from "@/sections/blog";
import { HeroSection } from "@/sections/hero";
import { ProjectSection } from "@/sections/project";
import ScrollToTop from "@/components/scroll-to-top";
import CountUp from "@/components/count";
import PageLoading from "@/components/page-loading";

const HomePage = () => {
    const [loading, setLoading] = useState(true);
    const [slideUp, setSlideUp] = useState(false);

    const imageLogos = [
        { src: "/assets/laravel.svg", alt: "laravel icon" },
        { src: "/assets/react.svg", alt: "react icon" },
        { src: "/assets/dotnet.svg", alt: "dotnet icon" },
        { src: "/assets/git.svg", alt: "git icon" },
        { src: "/assets/nextjs.svg", alt: "nextjs icon" },
        { src: "/assets/node.svg", alt: "node icon" },
        { src: "/assets/typescript.svg", alt: "typescript icon" },
        { src: "/assets/vite.svg", alt: "vite icon" },
        { src: "/assets/express.svg", alt: "express icon" },
        { src: "/assets/py.svg", alt: "python icon" },
        { src: "/assets/redux.svg", alt: "redux icon" },
        { src: "/assets/tailwind.svg", alt: "tailwind icon" },
    ];

    useEffect(() => {

        const duration = 1500;

        const timeout = setTimeout(() => {
            setSlideUp(true);

            const removeTimeout = setTimeout(() => setLoading(false), 500);
            return () => clearTimeout(removeTimeout);
        }, duration);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <Fragment>
            {loading && (
                <div
                    className={`
                        fixed inset-0 flex flex-col items-center justify-center gradient-2 text-white z-9999
                        transition-all duration-500
                        ${slideUp ? "-translate-y-full" : "translate-y-0"}
                    `}
                >
                    <Noise
                        patternSize={250}
                        patternScaleX={1}
                        patternScaleY={1}
                        patternRefreshInterval={2}
                        patternAlpha={10}
                    />
                    {/*<PageLoading />*/}
                    <span className="text-3xl font-bold mb-4">
                        <CountUp to={100} from={0} duration={1.5} startWhen={true} />%
                    </span>
                    {/*<span className="text-lg animate-pulse">Loading...</span>*/}
                </div>
            )}
            {/*{!loading && (*/}
            {/*    <>*/}
                    {/* Backgrounds */}
            <div
                style={{
                    width: "100%",
                    height: "100vh",
                    position: "fixed",
                    overflow: "hidden",
                }}
            >
                <Noise
                    patternSize={250}
                    patternScaleX={1}
                    patternScaleY={1}
                    patternRefreshInterval={2}
                    patternAlpha={10}
                />
            </div>
            <LightRaysBackground />
            <TopBar />
            <ScrollToTop />

            {/* Gradual Blur */}
            <div className="fixed bottom-0 w-full z-10 pointer-events-none">
                <GradualBlurMemo
                    target="parent"
                    position="bottom"
                    height="10rem"
                    strength={1}
                    divCount={3}
                    curve="bezier"
                    exponential
                    opacity={1}
                />
            </div>

            {/* Hero Section */}
            <HeroSection />

            {/* Logo Loop */}
            <div className="relative max-w-5xl m-auto mb-35 -translate-y-20">
                <LogoLoop
                    logos={imageLogos}
                    speed={50}
                    direction="left"
                    logoHeight={48}
                    gap={40}
                    hoverSpeed={0}
                    scaleOnHover
                    fadeOut={false}
                    fadeOutColor="rgba(11,42,58,0.6)"
                    ariaLabel="Tech Stack"
                    className="cursor-pointer"
                />
            </div>

            <ProjectSection />
            <BlogSection />
            {/*    </>*/}
            {/*)}*/}
        </Fragment>
    );
};

export { HomePage };
