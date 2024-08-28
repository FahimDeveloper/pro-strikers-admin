/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  useGetBookingSlotsQuery,
  useOneTrainingBookedSlotsQuery,
} from "../../../redux/features/slotBooking/slotBookingApi";
import { Button, Form, Input } from "antd";
import BookingPart from "../../common/BookingPart";
import GeneralReservationForm from "./GeneralReservationForm";

type TProp = {
  record?: any;
  form: any;
  onFinish: any;
  data: any;
  loading: boolean;
  selectSlots: any;
  setSelectSlots?: any;
  appointmentId: any;
  checkForm: any;
  onCheckFinish: any;
};

const OneOnOneApppointmentReservationForm = ({
  record,
  data,
  form,
  onFinish,
  loading,
  selectSlots,
  setSelectSlots,
  appointmentId,
  onCheckFinish,
  checkForm,
}: TProp) => {
  const [activeDate, setActiveDate] = useState(new Date());
  const slotsCartQuery = useGetBookingSlotsQuery(
    {
      training: appointmentId,
      date: activeDate.toISOString().split("T")[0],
    },
    { skip: data ? false : true }
  );
  const slotsBookedQuery = useOneTrainingBookedSlotsQuery(
    {
      training: appointmentId,
      date: activeDate.toISOString().split("T")[0],
    },
    { skip: data ? false : true }
  );
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
        <GeneralReservationForm
          record={record}
          onFinish={onFinish}
          form={form}
          loading={loading}
        />
      )}
    </div>
  );
};

export default OneOnOneApppointmentReservationForm;
