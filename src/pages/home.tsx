
import { LightRaysBackground } from "@/components/bg/light-rays";
import Noise from "@/components/bg/noise";
import GradualBlurMemo from "@/components/gradual-blur";
import LogoLoop from "@/components/loop-icon";
import { TopBar } from "@/components/navigation/top-bar";
import { BlogSection } from "@/sections/blog";
import { HeroSection } from "@/sections/hero";
import { ProjectSection } from "@/sections/project";
import { Fragment} from "react";

const HomePage = () => {
    const imageLogos = [
        { src: "/assets/laravel.svg", alt: "Company 1" },
        { src: "/assets/react.svg", alt: "Company 2" },
        { src: "/assets/dotnet.svg", alt: "Company 3" },
        { src: "/assets/git.svg", alt: "Company 3" },
        { src: "/assets/nextjs.svg", alt: "Company 3" },
        { src: "/assets/node.svg", alt: "Company 3" },
        { src: "/assets/typescript.svg", alt: "Company 3" },
        { src: "/assets/vite.svg", alt: "Company 3" },
        { src: "/assets/express.svg", alt: "Company 3" },
        { src: "/assets/py.svg", alt: "Company 3" },
        { src: "/assets/redux.svg", alt: "Company 3" },
        { src: "/assets/tailwind.svg", alt: "Company 3" },
    ];
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
