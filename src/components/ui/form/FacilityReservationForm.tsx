/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input } from "antd";
import { useState } from "react";
import BookingPart from "../../common/BookingPart";
import {
  useFacilityBookedSlotsQuery,
  useGetBookingSlotsQuery,
} from "../../../redux/features/slotBooking/slotBookingApi";
import FacilityReservationDetailsForm from "./FacilityReservationDetailsForm";

type TProp = {
  record?: any;
  form: any;
  onFinish: any;
  data?: any;
  loading: boolean;
  checkForm?: any;
  selectSlots?: any;
  setSelectSlots?: any;
  facilityId?: any;
  onCheckFinish?: any;
};

const FacilityReservationForm = ({
  record,
  form,
  checkForm,
  onFinish,
  loading,
  selectSlots,
  setSelectSlots,
  data,
  facilityId,
  onCheckFinish,
}: TProp) => {
  const [activeDate, setActiveDate] = useState(new Date());
  const slotsCartQuery = useGetBookingSlotsQuery(
    {
      training: facilityId,
      date: activeDate.toISOString().split("T")[0],
    },
    { skip: data ? false : true }
  );
  const slotsBookedQuery = useFacilityBookedSlotsQuery(
    {
      training: facilityId,
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
            rules={[{ required: true, message: "Enter faciliy id" }]}
          >
            <Input placeholder="Enter facility id" />
          </Form.Item>
          <Form.Item className="m-0">
            <Button
              type="primary"
              className="px-5"
              htmlType="submit"
              loading={loading}
            >
              Get Facility
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
        <FacilityReservationDetailsForm
          record={record}
          form={form}
          onFinish={onFinish}
          loading={loading}
        />
      )}
    </div>
  );
};

export default FacilityReservationForm;
