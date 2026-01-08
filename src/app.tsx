import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";
import AppRouter from "@/routes.tsx";
import Noise from "@/components/bg/noise";
import SplashCursor from "@/components/splash";
import ScrollToTop from "@/components/scroll-to-top";
import GradualBlurMemo from "@/components/gradual-blur";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const App = () => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 2.2,
            lerp: 0.05,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
        });
    
        // THIS IS THE MISSING LINK
        lenis.on('scroll', ScrollTrigger.update);
    
        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
    
        // Optional but recommended: Tell GSAP to use Lenis for proxying
        // ScrollTrigger.scrollerProxy(document.body, { scrollTop: lenis.scroll });
    
        return () => {
            lenis.destroy();
            lenis.off('scroll', ScrollTrigger.update);
        };
    }, []);
    return <>

        <div
            style={{
                width: "100%",
                height: "100vh",
                position: "fixed",
                overflow: "hidden",
                zIndex: '999999',
                pointerEvents: "none",
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
        <div
            style={{
                width: "100%",
                height: "100vh",
                position: "fixed",
                overflow: "hidden",
            }}
        >

            <SplashCursor
                SIM_RESOLUTION={128}
                DYE_RESOLUTION={1440}
                DENSITY_DISSIPATION={3.5}
                VELOCITY_DISSIPATION={2}
                PRESSURE={0.1}
                CURL={17}
                SPLAT_RADIUS={0.2}
                SPLAT_FORCE={6000}
                COLOR_UPDATE_SPEED={10}
            />
        </div>
        <AppRouter />

        <ScrollToTop />
        <div className="fixed bottom-0 w-full z-20 pointer-events-none max-h-[20rem] h-[13vh] ">
            <GradualBlurMemo
                target="parent"
                position="bottom"
                height="100%"
                strength={2}
                divCount={5}
                curve="linear"
                exponential
                opacity={1}
            />
        </div>
    </>;
};

export default App;
