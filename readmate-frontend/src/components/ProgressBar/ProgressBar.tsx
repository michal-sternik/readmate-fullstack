interface ProgressBarProps {
  text: string;
  countFrom: number;
  countUntil: number;
  progressBarFill: number;
}

const ProgressBar = ({
  text,
  countFrom,
  countUntil,
  progressBarFill,
}: ProgressBarProps) => {
  const fillPercentage = Math.max(
    5,
    (progressBarFill / (countUntil - countFrom)) * 100
  );

  return (
    <>
      <div className="font-normal text-[20px] text-[#A449FF] mb-2">{text}</div>
      <div className="relative bg-white/90 shadow-[0px_1px_14px_0px_rgba(0,0,0,0.3)] rounded-4xl h-10 w-full flex items-center overflow-hidden">
        {/* start number */}
        <span className="absolute z-1 left-[2%] font-extrabold text-white text-[25px]">
          {countFrom}
        </span>
        {/* fill percentage width */}
        <div
          className="absolute top-0 left-0 h-full rounded-4xl bg-gradient-to-l from-[#A449FF] to-[#FF7FFF] transition-all duration-1000 ease-[cubic-bezier(0.1,0.2,0.3,1.0)]"
          style={{ width: `${Math.max(10, fillPercentage)}%` }}
        ></div>

        {/* fill percentage number */}
        <div
          className={`absolute ${
            fillPercentage >= 25 && "translate-x-[-150%]"
          } font-extrabold ${
            fillPercentage < 25 ? "text-[#A449FF]" : "text-white"
          } lg:text-[25px]`}
          style={{
            left: `${
              fillPercentage < 10
                ? 12
                : fillPercentage < 25
                ? fillPercentage + 2
                : fillPercentage
            }%`,
          }}
        >
          {fillPercentage >= 5 ? progressBarFill : null}
        </div>

        {/* end number */}
        <span className="absolute right-[2%] font-extrabold text-[#A449FF] text-[25px]">
          {fillPercentage >= 94 ? null : countUntil}
        </span>
      </div>
    </>
  );
};

export default ProgressBar;
