/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "antd";
import { useEffect } from "react";

type TProp = {
  record?: any;
  form: any;
  onFinish: any;
  loading: boolean;
};

const OneOnOneApppointmentReservationForm = ({
  record,
  form,
  onFinish,
  loading,
}: TProp) => {
  useEffect(() => {
    if (record) {
      console.log(record);
    }
  }, [record, form]);
  return (
    <Form onFinish={onFinish} form={form}>
      <h2>Welcome to the OneOnOneApppointmentReservationForm page</h2>
    </Form>
  );
};

export default OneOnOneApppointmentReservationForm;
