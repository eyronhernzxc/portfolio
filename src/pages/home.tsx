
import { LightRaysBackground } from "@/components/bg/light-rays";
import Noise from "@/components/bg/noise";
import GradualBlurMemo from "@/components/gradual-blur";
import LogoLoop from "@/components/loop-icon";
import { TopBar } from "@/components/navigation/top-bar";
import { BlogSection } from "@/sections/blog";
import { HeroSection } from "@/sections/hero";
import { ProjectSection } from "@/sections/project";
import { Fragment} from "react";
import ScrollToTop from "@/components/scroll-to-top";

const HomePage = () => {
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
    ]
    return (
        <Fragment>
            <div
                style={{
                    width: "100%",
                    height: "100vh",
                    position: "fixed",
                    overflow: "hidden",
                }}>
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
            <HeroSection />
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
        </Fragment>
    );
};

export { HomePage };
