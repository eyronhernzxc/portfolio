import { forwardRef } from "react";
import useBentoTilt from "./hooks";
import type { BentoTiltProps } from "./types";

export const BentoTilt = forwardRef<HTMLDivElement, BentoTiltProps>(
  ({ children, className = "", style }, ref) => {
    const { transformStyle, itemRef, handleMouseMove, handleMouseLeave } =
      useBentoTilt(ref);

    const bentoStyle = { transform: transformStyle, ...style };

    return (
      <div
        ref={itemRef}
        className={`transition-all ease-in-out ${className}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={bentoStyle}>
        {children}
      </div>
    );
  }
);

BentoTilt.displayName = "BentoTilt";