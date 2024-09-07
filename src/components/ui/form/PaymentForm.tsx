/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, InputNumber, Select } from "antd";
import { useEffect } from "react";
import { IPayment } from "../../../types/payment";

type TProp = {
  record?: IPayment;
  onFinish: any;
  form: any;
  loading: boolean;
};

const PaymentForm = ({ record, onFinish, loading, form }: TProp) => {
  useEffect(() => {
    form.setFieldsValue({
      transection_id: record?.transection_id,
      email: record?.email,
      user: record?.user._id,
      amount: record?.amount,
      service: record?.service,
    });
  }, [record, form]);
  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <div className="mb-4">
        <Form.Item label="Transection ID" name="transection_id">
          <Input readOnly={record ? true : false} placeholder="Type here" />
        </Form.Item>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Form.Item label="Email" name="email" className="m-0">
          <Input placeholder="Type here" />
        </Form.Item>
        <Form.Item label="User ID" name="user" className="m-0">
          <Input placeholder="Type here" />
        </Form.Item>
        <Form.Item label="Amount" name="amount" className="m-0">
          <InputNumber className="w-full" placeholder="Type here" />
        </Form.Item>
        <Form.Item label="Payment Service" name="service" className="m-0">
          <Select
            className="w-full col-span-1"
            placeholder="Select a payment service"
            optionFilterProp="children"
            options={[
              {
                label: "Membership",
                value: "membership",
              },
              {
                label: "Appointment",
                value: "appointment",
              },
              {
                label: "Facility",
                value: "facility",
              },
              {
                label: "Class",
                value: "class",
              },
              {
                label: "Bootcamp",
                value: "course",
              },
              {
                label: "Event",
                value: "event",
              },
            ]}
          />
        </Form.Item>
      </div>
      <Form.Item className="flex justify-end mb-0 mt-5">
        <Button className="primary-btn" htmlType="submit" loading={loading}>
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PaymentForm;
