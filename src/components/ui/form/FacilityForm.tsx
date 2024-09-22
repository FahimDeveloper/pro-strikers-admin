/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, InputNumber, Select } from "antd";
import { useEffect } from "react";
import { useLaneTitleQuery } from "../../../redux/features/Lane/laneApi";

const FacilityForm = ({ record, form }: any) => {
  const { data: laneData } = useLaneTitleQuery(undefined);
  const laneOptions = laneData?.results?.map((lane: any) => {
    return {
      label: lane.lane_title,
      value: lane.lane_title,
    };
  });
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        facility_name: record?.facility_name,
        facility: record?.facility,
        sport: record?.sport,
        lane: record?.lane,
        duration: record?.duration,
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
        <div className="grid grid-cols-2 gap-x-5">
          <Form.Item
            name="lane"
            className="w-full m-0"
            label="Lane"
            rules={[{ required: true, message: "Please select Lane" }]}
          >
            <Select
              mode="multiple"
              placeholder="Select lane"
              options={laneOptions}
            />
          </Form.Item>
          <Form.Item
            name="duration"
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
          <InputNumber
            min={0}
            className="w-48"
            placeholder="Enter class price"
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default FacilityForm;
