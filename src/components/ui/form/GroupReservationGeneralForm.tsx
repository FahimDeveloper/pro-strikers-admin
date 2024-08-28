/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, InputNumber } from "antd";
import { IEventGroupReservation } from "../../../types/event.types";
import { useEffect } from "react";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

const GroupReservationGeneralForm = ({
  record,
  form,
}: {
  form: any;
  record: IEventGroupReservation | undefined;
}) => {
  dayjs.extend(weekday);
  dayjs.extend(localeData);
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        first_name: record?.first_name,
        last_name: record?.last_name,
        age: record?.age,
        email: record?.email,
        phone: record?.phone,
        sport: record?.sport,
        city: record?.city,
        zip_code: record?.zip_code,
        street_address: record?.street_address,
        state: record?.state,
      });
    }
  }, [record, form]);
  return (
    <Form form={form} layout="vertical">
      <div className="grid grid-cols-2 gap-4">
        {!record && (
          <Form.Item
            label="Event Id"
            className="col-span-2 m-0"
            name="event"
            rules={[{ required: true }]}
          >
            <Input placeholder="Type here..." />
          </Form.Item>
        )}
        <Form.Item
          label="First Name"
          name="first_name"
          className="m-0"
          rules={[{ required: true }]}
        >
          <Input placeholder="Type here..." />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="last_name"
          className="m-0"
          rules={[{ required: true }]}
        >
          <Input placeholder="Type here..." />
        </Form.Item>
        <Form.Item
          className="m-0"
          label="Email"
          name="email"
          rules={[{ required: true }]}
        >
          <Input className="m-0" placeholder="Type here.." />
        </Form.Item>
        <Form.Item
          className="m-0"
          label="Phone"
          name="phone"
          rules={[{ required: true }]}
        >
          <Input placeholder="Type here.." />
        </Form.Item>
        <Form.Item
          className="m-0"
          label="Age"
          name="age"
          rules={[{ required: true }]}
        >
          <InputNumber
            className="w-full"
            placeholder="Type here.."
            min={0}
            max={99}
          />
        </Form.Item>
        <Form.Item
          name="sport"
          className="w-full m-0"
          label="Sport"
          rules={[{ required: true }]}
        >
          <Input placeholder="Type here.." />
        </Form.Item>

        <Form.Item
          className="m-0"
          label="Street Address"
          name="street_address"
          rules={[{ required: true }]}
        >
          <Input placeholder="Type here.." />
        </Form.Item>
        <Form.Item
          className="m-0"
          label="City"
          name="city"
          rules={[{ required: true, message: "Enter your city" }]}
        >
          <Input placeholder="Type here.." />
        </Form.Item>
        <Form.Item
          className="m-0"
          label="State/Province"
          name="state"
          rules={[{ required: true }]}
        >
          <Input placeholder="Type here.." />
        </Form.Item>
        <Form.Item
          className="m-0"
          label="Zip/Postal Code"
          name="zip_code"
          rules={[{ required: true }]}
        >
          <Input placeholder="Type here.." />
        </Form.Item>
      </div>
    </Form>
  );
};

export default GroupReservationGeneralForm;
