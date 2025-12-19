import { useImperativeHandle, useRef, useState } from "react";
import type { MouseEvent } from "react";
const useBentoTilt = (ref: any) => {
    const [transformStyle, setTransformStyle] = useState<string>("");
    const itemRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => itemRef.current!, []);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!itemRef.current) return;
        const { left, top, width, height } =
            itemRef.current.getBoundingClientRect();

        const relativeX = (e.clientX - left) / width;
        const relativeY = (e.clientY - top) / height;

        const tiltX = (relativeY - 0.8) * 3;
        const tiltY = (relativeX - 0.8) * -3;

        const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`;
        setTransformStyle(newTransform);
    };

    const handleMouseLeave = () => {
        setTransformStyle("rotateX(0deg) rotateY(0deg)");
    };

    return { transformStyle, itemRef, handleMouseMove, handleMouseLeave };
};

export default useBentoTilt;
