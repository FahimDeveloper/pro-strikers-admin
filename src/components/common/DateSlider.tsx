/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

const DateSlider = ({
  activeDate,
  setActiveDate,
}: {
  activeDate: Date;
  setActiveDate: any;
}) => {
  const getDayName = (date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  const getDates = () => {
    const dates = [];
    for (let i = -3; i <= 3; i++) {
      const date = new Date(activeDate);
      date.setDate(activeDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const handleSelect = (date: Date) => {
    setActiveDate(date);
  };

  const handleNext = () => {
    const newDate = new Date(activeDate);
    newDate.setDate(activeDate.getDate() + 1);
    setActiveDate(newDate);
  };

  const handlePrevious = () => {
    const newDate = new Date(activeDate);
    newDate.setDate(activeDate.getDate() - 1);
    setActiveDate(newDate);
  };
  return (
    <div className="flex justify-between w-full items-center gap-1">
      <IoMdArrowDropleft
        className="size-1/3 cursor-pointer text-[#323232]"
        onClick={handlePrevious}
      />
      {getDates().map((date, index) => {
        return (
          <div
            key={index}
            className={`text-center space-y-1 w-full py-2 px-4 cursor-pointer rounded transition-all ${
              date.toDateString() === activeDate.toDateString()
                ? "bg-primary text-[#EAFFFF]"
                : "bg-[#EAFFFF] text-primary hover:bg-primary hover:text-[#EAFFFF]"
            }`}
            onClick={() => handleSelect(date)}
          >
            <div className="text-sm font-medium">{getDayName(date)}</div>
            <div className="text-xl font-extrabold ">{date.getDate()}</div>
          </div>
        );
      })}
      <IoMdArrowDropright
        className="size-1/3 cursor-pointer text-[#323232]"
        onClick={handleNext}
      />
    </div>
  );
};

export default DateSlider;
