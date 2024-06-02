import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";

/* eslint-disable @typescript-eslint/no-explicit-any */
const TotalViewAnalysis = ({ data }: any) => {
  return (
    <div className="grid grid-cols-3 gap-10 border border-solid rounded-xl border-[#E9EAEC] p-6">
      {data.map((item: any, index: number) => {
        return (
          <div
            className={`space-y-3 border-[#E9EAEC] border-solid border-0 ${
              (index == 0 && "border-r") || (index == 1 && "border-r")
            }`}
          >
            <p className="text-[#111827] font-semibold capitalize text-base">
              {item.title}
            </p>
            <h3 className="text-[#111827] font-bold text-4xl">{item.value}</h3>
            {item.state === "increase" ? (
              <div className="flex items-center gap-2">
                <span className="text-[#27A376]">
                  <FaArrowUpLong className="size-3" />
                  {item.state_value}
                </span>
                <p className="font-medium text-xs text-[#687588]">
                  Increase vs last month
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-[#E03137]">
                  <FaArrowDownLong className="size-3" />
                  {item.state_value}
                </span>
                <p className="font-medium text-xs text-[#687588]">
                  Increase vs last month
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TotalViewAnalysis;
