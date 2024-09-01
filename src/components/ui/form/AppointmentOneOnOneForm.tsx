/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, InputNumber, Select } from "antd";
import { useEffect } from "react";
import { useTrainersQuery } from "../../../redux/features/admin/adminApi";

const AppointmentOneOnOneForm = ({ record, form }: any) => {
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
        duration: record?.duration,
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
            name="duration"
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
            <Input readOnly placeholder="enter sport" />
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

export default AppointmentOneOnOneForm;
