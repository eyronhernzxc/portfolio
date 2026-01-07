const ContactComponent = () => {
    return (
        <div className="w-[90%] translate-x-1/2 right-1/2 md:w-[270px] space-y-3 fixed md:translate-x-0 bottom-8 md:right-8 z-50 gradient-4 border border-white/10 p-4 shadow-lg shadow-neutral-900 rounded-xl">
            <div className="flex gap-3">
                <p className="text-xs text-white/50">Get in touch</p>
            </div>

            <div className="flex gap-x-2">
                <img src="/assets/me.jpg" alt="Ivan Macabontoc" className="w-10 h-10 rounded-full object-cover" />
                <div>
                    <p className="text-sm text-white/70">Ivan Martin</p>
                    <p className="text-xs text-white/50">Software Developer</p>
                </div>
            </div>

            <div className="w-full">
                <a
                    href="mailto:ivanallen64@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
        text-xs text-white/70
        w-full
        flex items-center justify-center
        py-2
        rounded-lg
        border border-white/10
        bg-white/5
        backdrop-blur
        transition
        duration-300
        filter grayscale
        hover:grayscale-0
        hover:bg-white/10
        focus:scale-[.98]
      "
                >
                    Send me an email
                </a>
            </div>
        </div>
    )
}
export default ContactComponent