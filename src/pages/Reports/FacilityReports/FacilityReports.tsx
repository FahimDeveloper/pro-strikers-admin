import BarAnalytics from "../../../components/common/BarAnalytics";
import PieAnalytics from "../../../components/common/PieAnalytics";
import TotalViewAnalysis from "../../../components/common/TotalViewAnalysis";

const FacilityReports = () => {
  const sportsData = [
    {
      type: "cricket",
      value: 50,
    },
    {
      type: "soccer",
      value: 15,
    },
    {
      type: "baseball",
      value: 15,
    },
    {
      type: "softball",
      value: 15,
    },
    {
      type: "feild Hockey",
      value: 5,
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
  const laneData = [
    {
      type: "lane 1",
      value: 45,
    },
    {
      type: "lane 2",
      value: 25,
    },
    {
      type: "lane 3",
      value: 15,
    },
    {
      type: "lane 4",
      value: 15,
    },
  ];
  const totalViewData = [
    {
      title: "Total Facility Bookings",
      value: 120,
      state: "increase",
      state_value: "15%",
    },
    {
      title: "Average Daily Bookings",
      value: 250,
      state: "decrease",
      state_value: "10%",
    },
    {
      title: "Revenue from Facility Rentalss",
      value: 3500,
      state: "increase",
      state_value: "20%",
    },
  ];
  return (
    <div className="space-y-8">
      <h2 className="text-[#111827] font-bold text-3xl">Facility Report</h2>
      <div className="space-y-5">
        <TotalViewAnalysis data={totalViewData} />
        <BarAnalytics />
        <div className="grid grid-cols-2 gap-5">
          <PieAnalytics data={sportsData} text="Revenue Distribution" />
          <PieAnalytics data={laneData} text="Lane Utilization" />
          <PieAnalytics data={ageData} text="Users by Age" />
          <PieAnalytics data={genderData} text="Users Gender" />
        </div>
      </div>
    </div>
  );
};

export default FacilityReports;
