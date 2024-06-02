import PieAnalytics from "../../components/common/PieAnalytics";
import TotalViewAnalysis from "../../components/common/TotalViewAnalysis";

const Dashboard = () => {
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
  const facilityData = [
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
      title: "Total bookings",
      value: 120,
      state: "increase",
      state_value: "15%",
    },
    {
      title: "Active Memberships",
      value: 250,
      state: "decrease",
      state_value: "10%",
    },
    {
      title: "Revenue Insights",
      value: 3500,
      state: "increase",
      state_value: "20%",
    },
  ];

  return (
    <div className="space-y-5">
      <TotalViewAnalysis data={totalViewData} />
      <div className="grid grid-cols-2 gap-5">
        <PieAnalytics data={sportsData} text="Top Sports" />
        <PieAnalytics data={facilityData} text="Facility Utilization" />
      </div>
    </div>
  );
};

export default Dashboard;
