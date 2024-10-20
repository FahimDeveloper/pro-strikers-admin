/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Select } from "antd";
import { useEffect } from "react";

const CancellationStatusChangeForm = ({
  form,
  onFinish,
  status,
  loading,
}: {
  form: any;
  onFinish: any;
  status: string;
  loading: boolean;
}) => {
  useEffect(() => {
    if (status) {
      form.setFieldsValue({
        status: status,
      });
    }
  }, [status, form]);
  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      className="space-y-3"
    >
      <Form.Item
        label="Status"
        name="status"
        className="m-0"
        rules={[{ required: true }]}
      >
        <Select
          placeholder="Select status"
          options={[
            { label: "Pending", value: "pending" },
            { label: "Processing", value: "processing" },
            { label: "Completed", value: "completed" },
            { label: "Deny", value: "deny" },
          ]}
        />
      </Form.Item>
      <Form.Item className="m-0 flex justify-end">
        <Button loading={loading} htmlType="submit" type="primary">
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CancellationStatusChangeForm;
