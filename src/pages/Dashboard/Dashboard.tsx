import { DatePicker, DatePickerProps, TimePicker, TimePickerProps } from "antd";

const Dashboard = () => {
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
    // DatePicker usually provides a valid dateString that moment can parse correctly
    console.log(date.format("YYYY-MM-DD")); // Use the appropriate format
  };

  const onTimeChange: TimePickerProps["onChange"] = (time, timeString) => {
    console.log(time, timeString);
    // Ensure the timeString is in a format that moment can parse correctly
    console.log(time.format("HH:mm A")); // Adjust the format if necessary
  };

  return (
    <div>
      <DatePicker onChange={onChange} />
      <TimePicker onChange={onTimeChange} format="HH:mm" />
    </div>
  );
};

export default Dashboard;
