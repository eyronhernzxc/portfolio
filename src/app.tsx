import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";
import AppRouter from "@/routes.tsx";
import Noise from "@/components/bg/noise";
const App = () => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 3,
            easing: (t) => t,
            lerp: 0.07,
            infinite: false,
        });

        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, []);

    return <>

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
                patternAlpha={15}
            />
        </div>
        <AppRouter />
    </>;
};

export default App;
