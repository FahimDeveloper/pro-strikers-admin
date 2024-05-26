/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Steps } from "antd";
import { useState } from "react";
import ScheduleForm from "../form/ScheduleForm";
import FacilityForm from "../form/FacilityForm";

const FacilitySteps = ({ record, setModalOpen }: any) => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const steps = [
    {
      title: "General Details",
      content: <FacilityForm record={record} form={form} />,
    },
    {
      title: "Schedule",
      content: <ScheduleForm record={record} form={form} />,
    },
  ];
  const next = () => {
    form.validateFields().then((values) => {
      setCurrent(current + 1);
      setFormData({ ...formData, ...values });
    });
  };
  const onSubmit = () => {
    formData.schedules = formData?.schedules?.map((schedule: any) => {
      if (schedule.start_time && schedule.end_time) {
        return {
          day: schedule.day,
          active: schedule.active,
          start_time: schedule.start_time.format("HH:mm A"),
          end_time: schedule.end_time.format("HH:mm A"),
        };
      }
      return schedule;
    });
    console.log(formData);
    setCurrent(0);
    setModalOpen(false);
    form.resetFields();
  };

  const onFinish = () => {
    form.validateFields().then((values) => {
      setFormData({ ...formData, ...values });
      onSubmit();
    });
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const onChange = (value: number) => {
    form.validateFields().then((values) => {
      setFormData({ ...formData, ...values });
      setCurrent(value);
    });
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
          <Button className="primary-btn" onClick={() => onFinish()}>
            Create Facility
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

export default FacilitySteps;
