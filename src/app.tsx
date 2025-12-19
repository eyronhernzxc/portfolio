import Lenis from "lenis";
import { useEffect } from "react";
import { HomePage } from "./pages/home";
import AppRouter from "./routes";
const App = () => {
    useEffect(() => {
        const lenis = new Lenis();
        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
    }, []);


    return (
        <>
            <AppRouter />
        </>
    );
};

export default App;
