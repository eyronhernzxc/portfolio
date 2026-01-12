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
import data from '@/data.ts'
import {CountLoader} from "@/components/count-loader";
const HomePage = () => {
    const [loading, setLoading] = useState(true);
    const [showContactTip, setShowContactTip] = useState(false); // NEW
    const [slideUp, setSlideUp] = useState(false);

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
            {/* PAGE LOADER */}
            {loading && <CountLoader slideUp={slideUp}/>}

            {/* BACKGROUND RAY */}
            <LightRaysBackground />

            {/* NAVBAR */}
            <TopBar />

            {/* SECTIONS */}
            <HeroSection />

            {/* ICON STACK */}
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
                    logos={data.tech_stack}
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

            {/* SECTION */}
            <ProjectSection />
            <BlogSection />
            <div className="h-20 w-full"/>

            {/* CONTACT POP */}
            {showContactTip && (
                <ContactComponent />
            )}

        </Fragment>
    );
};

export { HomePage };
