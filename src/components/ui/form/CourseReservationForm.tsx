/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, InputNumber } from "antd";
import { useEffect } from "react";

type TProp = {
  record?: any;
  form: any;
  onFinish: any;
  loading: boolean;
  courseData?: any;
  checkForm?: any;
  onCheckFinish?: any;
};

const CourseReservationForm = ({
  record,
  form,
  onFinish,
  loading,
  checkForm,
  onCheckFinish,
  courseData,
}: TProp) => {
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        first_name: record?.first_name,
        last_name: record?.last_name,
        email: record?.email,
        phone: record?.phone,
        age: record?.age,
        state: record?.state,
        city: record?.city,
        sport: record?.sport,
        street_address: record?.street_address,
        zip_code: record?.zip_code,
      });
    }
  }, [record, form]);

  const validateUSPhoneNumber = (_: any, value: string) => {
    const phoneNumberRegex =
      /^(?:\+1\s*?)?(?:\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/;

    if (!phoneNumberRegex.test(value)) {
      return Promise.reject(new Error("Please enter a valid USA phone number"));
    }
    return Promise.resolve();
  };

  return (
    <>
      {!record && (
        <Form
          onFinish={onCheckFinish}
          form={checkForm}
          className="col-span-2 flex gap-4 items-end mb-4"
          layout="vertical"
        >
          <Form.Item
            label="Bootcamp Id"
            name="id"
            className="m-0 w-full"
            rules={[{ required: true }]}
          >
            <Input placeholder="Type here..." />
          </Form.Item>
          <Form.Item className="m-0">
            <Button loading={loading} htmlType="submit" type="primary">
              Check
            </Button>
          </Form.Item>
        </Form>
      )}
      {(courseData?._id || record) && (
        <Form form={form} onFinish={onFinish} layout="vertical">
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="First Name"
              name="first_name"
              className="m-0"
              rules={[{ required: true }]}
            >
              <Input placeholder="Type here.." />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="last_name"
              className="m-0"
              rules={[{ required: true }]}
            >
              <Input placeholder="Type here.." />
            </Form.Item>
            <Form.Item
              label="Email"
              className="m-0"
              name="email"
              rules={[{ required: true }]}
            >
              <Input placeholder="Type here.." />
            </Form.Item>
            <Form.Item
              name="sport"
              className="m-0"
              label="Sport"
              rules={[{ required: true }]}
            >
              <Input placeholder="Type here.." readOnly />
            </Form.Item>
            <Form.Item
              className="m-0"
              name="phone"
              label="Phone"
              rules={[
                { required: true, message: "" },
                { validator: validateUSPhoneNumber },
              ]}
            >
              <Input prefix={"USA"} placeholder="Type here.." />
            </Form.Item>
            <Form.Item
              label="Age"
              className="m-0"
              name="age"
              rules={[{ required: true }]}
            >
              <InputNumber
                placeholder="Type here.."
                className="w-full"
                min={0}
                max={99}
              />
            </Form.Item>
            <Form.Item
              label="Street Address"
              name="street_address"
              className="m-0"
              rules={[{ required: true }]}
            >
              <Input placeholder="Type here.." />
            </Form.Item>
            <Form.Item
              label="City"
              className="m-0"
              name="city"
              rules={[{ required: true }]}
            >
              <Input placeholder="Type here.." />
            </Form.Item>
            <Form.Item
              label="State/Province"
              name="state"
              className="m-0"
              rules={[{ required: true }]}
            >
              <Input placeholder="Type here.." />
            </Form.Item>
            <Form.Item
              label="Zip/Postal Code"
              name="zip_code"
              className="m-0"
              rules={[{ required: true }]}
            >
              <Input placeholder="Type here.." />
            </Form.Item>
          </div>
          <Form.Item className="flex mt-5 justify-end">
            <Button htmlType="submit" loading={loading} className="primary-btn">
              {record ? "Update" : "Create"} Reservation
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default CourseReservationForm;
