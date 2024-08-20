/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePicker, Form, Input, InputNumber, Select } from "antd";
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
        preferred_time: record?.preferred_time,
        preferred_date: dayjs(record?.preferred_date, "DD/MM/YYYY"),
        city: record?.city,
        zip_code: record?.zip_code,
        street_address: record?.street_address,
        state: record?.state,
      });
    }
  }, [record, form]);
  return (
    <Form form={form} layout="vertical">
      {!record && (
        <Form.Item
          label="Event Id"
          name="event"
          className="mb-3"
          rules={[{ required: true }]}
        >
          <Input placeholder="Type here..." />
        </Form.Item>
      )}
      <div className="grid grid-cols-2 gap-4">
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
          rules={[{ required: true, message: "Please select Sport" }]}
        >
          <Select
            placeholder="Select sport"
            options={[
              {
                label: "Cricket",
                value: "cricket",
              },
              {
                label: "Soccer",
                value: "soccer",
              },
              {
                label: "Baseball",
                value: "baseball",
              },
              {
                label: "Softball",
                value: "softball",
              },
              {
                label: "Field Hockey",
                value: "field hockey",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Training preferred time"
          name="preferred_time"
          className="m-0"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Select time"
            options={[
              { value: "8:00 am", label: "8:00 am " },
              { value: "10:00 am", label: "10:00 am" },
              { value: "12:00 pm", label: "12:00 pm" },
              { value: "2:00 pm", label: "2:00 pm" },
              { value: "4:00 pm", label: "4:00 pm" },
            ]}
          />
        </Form.Item>
        <Form.Item
          className="m-0"
          label="Training preferred date"
          name="preferred_date"
          rules={[{ required: true }]}
        >
          <DatePicker
            placeholder="select date"
            className="w-full"
            format={"DD/MM/YYYY"}
          />
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
