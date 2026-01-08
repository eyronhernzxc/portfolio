import { useEffect, useState, useRef } from "react";

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);
    const [showLabel, setShowLabel] = useState(false);
    // @ts-ignore
    const labelTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const lastVisibleRef = useRef(false);

    // Detect if device is touch (mobile)
    const isTouchDevice = typeof window !== "undefined" && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
            const shouldShow = scrollTop > pageHeight / 3;

            setVisible(shouldShow);

            // Only show label if button just appeared
            if (shouldShow && !lastVisibleRef.current) {
                setShowLabel(true);

                // Hide label after 2s on mobile or 2s on desktop if not hovered
                if (labelTimeoutRef.current) clearTimeout(labelTimeoutRef.current);
                labelTimeoutRef.current = setTimeout(() => {
                    setShowLabel(false);
                }, 2000);
            }

            // Hide label if button disappears
            if (!shouldShow) {
                setShowLabel(false);
                if (labelTimeoutRef.current) {
                    clearTimeout(labelTimeoutRef.current);
                    labelTimeoutRef.current = null;
                }
            }

            lastVisibleRef.current = shouldShow;
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

    const [hovered, setHovered] = useState(false);
    const labelVisible = showLabel || (!isTouchDevice && hovered);

    return (
        <div className="fixed bottom-8 right-4 z-40 flex flex-col items-center justify-end ">

        {/* Label */}
            <span
                className={`
                    mb-2 px-3 py-1 rounded-full glass-balanced gradient-1 text-white/50 text-xs
                    transition-all duration-300 overflow-hidden
                    ${labelVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}
                `}
            >
                Scroll to Top
            </span>

            {/* Scroll Button */}
            <button
                className={`
                        relative p-3 !rounded-full cursor-pointer text-white/50 shadow-lg
                        transition-all duration-300  flex items-center justify-center
                        !size-11 glass-balanced gradient-2 overflow-hidden
                        ${visible ? "pointer-events-auto" : "!opacity-0 pointer-events-none"}
                `}
                onClick={scrollToTop}
                aria-label="Scroll to top"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                    {/*<svg fill="#ffffff" height="15px" width="15px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.002 512.002" xmlSpace="preserve" className="transition-all duration-300 ease-out opacity-50 hover:opacity-100">*/}
                    {/*    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>*/}
                    {/*    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>*/}
                    {/*    <g id="SVGRepo_iconCarrier"><g><g>*/}
                    {/*        <path d="M509.501,249.969L262.034,2.502c-3.337-3.336-8.73-3.336-12.066,0L2.501,249.969c-1.604,1.596-2.5,3.772-2.5,6.033 v247.467c0,3.447,2.082,6.562,5.265,7.885c3.191,1.314,6.852,0.589,9.301-1.852l241.434-241.434l241.434,241.434 c1.63,1.63,3.814,2.5,6.033,2.5c1.101,0,2.21-0.213,3.268-0.648c3.191-1.323,5.265-4.437,5.265-7.885V256.002 C512.001,253.741,511.105,251.565,509.501,249.969z">*/}
                    {/*        </path>*/}
                    {/*    </g></g> </g>*/}
                    {/*</svg>*/}
                    {/* Arrow */}
                    <svg
                        fill="#ffffff"
                        height="20px"
                        width="20px"
                        viewBox="0 0 511.996 511.996"
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
