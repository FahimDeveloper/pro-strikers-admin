/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, Form, Input, Steps } from "antd";
import EventGroupReservationForm from "../form/EventGroupReservationForm";
import { IEventGroupReservation } from "../../../types/event.types";
import EventGroupReservationDetailsForm from "../form/EventGroupReservationDetailsForm";

const GroupEventReservationSteps = ({
  record,
  form,
  onSubmit,
  loading,
  current,
  setCurrent,
  onCheckFinish,
  checkForm,
  eventData,
}: {
  form: any;
  onSubmit: any;
  loading: boolean;
  record?: IEventGroupReservation;
  current: number;
  setCurrent: any;
  onCheckFinish?: any;
  checkForm?: any;
  eventData?: any;
}) => {
  const [formData, setFormData] = useState<any>({});
  const steps = [
    {
      title: "General Details",
      content: <EventGroupReservationForm form={form} record={record} />,
    },
    {
      title: "Team Details",
      content: (
        <EventGroupReservationDetailsForm
          formData={formData}
          form={form}
          record={record}
        />
      ),
    },
  ];
  const next = () => {
    form.validateFields().then((values: any) => {
      setFormData({ ...formData, ...values });
      setCurrent(current + 1);
    });
  };

  const onFinish = () => {
    form.validateFields().then((values: any) => {
      onSubmit({ ...formData, ...values });
    });
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const onChange = (value: number) => {
    if (value < current) {
      setCurrent(value);
    } else {
      form.validateFields().then((values: any) => {
        setFormData({ ...formData, ...values });
        setCurrent(value);
      });
    }
  };
  const items = steps.map((item) => ({ key: item.title, title: item.title }));
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
            label="Event Id"
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
      {(eventData?._id || record) && (
        <div className="space-y-7 mt-5">
          <Steps
            current={current}
            items={items}
            onChange={onChange}
            direction="horizontal"
          />
          <div className="px-5">{steps[current].content}</div>
          <div className="flex justify-end gap-2">
            {current > 0 && (
              <Button className="primary-btn" onClick={() => prev()}>
                Back
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                className="primary-btn"
                loading={loading}
                onClick={() => onFinish()}
              >
                {record ? "Update Reservation" : "Create Reservation"}
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button className="primary-btn" onClick={() => next()}>
                Next
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default GroupEventReservationSteps;
