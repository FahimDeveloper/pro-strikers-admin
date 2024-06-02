import BarAnalytics from "../../../components/common/BarAnalytics";
import PieAnalytics from "../../../components/common/PieAnalytics";
import TotalViewAnalysis from "../../../components/common/TotalViewAnalysis";

const MembershipReports = () => {
  const planData = [
    {
      type: "Individual Pro",
      value: 65,
    },
    {
      type: "Individual Pro Unlimited",
      value: 20,
    },
    {
      type: "Team & Organization",
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
  const billingData = [
    {
      type: "monthly",
      value: 75,
    },
    {
      type: "yearly",
      value: 25,
    },
  ];
  const totalViewData = [
    {
      title: "Total Classes Held",
      value: 44,
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
      title: "Revenue from Classes",
      value: 2400,
      state: "increase",
      state_value: "20%",
    },
  ];
  return (
    <div className="space-y-8">
      <h2 className="text-[#111827] font-bold text-3xl">Classes Report</h2>
      <div className="space-y-5">
        <TotalViewAnalysis data={totalViewData} />
        <BarAnalytics text="Daily Membership Purchased" />
        <div className="grid grid-cols-2 gap-5">
          <PieAnalytics data={planData} text="Plan Distribution" />
          <PieAnalytics data={billingData} text="Billing Distribution" />
          <PieAnalytics data={planData} text="Revenue Distribution" />
          <PieAnalytics data={planData} text="Plan Purchased" />
          <PieAnalytics data={ageData} text="Users by Age" />
          <PieAnalytics data={genderData} text="Users Gender" />
        </div>
      </div>
    </div>
  );
};

export default MembershipReports;
