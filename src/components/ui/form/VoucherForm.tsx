/* eslint-disable @typescript-eslint/no-explicit-any */
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";

type TProp = {
  record?: any;
  onFinish: any;
  form: any;
  loading: boolean;
};

const VoucherForm = ({ record, onFinish, form, loading }: TProp) => {
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        voucher_type: record?.voucher_type,
        discount_type: record?.discount_type,
        discount_value: record?.discount_value,
        start_date:
          record?.start_date && dayjs(record?.start_date, "DD/MM/YYYY"),
        end_date: record?.end_date && dayjs(record?.end_date, "DD/MM/YYYY"),
        voucher_code: record?.voucher_code,
        description: record?.description,
      });
    }
  }, [record, form]);
  dayjs.extend(weekday);
  dayjs.extend(localeData);
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="space-y-5 mt-5"
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
                label: "General",
                value: "general",
              },
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
                label: "Course",
                value: "course",
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
                label: "Ammount",
                value: "ammount",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="discount_value"
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
          name="voucher_code"
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
          {record && Object.keys(record).length > 0
            ? "Update Voucher"
            : "Create Voucher"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default VoucherForm;
