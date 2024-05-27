/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";

type TProp = {
  record?: any;
  onFinish: any;
  form: any;
  loading: boolean;
};

const VoucherForm = ({ record, onFinish, form, loading }: TProp) => {
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="space-y-5 mt-5"
      initialValues={{
        voucher_type: record?.voucher_type,
        discount_type: record?.discount_type,
        discount: record?.discount,
        start_date: record?.start_date,
        end_date: record?.end_date,
        voucher: record?.voucher,
        description: record?.description,
      }}
    >
      <div className="grid grid-cols-3 gap-4">
        <Form.Item
          name="voucher_type"
          className="m-0"
          label="Voucher Type"
          rules={[{ required: true, message: "Please select voucher type" }]}
        >
          <Select
            placeholder="Select type"
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
            ]}
          />
        </Form.Item>
        <Form.Item
          name="discount_type"
          className="w-full m-0"
          label="Discount Type"
          rules={[{ required: true, message: "Please select discount type" }]}
        >
          <Select
            placeholder="Select type"
            options={[
              {
                label: "Percentage",
                value: "percentage",
              },
              {
                label: "Money",
                value: "money",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="discount"
          className="m-0"
          label="Discount"
          rules={[{ required: true }]}
        >
          <InputNumber className="w-full" placeholder="Enter discount value" />
        </Form.Item>
        <Form.Item
          name="start_date"
          className="m-0"
          label="Validity Start"
          rules={[{ required: true, message: "Please select date" }]}
        >
          <DatePicker className="w-full" format={"DD/MM/YYYY"} />
        </Form.Item>
        <Form.Item
          name="end_date"
          className="m-0"
          label="Validity End"
          rules={[{ required: true, message: "Please select date" }]}
        >
          <DatePicker className="w-full" format={"DD/MM/YYYY"} />
        </Form.Item>
        <Form.Item
          name="voucher"
          className="m-0"
          label="Voucher Code"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter discount value" />
        </Form.Item>
        <Form.Item
          name="description"
          className="w-full m-0 col-span-3"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input.TextArea placeholder="Enter description" rows={5} />
        </Form.Item>
      </div>
      <Form.Item className="flex justify-end m-0">
        <Button htmlType="submit" loading={loading} className="primary-btn">
          Create Voucher
        </Button>
      </Form.Item>
    </Form>
  );
};

export default VoucherForm;
