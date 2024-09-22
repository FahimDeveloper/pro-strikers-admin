/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input } from "antd";
import { useEffect } from "react";

type TProp = {
  form: any;
  loading: boolean;
  onFinish: any;
  record?: any;
};

const LaneForm = ({ form, loading, onFinish, record }: TProp) => {
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        lane_title: record?.lane_title,
        description: record?.description,
      });
    }
  }, [record, form]);

  return (
    <>
      <Form
        onFinish={onFinish}
        form={form}
        layout="vertical"
        className="space-y-4"
      >
        <Form.Item
          label="Lane Name"
          className=" m-0"
          name="lane_title"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter lane title" />
        </Form.Item>
        <Form.Item
          label="Description"
          className=" m-0"
          name="description"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={4} placeholder="Enter lane description" />
        </Form.Item>
        <div className="flex justify-end">
          <Form.Item>
            <Button className="primary-btn" htmlType="submit" loading={loading}>
              {record && Object.keys(record).length > 0
                ? "Update Lane"
                : "Create Lane"}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default LaneForm;
