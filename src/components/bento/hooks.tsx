import { useRef } from "react";
import type { MouseEvent } from "react";

const useBentoTilt = () => {
    const itemRef = useRef<HTMLDivElement>(null);
    let raf: number | null = null;

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!itemRef.current) return;
        if (raf) cancelAnimationFrame(raf);

        raf = requestAnimationFrame(() => {
            const { left, top, width, height } = itemRef.current!.getBoundingClientRect();
            const relativeX = (e.clientX - left) / width;
            const relativeY = (e.clientY - top) / height;

            const tiltX = (relativeY - 0.5) * 6; // tilt strength
            const tiltY = (relativeX - 0.5) * -6;

            itemRef.current!.style.transform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.03,1.03,1.03)`;
        });
    };

    const handleMouseLeave = () => {
        if (!itemRef.current) return;
        itemRef.current.style.transition = "transform 0.4s ease-out";
        itemRef.current.style.transform = `perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;

        setTimeout(() => {
            if (itemRef.current) itemRef.current.style.transition = ""; // reset transition
        }, 400);
    };

    const handleMouseEnter = () => {
        if (!itemRef.current) return;
        itemRef.current.style.transition = "transform 0.2s ease-out"; // optional subtle pop
    };

    return { itemRef, handleMouseMove, handleMouseLeave, handleMouseEnter };
};

export default useBentoTilt;
