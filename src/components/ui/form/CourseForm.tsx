/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  TimePicker,
} from "antd";

const CourseForm = ({ record, onFinish }: any) => {
  return (
    <>
      <Form
        initialValues={{
          course_name: record?.course_name,
          sport: record?.sport,
          trainer: record?.trainer,
          capacity: record?.capacity,
          start_date: record?.start_date,
          end_date: record?.end_date,
          start_time: record?.start_time,
          end_time: record?.end_time,
          description: record?.description,
          price: record?.price,
        }}
        layout="vertical"
        className="space-y-4"
        onFinish={onFinish}
      >
        <div className="flex gap-x-5">
          <Form.Item
            name="facility_name"
            className="w-full m-0"
            label="Facility Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter facility name" />
          </Form.Item>
          <Form.Item
            name="sport"
            className="w-full m-0"
            label="Sport"
            rules={[{ required: true, message: "Please select Sport" }]}
          >
            <Select
              placeholder="Select sport"
              options={[
                {
                  label: "Cricket",
                  value: "cricket",
                },
                {
                  label: "Soccer",
                  value: "soccer",
                },
                {
                  label: "Baseball",
                  value: "baseball",
                },
                {
                  label: "Softball",
                  value: "softball",
                },
                {
                  label: "Hockey",
                  value: "hockey",
                },
              ]}
            />
          </Form.Item>
        </div>
        <div className="flex gap-x-5">
          <Form.Item
            rules={[{ required: true, message: "Please select Trainer" }]}
            name="trainer"
            className="w-full m-0"
            label="Trainer"
          >
            <Select
              placeholder="Select trainer"
              options={[
                {
                  label: "Kavindu",
                  value: "kavindu",
                },
                {
                  label: "Fahim",
                  value: "fahim",
                },
                {
                  label: "Hasan",
                  value: "hasan",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="capacity"
            className="w-full m-0"
            label="Course Capacity"
            rules={[{ required: true }]}
          >
            <InputNumber
              placeholder="Enter course capacity"
              className="w-full"
            />
          </Form.Item>
        </div>
        <div className="grid grid-cols-4 gap-5">
          <Form.Item
            name="start_date"
            className="m-0 w-full"
            label="Start Date"
            rules={[{ required: true }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item
            name="end_date"
            className="m-0 w-full"
            label="End Date"
            rules={[{ required: true }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item
            name="start_time"
            className="m-0 w-full"
            label="Start Time"
            rules={[{ required: true }]}
          >
            <TimePicker use12Hours format={"HH:mm A"} className="w-full" />
          </Form.Item>
          <Form.Item
            name="end_time"
            className="m-0 w-full"
            label="End Time"
            rules={[{ required: true }]}
          >
            <TimePicker use12Hours format={"HH:mm A"} className="w-full" />
          </Form.Item>
        </div>
        <Form.Item
          rules={[{ required: true }]}
          name="description"
          className="m-0"
          label="Description"
        >
          <Input.TextArea placeholder="Enter class description" rows={4} />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          name="price"
          className=" m-0"
          label="Course Fee"
        >
          <InputNumber className="w-48" placeholder="Enter class price" />
        </Form.Item>
        <div className="flex justify-end">
          <Form.Item className="m-0">
            <Button htmlType="submit" className="btn primary-btn">
              Create Course
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default CourseForm;
