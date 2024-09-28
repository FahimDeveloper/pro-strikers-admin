/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input } from "antd";

const PasswordForm = ({
  form,
  onFinish,
  loading,
}: {
  form: any;
  onFinish: any;
  loading: boolean;
}) => {
  return (
    <Form
      onFinish={onFinish}
      form={form}
      layout="vertical"
      className="space-y-5"
    >
      <div className="space-y-2">
        <Form.Item
          className="m-0"
          label="Current Password"
          name="current_password"
          rules={[
            {
              required: true,
              message: "Please input your current password!",
            },
          ]}
        >
          <Input.Password
            className="py-2"
            placeholder="Enter your current password"
          />
        </Form.Item>
        <Form.Item
          className="m-0"
          label="New Password"
          name="new_password"
          rules={[
            {
              required: true,
              message: "Please input your new password!",
            },
          ]}
        >
          <Input.Password
            className="py-2"
            placeholder="Enter your new password"
          />
        </Form.Item>
        <Form.Item
          className="m-0"
          label="Confirm New Password"
          name="confirm_password"
          rules={[
            {
              required: true,
              message: "Please input your confirm new password!",
            },
          ]}
        >
          <Input.Password
            className="py-2"
            placeholder="Enter your confirm password"
          />
        </Form.Item>
      </div>
      <Form.Item className="flex justify-end">
        <Button htmlType="submit" loading={loading} className="primary-btn-2">
          Change Password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PasswordForm;
