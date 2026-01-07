import {LightRaysBackground} from "@/components/bg/light-rays";

const NotFound = () => {
    return (
        <main className="h-screen w-full flex flex-col items-center justify-center relative text-white ">
            <LightRaysBackground />

            <h1 className="text-6xl md:text-8xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-neutral-400 via-neutral-500 to-neutr-500 animate-pulse">
                404
            </h1>

            <p className="mt-6 text-xl md:text-2xl text-white/70 text-center max-w-md">
                Oops! The page you’re looking for seems to have wandered off into the void.
            </p>

            <p className="mt-2 text-sm text-white/40 italic">
                Maybe try heading back home?
            </p>
            <a
                href="/"
                className="z-50 mt-8 px-6 py-3  border border-white/20 rounded-full text-white/50 hover:bg-neutral-900/40 font-medium transition-all hover:text-white/70 "
            >
                Go Home
            </a>
        </main>

    )
}

export default NotFound