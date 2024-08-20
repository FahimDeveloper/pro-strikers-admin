/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import GroupReservationGeneralForm from "../form/GroupReservationGeneralForm";
import GroupReservationTeamDetailsForm from "../form/GroupReservationTeamDetailsForm";
import { Button, Steps } from "antd";
import { IEventGroupReservation } from "../../../types/event.types";

const GroupEventReservationSteps = ({
  record,
  form,
  onSubmit,
  loading,
  current,
  setCurrent,
}: {
  form: any;
  onSubmit: any;
  loading: boolean;
  record?: IEventGroupReservation;
  current: number;
  setCurrent: any;
}) => {
  const [formData, setFormData] = useState<any>({});
  const steps = [
    {
      title: "General Details",
      content: <GroupReservationGeneralForm form={form} record={record} />,
    },
    {
      title: "Team Details",
      content: <GroupReservationTeamDetailsForm form={form} record={record} />,
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
  );
};

export default GroupEventReservationSteps;
