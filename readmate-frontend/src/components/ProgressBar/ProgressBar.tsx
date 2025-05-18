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
      <div className="flex flex-row items-center">
        <div
          className="font-normal text-[20px] text-[#A449FF] 
        "
        >
          {text}
        </div>
        <div className=" group ml-3" tabIndex={0}>
          <div className="w-[16px] h-[16px] bg-gray-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold ">
            i
          </div>

          <div
            className="absolute self-center top-1 z-10 bottom-full left-1/2 -translate-x-1/2 mb-2 
                  bg-black text-white text-xs px-2 py-1 rounded-md shadow-md 
                  whitespace-nowrap opacity-0 pointer-events-none 
                  group-hover:opacity-100 group-focus:opacity-100 
                  group-hover:pointer-events-auto group-focus:pointer-events-auto 
                  transition duration-200"
          >
            Books without end date - currently reading - are not counted in.
          </div>
        </div>
      </div>
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
              fillPercentage > 100
                ? 100
                : fillPercentage < 10
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
        {/* 🎉 Congrats! – tylko jeśli > 100 */}
        {fillPercentage >= 100 && (
          <span className="absolute inset-0 flex items-center justify-center text-white z-10 font-extrabold text-sm pointer-events-none">
            Congrats!
          </span>
        )}
      </div>
    </>
  );
};

export default ProgressBar;
