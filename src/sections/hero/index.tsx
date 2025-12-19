
const HeroSection = () => {
    return (
        <section className="h-[85vh] flex  justify-center">
            <div className="w-2xl m-auto">
                <p className="text-5xl px-5 md:px-0 text-center font-semibold ">
                    Software Developer
                </p>
                <span className={`block h-10 w-full `} />
                <p className="text-xl text-center text-white/30 px-5 md:px-0  mx-auto">
                    I specialize in building scalable, maintainable web
                    applications using modern frontend and backend technologies
                </p>
            </div>
        </section>
    );
};

export { HeroSection };
