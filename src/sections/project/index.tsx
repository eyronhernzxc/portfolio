import { useRef } from "react";
import Card from "./cards";
import { projects } from "./data";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

export const ProjectSection = () => {

    return (
        <main className="max-w-7xl mx-auto">
            <p className="text-center text-sm text-white/50 uppercase tracking-widest">
                From Idea to Code
            </p>
            <p className="text-center text-3xl font-bold text-white/70">
                Real Projects & Builds
            </p>
            <div className="max-w-7xl mx-auto relative mt-24">
                {projects.map((project, i) => {
                    const targetScale = 1 - (projects.length - i) * 0.05;
                    return (
                        <Card
                            key={`p_${i}`}
                            {...project}
                            i={i}
                            targetScale={targetScale}
                        />
                    );
                })}
            </div>
        </main>
    );
};
