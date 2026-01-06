import { useEffect, useState, useRef } from "react";

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [showLabel, setShowLabel] = useState(false);
    // @ts-ignore
    const labelTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const lastVisibleRef = useRef(false); // track last visibility

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
            const shouldShow = scrollTop > pageHeight / 3;

            setVisible(shouldShow);

            // Only show the label if button just appeared
            if (shouldShow && !lastVisibleRef.current) {
                setShowLabel(true);

                if (labelTimeoutRef.current) clearTimeout(labelTimeoutRef.current);
                labelTimeoutRef.current = setTimeout(() => {
                    setShowLabel(false);
                }, 2000);
            }

            // If button disappears, hide label and clear timer
            if (!shouldShow) {
                setShowLabel(false);
                if (labelTimeoutRef.current) {
                    clearTimeout(labelTimeoutRef.current);
                    labelTimeoutRef.current = null;
                }
            }

            lastVisibleRef.current = shouldShow; // update last state
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // initial check

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (labelTimeoutRef.current) clearTimeout(labelTimeoutRef.current);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const labelVisible = showLabel || hovered;

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center group">
            {/* Label */}
            <span
                className={`
                    mb-2 px-3 py-1 rounded-full bg-neutral-900 text-white text-sm
                    transition-all duration-300
                    ${labelVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}
                `}
            >
                Scroll to Top
            </span>

            {/* Scroll Button */}
            <button
                onClick={scrollToTop}
                aria-label="Scroll to top"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className={`
                    relative p-3 rounded-full bg-neutral-900 cursor-pointer text-white/50 shadow-lg
                    transition-all duration-300 
                    ${visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
                `}
            >
                {/* Arrow */}
                <svg
                    fill="#ffffff"
                    height="30px"
                    width="30px"
                    viewBox="0 0 511.996 511.996"
                    className="transition-all duration-300 ease-out opacity-50 hover:opacity-100"
                >
                    <g>
                        <path d="M389.826,121.758l-128-119.467c-3.285-3.055-8.363-3.055-11.648,0l-128,119.467c-1.724,1.613-2.714,3.874-2.714,6.238 v136.533c0,3.448,2.082,6.562,5.274,7.885c3.191,1.323,6.852,0.589,9.293-1.852l121.967-121.967l121.967,121.967 c1.638,1.63,3.823,2.5,6.033,2.5c1.101,0,2.21-0.213,3.268-0.648c3.192-1.323,5.265-4.437,5.265-7.885V127.996 C392.531,125.632,391.55,123.371,389.826,121.758z"></path>
                        <path d="M261.826,241.225c-3.285-3.055-8.363-3.055-11.648,0l-128,119.467c-1.724,1.613-2.714,3.874-2.714,6.238v136.533 c0,3.447,2.082,6.562,5.274,7.885c3.191,1.314,6.852,0.597,9.293-1.852l121.967-121.967l121.967,121.967 c1.638,1.63,3.823,2.5,6.033,2.5c1.101,0,2.21-0.213,3.268-0.648c3.192-1.323,5.265-4.437,5.265-7.885V366.929 c0-2.364-0.981-4.625-2.705-6.238L261.826,241.225z"></path>
                    </g>
                </svg>
            </button>
        </div>
    );
};

export default ScrollToTop;
