import Noise from "@/components/bg/noise";
import CountUp from "@/components/count";

export const CountLoader = ({ slideUp }: any) => {
    return (
        <div
            className={`
        fixed inset-0 flex flex-col items-center justify-center
        gradient-2 gradient-3 text-white z-9999
        transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]
        ${slideUp
                ? "-translate-y-full curve-exit"
                : "translate-y-0 curve-enter"}
      `}
        >
            <Noise
                patternSize={250}
                patternScaleX={1}
                patternScaleY={1}
                patternRefreshInterval={2}
                patternAlpha={15}
            />

            <span className="text-3xl font-bold mb-4">
        <CountUp to={100} from={0} duration={1.5} startWhen />
        %
      </span>
        </div>
    );
};
