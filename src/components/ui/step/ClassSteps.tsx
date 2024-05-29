/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Steps } from "antd";
import ClassForm from "../form/ClassForm";
import { useState } from "react";
import ScheduleForm from "../form/ScheduleForm";

type TProp = {
  record?: any;
  form: any;
  onSubmit: any;
  loading: boolean;
};

const ClassSteps = ({ record, form, onSubmit, loading }: TProp) => {
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const steps = [
    {
      title: "General Details",
      content: <ClassForm record={record} form={form} />,
    },
    {
      title: "Schedule",
      content: <ScheduleForm record={record} form={form} />,
    },
  ];
  const next = () => {
    form.validateFields().then((values: any) => {
      setCurrent(current + 1);
      setFormData({ ...formData, ...values });
    });
  };

  const onFinish = () => {
    form
      .validateFields()
      .then((values: any) => {
        setFormData({ ...formData, ...values });
      })
      .then(() => {
        onSubmit(formData);
      });
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const onChange = (value: number) => {
    form.validateFields().then((values: any) => {
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
          <Button
            className="primary-btn"
            loading={loading}
            onClick={() => onFinish()}
          >
            Create Class
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

export default ClassSteps;
