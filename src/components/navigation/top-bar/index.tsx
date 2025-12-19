import { useState, useEffect } from "react";
import { Icons } from "./icons";

const TopBar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY >= 200);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className="max-w-[950px] px-5 w-full h-14 fixed top-10 left-1/2 -translate-x-1/2 z-50">
            <nav
                className={`
                    size-full flex items-center gap-2 rounded-2xl px-5
                    transition-all duration-300
                    ${scrolled ? "backdrop-blur-md bg-neutral-900/90 border border-white/10" : "bg-transparent border border-transparent"}
                `}
            >
                <span className="uppercase font-black text-white/30 tracking-wider grow text-sm sm:text-base">
                    ivan martin
                </span>
                {Icons.map(({ icon: Icon }, index) => (
                    <button
                        key={index}
                        className="group cursor-pointer rounded-lg p-2.5 hover:bg-neutral-900 transition-colors"
                    >
                        <Icon
                            size={20}
                            className="text-white opacity-30 transition-opacity group-hover:opacity-100"
                        />
                    </button>
                ))}
            </nav>
        </header>
    );
};

export { TopBar };
