/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, InputNumber, Select } from "antd";
import { useEffect } from "react";
import { useTrainersQuery } from "../../../redux/features/admin/adminApi";

const AppointmentForm = ({ record, form }: any) => {
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
        appointment_type: record?.appointment_type,
        appointment_duration: record?.appointment_duration,
        sport: record?.sport,
        trainer: record?.trainer._id,
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
            name="appointment_name"
            className="w-full m-0"
            label="Appointment Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter appointment name" />
          </Form.Item>
          <Form.Item
            name="appointment_type"
            className="w-full m-0"
            label="Appointment Type"
            rules={[
              { required: true, message: "Please select Appointment Type" },
            ]}
          >
            <Select
              placeholder="Select Appointment"
              options={[
                {
                  label: "One On One",
                  value: "one on one",
                },
                {
                  label: "Group Training",
                  value: "group training",
                },
              ]}
            />
          </Form.Item>
        </div>
        <div className="grid grid-cols-3 gap-x-5">
          <Form.Item
            name="appointment_duration"
            className="w-full m-0"
            label="Appointment Duratoin"
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
            min={0}
            className="w-48"
            placeholder="Enter class price"
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default AppointmentForm;
