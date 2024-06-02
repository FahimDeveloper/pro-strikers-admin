/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { IEvent } from "../../../types/event.types";

type TProp = {
  record?: IEvent;
  onFinish: any;
  form: any;
  loading: boolean;
};
const EventForm = ({ record, form, onFinish, loading }: TProp) => {
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        event_name: record?.event_name,
        event_type: record?.event_type,
        sport: record?.sport,
        start_date:
          record?.start_date && dayjs(record?.start_date, "DD/MM/YYYY"),
        end_date: record?.end_date && dayjs(record?.end_date, "DD/MM/YYYY"),
        location: record?.location,
        registration_start:
          record?.registration_start &&
          dayjs(record?.registration_start, "DD/MM/YYYY"),
        registration_end:
          record?.registration_end &&
          dayjs(record?.registration_end, "DD/MM/YYYY"),
        allowed_registrations: record?.allowed_registrations,
        description: record?.description,
        price: record?.price,
      });
    }
  }, [record, form]);
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="space-y-5 mt-5"
    >
      <div className="grid grid-cols-3 gap-4">
        <Form.Item
          name="event_name"
          className="m-0"
          label="Event Name"
          rules={[{ required: true }]}
        >
          <Input className="w-full" placeholder="Enter event name" />
        </Form.Item>
        <Form.Item
          name="event_type"
          className="m-0"
          label="Event Type"
          rules={[{ required: true, message: "Please select event type" }]}
        >
          <Select
            placeholder="Select type"
            options={[
              {
                label: "League",
                value: "league",
              },
              {
                label: "Tournament",
                value: "tournament",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="sport"
          className="w-full m-0"
          label="Event Sport"
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
        <Form.Item
          name="start_date"
          className="m-0"
          label="Start Date"
          rules={[{ required: true, message: "Please select date" }]}
        >
          <DatePicker className="w-full" format={"DD/MM/YYYY"} />
        </Form.Item>
        <Form.Item
          name="end_date"
          className="m-0"
          label="End Date"
          rules={[{ required: true, message: "Please select date" }]}
        >
          <DatePicker className="w-full" format={"DD/MM/YYYY"} />
        </Form.Item>
        <Form.Item
          name="location"
          className="m-0"
          label="Location"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter location" />
        </Form.Item>
        <Form.Item
          name="registration_start"
          className="m-0"
          label="Registration Open"
          rules={[{ required: true, message: "Please select date" }]}
        >
          <DatePicker className="w-full" format={"DD/MM/YYYY"} />
        </Form.Item>
        <Form.Item
          name="registration_end"
          className="m-0"
          label="Registration Close"
          rules={[{ required: true, message: "Please select date" }]}
        >
          <DatePicker className="w-full" format={"DD/MM/YYYY"} />
        </Form.Item>
        <Form.Item
          name="allowed_registrations"
          className="m-0"
          label="Total Registrations Allowed"
          rules={[{ required: true, message: "Enter allowed registration" }]}
        >
          <InputNumber
            className="w-full"
            placeholder="Enter allowed registration"
          />
        </Form.Item>
        <Form.Item
          name="description"
          className="w-full m-0 col-span-3"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input.TextArea placeholder="Enter description" rows={5} />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          name="price"
          className="m-0"
          label="Event Fee"
        >
          <InputNumber className="w-36" placeholder="Enter event fee" />
        </Form.Item>
      </div>
      <Form.Item className="flex justify-end m-0">
        <Button htmlType="submit" loading={loading} className="primary-btn">
          Create Event
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EventForm;
