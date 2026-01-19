import data from "@/data.ts";
import {BentoTilt} from "@/components/bento";

const ExperienceSection = () => {
    return (
        <section className="w-full md:max-w-5xl mx-auto relative z-10 px-4 md:px-0 mb-40">
            {/* Section Title */}
            <p className="text-center text-sm text-accent uppercase tracking-widest">
                My Professional Journey
            </p>
            <p className="text-center text-3xl font-bold text-primary mt-2">
                Work Experience
            </p>

            {/* Experience Cards */}
            <div className="min-h-[50vh] w-full space-y-4 mt-14 flex flex-col">
                {data.experience.map((exp: any, index: number) => (
                    <BentoTilt
                        key={index}
                        className="glass-balanced w-full flex flex-col py-6 px-7 md:px-9 "
                    >
                        {/* Top Row: Logo + Company + Dates */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4 sm:gap-0">
                            <div className="flex items-center gap-3">
                                <img
                                    alt={exp.logoAlt}
                                    src={exp.logo}
                                    className="size-10 w-10 h-10 sm:w-12 sm:h-12 object-contain"
                                />
                                <div className="flex flex-col justify-around py-1 gap-0.5">
                                    <p className="text-primary text-sm">{exp.company}</p>
                                    <p className="text-secondary text-xs">{exp.position}</p>
                                </div>
                            </div>

                            <p className="text-secondary text-sm flex items-center leading-5 mt-2 sm:mt-0">
                                {exp.start}
                                <span className="inline-block my-auto h-px mx-3 bg-secondary w-3"></span>
                                {exp.end}
                            </p>
                        </div>

                        {/* Key Roles */}
                        <div className="mt-5 text-left">
                            <p className="text-accent text-xs font-semibold">Key Roles</p>
                            <p className="mt-2 text-primary text-sm">{exp.desc}</p>
                        </div>
                    </BentoTilt>
                ))}
            </div>
        </section>
    );
};

export default ExperienceSection;
