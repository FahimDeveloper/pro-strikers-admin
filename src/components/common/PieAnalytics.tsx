import { Pie } from "@ant-design/charts";
import { DatePicker } from "antd";

/* eslint-disable @typescript-eslint/no-explicit-any */
const PieAnalytics = ({ data, text }: any) => {
  const colors = ["#0ABAC3", "#FE964A", "#8C62FF", "#ED4A7B", "#921473"];
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.5,
    color: colors,
    label: {
      type: "inner",
      offset: "-50%",
      content: "",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    legend: false as const,
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false as const,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: "",
      },
    },
  };
  return (
    <div className="border border-solid border-[#E9EAEC] p-6 rounded-xl 2xl:max-h-80 max-h-72">
      <div className="flex justify-between items-center">
        <h2 className="text-[#111827] font-bold text-xl">{text}</h2>
        <DatePicker picker="month" />
      </div>
      <div className="grid grid-cols-2 gap-5 items-center h-full">
        <div className="2xl:space-y-3 space-y-2">
          {data.map((item: any, index: number) => (
            <div key={index} className="flex justify-between items-center">
              <div key={item.type} className="flex items-center gap-5">
                <div
                  className="size-3 rounded-full"
                  style={{ backgroundColor: colors[index] }}
                />
                <p className="font-medium capitalize text-sm text-[#687588]">
                  {item.type}
                </p>
              </div>
              <p className="text-[#111827] font-bold text-base">
                {item.value}%
              </p>
            </div>
          ))}
        </div>
        <div className="2xl:max-w-[225px] max-w-[200px] h-full ml-auto">
          <Pie {...config} />
        </div>
      </div>
    </div>
  );
};

export default PieAnalytics;
