import Noise from "@/components/bg/noise";
import CountUp from "@/components/count";

export const CountLoader = ({slideUp}: any) => {

    return (
        <div
            className={`
                        fixed inset-0 flex flex-col items-center justify-center gradient-2 text-white z-9999 gradient-3
                        transition-all duration-500
                        ${slideUp ? "-translate-y-full" : "translate-y-0"}
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
                        <CountUp to={100} from={0} duration={1.5} startWhen={true} />%
                    </span>
        </div>
    )
}