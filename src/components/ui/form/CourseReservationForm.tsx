/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, InputNumber, Select } from "antd";
import { useEffect } from "react";

type TProp = {
  record?: any;
  form: any;
  onFinish: any;
  loading: boolean;
};

const CourseReservationForm = ({ record, form, onFinish, loading }: TProp) => {
  useEffect(() => {
    form.setFieldsValue({
      player_name: record?.player_name,
      email: record?.email,
      phone: record?.phone,
      age: record?.age,
      state: record?.state,
      city: record?.city,
      sport: record?.sport,
      skill_level: record?.skill_level,
      street_address: record?.street_address,
      zip_code: record?.zip_code,
    });
  }, [record, form]);
  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <div className="grid grid-cols-2 gap-4">
        {!record && (
          <Form.Item
            label="Bootcamp Id"
            name="course"
            className="m-0 col-span-2"
            rules={[{ required: true }]}
          >
            <Input placeholder="Type here..." />
          </Form.Item>
        )}
        <Form.Item
          label="Player Name"
          name="player_name"
          className="m-0"
          rules={[{ required: true }]}
        >
          <Input placeholder="Type here.." />
        </Form.Item>
        <Form.Item
          label="Email"
          className="m-0"
          name="email"
          rules={[{ required: true }]}
        >
          <Input placeholder="Type here.." />
        </Form.Item>
        <Form.Item
          name="sport"
          className="m-0"
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
        <Form.Item
          rules={[{ required: true }]}
          name="skill_level"
          className="w-full m-0"
          label="Skill Level"
        >
          <Select
            placeholder="Select level"
            options={[
              {
                label: "Basic",
                value: "basic",
              },
              {
                label: "Intermediate",
                value: "intermediate",
              },
              {
                label: "Advanced",
                value: "advanced",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Phone"
          className="m-0"
          name="phone"
          rules={[{ required: true }]}
        >
          <Input placeholder="Type here.." />
        </Form.Item>
        <Form.Item
          label="Age"
          className="m-0"
          name="age"
          rules={[{ required: true }]}
        >
          <InputNumber
            placeholder="Type here.."
            className="w-full"
            min={0}
            max={99}
          />
        </Form.Item>
        <Form.Item
          label="Street Address"
          name="street_address"
          className="m-0"
          rules={[{ required: true }]}
        >
          <Input placeholder="Type here.." />
        </Form.Item>
        <Form.Item
          label="City"
          className="m-0"
          name="city"
          rules={[{ required: true }]}
        >
          <Input placeholder="Type here.." />
        </Form.Item>
        <Form.Item
          label="State/Province"
          name="state"
          className="m-0"
          rules={[{ required: true }]}
        >
          <Input placeholder="Type here.." />
        </Form.Item>
        <Form.Item
          label="Zip/Postal Code"
          name="zip_code"
          className="m-0"
          rules={[{ required: true }]}
        >
          <Input placeholder="Type here.." />
        </Form.Item>
      </div>
      <Form.Item className="flex mt-5 justify-end">
        <Button htmlType="submit" loading={loading} className="primary-btn">
          {record ? "Update" : "Create"} Reservation
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CourseReservationForm;
