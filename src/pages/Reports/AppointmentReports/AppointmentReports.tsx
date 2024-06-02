import BarAnalytics from "../../../components/common/BarAnalytics";
import PieAnalytics from "../../../components/common/PieAnalytics";
import TotalViewAnalysis from "../../../components/common/TotalViewAnalysis";

const AppointmentReports = () => {
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
  const trainerData = [
    {
      type: "hasan",
      value: 45,
    },
    {
      type: "kavindu",
      value: 25,
    },
    {
      type: "duvindu",
      value: 10,
    },
    {
      type: "pemil",
      value: 15,
    },
    {
      type: "fahim",
      value: 5,
    },
  ];
  const totalViewData = [
    {
      title: "Total Appointments Booked",
      value: 120,
      state: "increase",
      state_value: "15%",
    },
    {
      title: "Total Attendees",
      value: 250,
      state: "decrease",
      state_value: "10%",
    },
    {
      title: "Revenue from Appointments",
      value: 3500,
      state: "increase",
      state_value: "20%",
    },
  ];
  return (
    <div className="space-y-8">
      <h2 className="text-[#111827] font-bold text-3xl">Appointment Report</h2>
      <div className="space-y-5">
        <TotalViewAnalysis data={totalViewData} />
        <BarAnalytics />
        <div className="grid grid-cols-2 gap-5">
          <PieAnalytics data={trainerData} text="Top Trainers" />
          <PieAnalytics data={sportsData} text="Top Sports" />
          <PieAnalytics data={ageData} text="Users by Age" />
          <PieAnalytics data={genderData} text="Users Gender" />
        </div>
      </div>
    </div>
  );
};

export default AppointmentReports;
