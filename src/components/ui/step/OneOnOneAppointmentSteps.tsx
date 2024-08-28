/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Steps } from "antd";
import { useState } from "react";
import ScheduleForm from "../form/ScheduleForm";
import AppointmentOneOnOneForm from "../form/AppointmentOneOnOneForm";

type TProp = {
  record?: any;
  form: any;
  onSubmit: any;
  loading: boolean;
  current: any;
  setCurrent: any;
};

const OneOnOneAppointmentSteps = ({
  record,
  form,
  onSubmit,
  loading,
  current,
  setCurrent,
}: TProp) => {
  const [formData, setFormData] = useState<any>({});
  const steps = [
    {
      title: "General Details",
      content: <AppointmentOneOnOneForm record={record} form={form} />,
    },
    {
      title: "Schedule",
      content: <ScheduleForm record={record} form={form} />,
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
            {record && Object.keys(record).length > 1
              ? "Update Appointment"
              : "Create Appointment"}
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button className="primary-btn" onClick={() => next()}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default OneOnOneAppointmentSteps;
