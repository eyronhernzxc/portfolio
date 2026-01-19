import data from '../../data.ts'
const HeroSection = () => {
    return (
        <section className="h-[85vh] min-h-[570px] flex justify-center relative z-10">
            <div className="w-2xl m-auto">
                <p className="text-5xl px-5 md:px-0 text-center text-primary font-semibold ">
                    {data.career_role}
                </p>
                <span className={`block h-10 w-full `} />
                <p className="text-xl text-center text-secondary px-5 md:px-0  mx-auto">
                    {data.career_desc}
                </p>
            </div>
        </section>
    );
};

export { HeroSection };
