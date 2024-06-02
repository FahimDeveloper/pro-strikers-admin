/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, InputNumber, Select } from "antd";
import { useEffect } from "react";

const FacilityForm = ({ record, form }: any) => {
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        facility_name: record?.facility_name,
        facility: record?.facility,
        sport: record?.sport,
        lane: record?.lane,
        trainer: record?.trainer,
        facility_duration: record?.facility_duration,
        description: record?.description,
        price: record?.price,
      });
    }
  }, [record, form]);
  return (
    <>
      <Form form={form} layout="vertical" className="space-y-4">
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
                  label: "Field Hockey",
                  value: "field hockey",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Please select Facility" }]}
            name="facility"
            className="w-full m-0"
            label="Facility"
          >
            <Select
              placeholder="Select facility"
              options={[
                {
                  label: "Cricket Cage",
                  value: "cricket cage",
                },
                {
                  label: "Soccer Cage",
                  value: "soccer cage",
                },
                {
                  label: "Baseball Cage",
                  value: "baseball cage",
                },
                {
                  label: "Softball Cage",
                  value: "softball cage",
                },
                {
                  label: "Hockey Cage",
                  value: "hockey cage",
                },
              ]}
            />
          </Form.Item>
        </div>
        <div className="grid grid-cols-3 gap-x-5">
          <Form.Item
            name="lane"
            className="w-full m-0"
            label="Lane"
            rules={[{ required: true, message: "Please select Lane" }]}
          >
            <Select
              placeholder="Select lane"
              options={[
                {
                  label: "Lane 1",
                  value: "lane 1",
                },
                {
                  label: "Lane 2",
                  value: "lane 2",
                },
                {
                  label: "Lane 3",
                  value: "lane 3",
                },
                {
                  label: "Lane 4",
                  value: "lane 4",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="facility_duration"
            className="w-full m-0"
            label="Facility Duratoin"
            rules={[{ required: true, message: "Please select Duration" }]}
          >
            <Select
              placeholder="Select Appointment"
              options={[
                {
                  label: "30 minutes",
                  value: 30,
                },
                {
                  label: "60 minutes",
                  value: 60,
                },
              ]}
            />
          </Form.Item>
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
          label="Facility Fee"
        >
          <InputNumber className="w-48" placeholder="Enter class price" />
        </Form.Item>
      </Form>
    </>
  );
};

export default FacilityForm;
