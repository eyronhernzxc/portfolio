
import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const useCardScale = (targetScale: any) => {
  const container = useRef(null);
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(cardRef.current, {
        scale: targetScale,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top center",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.fromTo(
        imageRef.current,
        { scale: 2 },
        {
          scale: 1,
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        }
      );
    }, container);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [targetScale]);

  return {imageRef, cardRef, container}
};

export default useCardScale;