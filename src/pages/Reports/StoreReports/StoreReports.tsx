import BarAnalytics from "../../../components/common/BarAnalytics";
import PieAnalytics from "../../../components/common/PieAnalytics";
import TotalViewAnalysis from "../../../components/common/TotalViewAnalysis";

const StoreReports = () => {
  const revenueData = [
    {
      type: "Cricket Equipment",
      value: 55,
    },
    {
      type: "Soccer Gear",
      value: 15,
    },
    {
      type: "Baseball Accessories",
      value: 15,
    },
    {
      type: "Apparel",
      value: 15,
    },
  ];
  const ageData = [
    {
      type: "11-20",
      value: 50,
    },
    {
      type: "21-30",
      value: 15,
    },
    {
      type: "31-40",
      value: 15,
    },
    {
      type: "41-50",
      value: 15,
    },
    {
      type: "50+",
      value: 5,
    },
  ];
  const genderData = [
    {
      type: "male",
      value: 65,
    },
    {
      type: "female",
      value: 35,
    },
  ];
  const sellingData = [
    {
      type: "Bats",
      value: 35,
    },
    {
      type: "Helmets",
      value: 25,
    },
    {
      type: "Bags",
      value: 15,
    },
    {
      type: "Bags",
      value: 15,
    },
    {
      type: "Wearables",
      value: 10,
    },
  ];
  const totalViewData = [
    {
      title: "Total Products Sold",
      value: 1320,
      state: "increase",
      state_value: "15%",
    },
    {
      title: "Renewed Memberships",
      value: 22,
      state: "decrease",
      state_value: "10%",
    },
    {
      title: "Revenue from Sales",
      value: 26400,
      state: "increase",
      state_value: "20%",
    },
  ];
  return (
    <div className="space-y-8">
      <h2 className="text-[#111827] font-bold text-3xl">Facility Report</h2>
      <div className="space-y-5">
        <TotalViewAnalysis data={totalViewData} />
        <BarAnalytics text="Daily Sales" />
        <div className="grid grid-cols-2 gap-5">
          <PieAnalytics data={revenueData} text="Revenue Distribution" />
          <PieAnalytics data={sellingData} text="Top Selling Products" />
          <PieAnalytics data={ageData} text="Users by Age" />
          <PieAnalytics data={genderData} text="Users Gender" />
        </div>
      </div>
    </div>
  );
};

export default StoreReports;
