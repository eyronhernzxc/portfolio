import { forwardRef,  } from "react";
import type { BentoTiltProps } from "./types";
import useBentoTilt from "@/components/bento/hooks.tsx";

export const BentoTilt = forwardRef<HTMLDivElement, BentoTiltProps>(
    ({ children, className = "", style }, ref) => {
        const { itemRef, handleMouseMove, handleMouseLeave, handleMouseEnter } =
            useBentoTilt();

        return (
            <div
                ref={itemRef}
                className={`transition-transform ease-out ${className}`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={handleMouseEnter}
                style={style}
            >
                {children}
            </div>
        );
    }
);

BentoTilt.displayName = "BentoTilt";
