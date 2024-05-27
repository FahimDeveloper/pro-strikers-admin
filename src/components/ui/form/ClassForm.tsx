/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, InputNumber, Select } from "antd";

const ClassForm = ({ record, form }: any) => {
  return (
    <>
      <Form
        initialValues={{
          class_name: record?.class_name,
          sport: record?.sport,
          description: record?.description,
          facility: record?.facility,
          trainer: record?.trainer,
          level: record?.level,
          capacity: record?.capacity,
          price: record?.price,
        }}
        form={form}
        layout="vertical"
        className="space-y-4"
      >
        <div className="flex gap-5">
          <Form.Item
            name="class_name"
            className="w-full m-0"
            label="Class Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter class name" />
          </Form.Item>
          <Form.Item
            name="sport"
            className="w-full m-0"
            label="Sport"
            rules={[{ required: true }]}
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
        <Form.Item
          rules={[{ required: true }]}
          name="description"
          className="m-0"
          label="Description"
        >
          <Input.TextArea placeholder="Enter class description" rows={4} />
        </Form.Item>
        <div className="grid grid-cols-2 gap-x-5 gap-y-4">
          <Form.Item
            rules={[{ required: true }]}
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
          <Form.Item
            rules={[{ required: true }]}
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
            rules={[{ required: true }]}
            name="level"
            className="w-full m-0"
            label="Level"
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
            rules={[{ required: true }]}
            name="capacity"
            className=" m-0"
            label="Capacity"
          >
            <InputNumber
              className="w-full"
              placeholder="Enter class capacity"
            />
          </Form.Item>
        </div>
        <Form.Item
          rules={[{ required: true }]}
          name="price"
          className=" m-0"
          label="Class Fee"
        >
          <InputNumber className="w-52" placeholder="Enter class price" />
        </Form.Item>
      </Form>
    </>
  );
};

export default ClassForm;
