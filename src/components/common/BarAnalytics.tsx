/* eslint-disable @typescript-eslint/no-explicit-any */
import { Column } from "@ant-design/charts";
import { DatePicker } from "antd";

const BarAnalytics = ({ text }: any) => {
  const data = [
    { type: "1", value: 34 },
    { type: "2", value: 21 },
    { type: "3", value: 42 },
    { type: "4", value: 15 },
    { type: "5", value: 28 },
    { type: "6", value: 37 },
    { type: "7", value: 49 },
    { type: "8", value: 11 },
    { type: "9", value: 46 },
    { type: "10", value: 20 },
    { type: "11", value: 31 },
    { type: "12", value: 39 },
    { type: "13", value: 18 },
    { type: "14", value: 25 },
    { type: "15", value: 36 },
    { type: "16", value: 45 },
    { type: "17", value: 19 },
    { type: "18", value: 29 },
    { type: "19", value: 47 },
    { type: "20", value: 16 },
    { type: "21", value: 30 },
    { type: "22", value: 40 },
    { type: "23", value: 23 },
    { type: "24", value: 38 },
    { type: "25", value: 43 },
    { type: "26", value: 33 },
    { type: "27", value: 26 },
    { type: "28", value: 48 },
    { type: "29", value: 14 },
    { type: "30", value: 22 },
  ];
  const config = {
    data,
    color: "#0ABAC3",
    xField: "type",
    yField: "value",
    columnStyle: {
      radius: [4, 4, 0, 0],
    },
    label: {
      position: "middle" as const,
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "type",
      },
      sales: {
        alias: "value",
      },
    },
  };
  return (
    <div className="border border-solid border-[#E9EAEC] p-6 rounded-xl min-h-96 space-y-5">
      <div className="flex justify-between items-center">
        <h2 className="text-[#111827] font-bold text-xl">
          {text ? text : "Daily Booking Frequency"}
        </h2>
        <DatePicker picker="month" />
      </div>
      <div>
        <Column {...config} />
      </div>
    </div>
  );
};

export default BarAnalytics;
