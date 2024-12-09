/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useTrainersQuery } from "../../../redux/features/admin/adminApi";
import { Form, Input, InputNumber, Select } from "antd";

const AppointmentGroupForm = ({ record, form }: any) => {
  const { data: trainerData } = useTrainersQuery(undefined);
  const trainerOptions = trainerData?.results?.map((trainer: any) => {
    return {
      label: `${trainer.first_name} ${trainer.last_name}`,
      value: trainer._id,
    };
  });
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        appointment_name: record?.appointment_name,
        sport: record?.sport,
        trainer: record?.trainer?._id,
        capacity: record?.capacity,
        description: record?.description,
        price: record?.price,
      });
    }
  }, [record, form]);
  return (
    <>
      <Form form={form} layout="vertical" className="space-y-4">
        <div className="grid grid-cols-2 gap-x-5 gap-y-4">
          <Form.Item
            name="appointment_name"
            className="w-full m-0"
            label="Appointment Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter appointment name" />
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
            rules={[{ required: true, message: "Please select Trainer" }]}
            name="trainer"
            className="w-full m-0"
            label="Trainer"
          >
            <Select placeholder="Select trainer" options={trainerOptions} />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Please enter capacity" }]}
            name="capacity"
            className="m-0"
            label="Capacity"
          >
            <InputNumber
              min={0}
              className="w-full"
              placeholder="Enter capacity"
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
          label="Appointment Fee"
        >
          <InputNumber
            prefix="$"
            min={0}
            className="w-48"
            placeholder="Enter class price"
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default AppointmentGroupForm;
