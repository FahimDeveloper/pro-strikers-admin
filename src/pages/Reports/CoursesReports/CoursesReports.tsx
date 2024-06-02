import PieAnalytics from "../../../components/common/PieAnalytics";
import TotalViewAnalysis from "../../../components/common/TotalViewAnalysis";

const CoursesReports = () => {
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
  const courseData = [
    {
      type: "summer cricket",
      value: 45,
    },
    {
      type: "winter baseball",
      value: 35,
    },
    {
      type: "fall crikcet",
      value: 25,
    },
  ];
  const completeData = [
    {
      type: "completed",
      value: 75,
    },
    {
      type: "do not completed",
      value: 25,
    },
  ];
  const totalViewData = [
    {
      title: "Total Courses Offered",
      value: 120,
      state: "increase",
      state_value: "15%",
    },
    {
      title: "Total Enrollments",
      value: 250,
      state: "decrease",
      state_value: "10%",
    },
    {
      title: "Revenue from Courses",
      value: 3500,
      state: "increase",
      state_value: "20%",
    },
  ];
  return (
    <div className="space-y-8">
      <h2 className="text-[#111827] font-bold text-3xl">Courses Report</h2>
      <div className="space-y-5">
        <TotalViewAnalysis data={totalViewData} />
        <div className="grid grid-cols-2 gap-5">
          <PieAnalytics data={courseData} text="Top Courses" />
          <PieAnalytics data={completeData} text="Course Completion Rates" />
          <PieAnalytics data={sportsData} text="Revenue Distribution" />
          <PieAnalytics data={sportsData} text="Top Sport" />
          <PieAnalytics data={ageData} text="Users by Age" />
          <PieAnalytics data={genderData} text="Users Gender" />
        </div>
      </div>
    </div>
  );
};

export default CoursesReports;
