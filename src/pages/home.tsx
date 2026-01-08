import { Fragment, useEffect, useState } from "react";
import { LightRaysBackground } from "@/components/bg/light-rays";
import Noise from "@/components/bg/noise";
import LogoLoop from "@/components/loop-icon";
import { TopBar } from "@/components/navigation/top-bar";
import { BlogSection } from "@/sections/blog";
import { HeroSection } from "@/sections/hero";
import { ProjectSection } from "@/sections/project";
import CountUp from "@/components/count";
import ContactComponent from "@/components/contact-component";
const HomePage = () => {
    const [loading, setLoading] = useState(true);
    const [slideUp, setSlideUp] = useState(false);
    const [showContactTip, setShowContactTip] = useState(false); // NEW

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
        { src: "/assets/angular.svg", alt: "angular icon" },
        { src: "/assets/nestjs.svg", alt: "nestjs icon" },
    ];

    // Loading screen
    useEffect(() => {
        const duration = 1500;

        const timeout = setTimeout(() => {
            setSlideUp(true);

            const removeTimeout = setTimeout(() => setLoading(false), 500);
            return () => clearTimeout(removeTimeout);
        }, duration);

        return () => clearTimeout(timeout);
    }, []);

    // Show contact tip at bottom
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight;
            const pageHeight = document.documentElement.scrollHeight;

            if (scrollPosition >= pageHeight - 400) { // 50px from bottom
                setShowContactTip(true);
            } else {
                setShowContactTip(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <Fragment>
            {loading && (
                <div
                    className={`
                        fixed inset-0 flex flex-col items-center justify-center gradient-2 text-white z-9999 gradient-3
                        transition-all duration-500
                        ${slideUp ? "-translate-y-full" : "translate-y-0"}
                    `}
                >
                    <Noise
                        patternSize={250}
                        patternScaleX={1}
                        patternScaleY={1}
                        patternRefreshInterval={2}
                        patternAlpha={15}
                    />
                    <span className="text-3xl font-bold mb-4">
                        <CountUp to={100} from={0} duration={1.5} startWhen={true} />%
                    </span>
                </div>
            )}

            {/* Backgrounds */}
            <LightRaysBackground />
            <TopBar />

            <HeroSection />

            <div
                className="relative w-[90%] md:max-w-5xl m-auto mb-24 -translate-y-20 overflow-hidden"
                style={{
                    maskImage:
                        "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
                    WebkitMaskImage:
                        "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
                }}
            >

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
                    className="cursor-pointer "
                />
            </div>

            <ProjectSection />
            <BlogSection />

            {/* Contact pop tip */}
            {showContactTip && (
                <ContactComponent />
            )}

        </Fragment>
    );
};

export { HomePage };
