import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";
import AppRouter from "@/routes.tsx";

const App = () => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 3,
            easing: (t) => t,
            smooth: true,
            direction: "vertical",
            gestureDirection: "vertical",
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

    return <AppRouter />;
};

export default App;
