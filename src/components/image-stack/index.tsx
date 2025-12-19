import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { techStack } from "./data";

const IconStack = () => {
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    iconRefs.current.forEach((el) => {
      if (!el) return;

      gsap.to(el, {
        y: () => gsap.utils.random(-15, 100),
        x: () => gsap.utils.random(-15, 100),
        duration: gsap.utils.random(2, 5),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, []);

  return (
    <div className=" w-full h-screen max-h- fixed top-0 left-1/2 -translate-x-1/2 z-[-1] ">
      <div className="relative w-full h-full  ">
        {techStack.map((item: any, index: number) => {
          return (
            <div
              key={index}
              ref={(el) => {
                iconRefs.current[index] = el;
              }}
              className={`absolute flex items-center justify-center rounded-lg
                        z -20
                        cursor-pointer
                        ${item.pos}
                `}>
              <img
                src={`/assets/${item.src}`}
                alt="tech-stack"
                height={40}
                width={40}
                className={`object-contain
                        hover:scale-105
                        ${item.shadow}
                        transition duration-300
                    `}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default IconStack;