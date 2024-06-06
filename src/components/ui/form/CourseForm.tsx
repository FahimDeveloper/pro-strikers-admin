/* eslint-disable @typescript-eslint/no-explicit-any */
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  TimePicker,
} from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";

type TProp = {
  record?: any;
  onFinish: any;
  form: any;
  loading: boolean;
};

const CourseForm = ({ record, onFinish, form, loading }: TProp) => {
  dayjs.extend(weekday);
  dayjs.extend(localeData);
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        course_name: record?.course_name,
        sport: record?.sport,
        trainer: record?.trainer,
        capacity: record?.capacity,
        start_date: record?.start_date
          ? dayjs(record?.start_date, "DD/MM/YYYY")
          : "",
        end_date: record?.end_date ? dayjs(record?.end_date, "DD/MM/YYYY") : "",
        start_time: record?.start_time
          ? dayjs(record?.start_time, "HH:mm A")
          : "",
        end_time: record?.end_time ? dayjs(record?.end_time, "HH:mm A") : "",
        description: record?.description,
        price: record?.price,
      });
    }
  }, [record, form]);
  return (
    <>
      <Form
        form={form}
        layout="vertical"
        className="space-y-4"
        onFinish={onFinish}
      >
        <div className="flex gap-x-5">
          <Form.Item
            name="course_name"
            className="w-full m-0"
            label="Course Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter course name" />
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
                  label: "Field Hockey",
                  value: "field hockey",
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
              min={0}
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
            <DatePicker className="w-full" format={"DD/MM/YYYY"} />
          </Form.Item>
          <Form.Item
            name="end_date"
            className="m-0 w-full"
            label="End Date"
            rules={[{ required: true }]}
          >
            <DatePicker className="w-full" format={"DD/MM/YYYY"} />
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
          <InputNumber
            min={0}
            className="w-48"
            placeholder="Enter class price"
          />
        </Form.Item>
        <div className="flex justify-end">
          <Form.Item className="m-0">
            <Button
              htmlType="submit"
              loading={loading}
              className="btn primary-btn"
            >
              {record && Object.keys(record).length > 0
                ? "Update Course"
                : "Create Course"}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default CourseForm;
