/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, InputNumber, Select } from "antd";
import { useEffect } from "react";
import { IPayment } from "../../../types/payment";
import { generateCustomTransectionId } from "../../../utils/generateCustomTransectionId";

type TProp = {
  record?: IPayment;
  onFinish: any;
  form: any;
  loading: boolean;
};

const PaymentForm = ({ record, onFinish, loading, form }: TProp) => {
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        transaction_id: record?.transaction_id,
        email: record?.email,
        user: record?.user._id,
        amount: record?.amount,
        service: record?.service,
      });
    }
  }, [record, form]);
  const generateId = () => {
    const id = generateCustomTransectionId();
    form.setFieldsValue({
      transaction_id: id,
    });
  };
  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <div className="flex items-end gap-4">
        <Form.Item
          label="Transaction ID"
          className="w-full"
          name="transaction_id"
        >
          <Input readOnly={true} className="w-full" placeholder="Type here" />
        </Form.Item>
        {!record && (
          <Form.Item>
            <Button type="primary" onClick={generateId}>
              Generate ID
            </Button>
          </Form.Item>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Form.Item label="Email" name="email" className="m-0">
          <Input readOnly={record ? true : false} placeholder="Type here" />
        </Form.Item>
        <Form.Item label="User ID" name="user" className="m-0">
          <Input readOnly={record ? true : false} placeholder="Type here" />
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
