/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import {
  useGetBookingSlotsQuery,
  useGroupTrainingBookedSlotsQuery,
} from "../../../redux/features/slotBooking/slotBookingApi";
import GroupTrainingSteps from "../step/GroupTrainingReservationSetps";
import BookingPart from "../../common/BookingPart";

type TProp = {
  record?: any;
  form: any;
  onSubmit: any;
  current: any;
  setCurrent: any;
  data: any;
  loading: boolean;
  isSuccess: boolean;
  selectSlots: any;
  setSelectSlots?: any;
  appointmentId: any;
  setAppointmentId: any;
  setSkip: any;
  skip: any;
};

const GroupAppointmentReservationForm = ({
  record,
  data,
  current,
  setCurrent,
  form,
  isSuccess,
  onSubmit,
  loading,
  selectSlots,
  setSelectSlots,
  appointmentId,
  setAppointmentId,
  setSkip,
}: TProp) => {
  const [activeDate, setActiveDate] = useState(new Date());
  const [checkForm] = useForm();

  const slotsCartQuery = useGetBookingSlotsQuery(
    {
      training: appointmentId,
      date: activeDate.toISOString().split("T")[0],
    },
    { skip: data ? false : true }
  );
  const slotsBookedQuery = useGroupTrainingBookedSlotsQuery(
    {
      training: appointmentId,
      date: activeDate.toISOString().split("T")[0],
    },
    { skip: data ? false : true }
  );
  useEffect(() => {
    if (isSuccess) {
      checkForm.resetFields();
    }
  }, [isSuccess, checkForm]);

  const onCheckFinish = (values: any) => {
    setAppointmentId(values.id);
    setSkip(false);
  };

  return (
    <div className="space-y-5">
      <Form onFinish={onCheckFinish} form={checkForm} layout="vertical">
        <div className="flex gap-3">
          <Form.Item
            className="w-full m-0"
            name="id"
            rules={[{ required: true, message: "Enter Appointment id" }]}
          >
            <Input placeholder="Enter appointment Id" />
          </Form.Item>
          <Form.Item className="m-0">
            <Button
              type="primary"
              className="px-5"
              htmlType="submit"
              loading={loading}
            >
              Get Appointment
            </Button>
          </Form.Item>
        </div>
      </Form>
      {data?.results && (
        <BookingPart
          activeDate={activeDate}
          data={data}
          selectSlots={selectSlots}
          setActiveDate={setActiveDate}
          setSelectSlots={setSelectSlots}
          slotsBookedQuery={slotsBookedQuery}
          slotsCartQuery={slotsCartQuery}
        />
      )}
      {selectSlots.length > 0 && (
        <GroupTrainingSteps
          record={record}
          current={current}
          setCurrent={setCurrent}
          onSubmit={onSubmit}
          form={form}
          loading={loading}
        />
      )}
    </div>
  );
};

export default GroupAppointmentReservationForm;
