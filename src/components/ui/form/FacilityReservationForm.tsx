/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import { useFacilityQuery } from "../../../redux/features/schedule/facilityScheduleApi";
import { useForm } from "antd/es/form/Form";
import BookingPart from "../../../pages/Reservations/FacilityReservation/components/BookingPart";

type TProp = {
  record?: any;
  form: any;
  onFinish: any;
  loading: boolean;
  isSuccess?: boolean;
  selectSlots?: any;
  setSelectSlots?: any;
};

const FacilityReservationForm = ({
  record,
  form,
  isSuccess,
  onFinish,
  loading,
  selectSlots,
  setSelectSlots,
}: TProp) => {
  dayjs.extend(weekday);
  dayjs.extend(localeData);
  const [checkForm] = useForm();
  const [skip, setSkip] = useState(true);
  const [facilityId, setFacilityId] = useState("");

  const {
    data,
    isSuccess: querySuccess,
    isLoading,
    isError,
    error,
  } = useFacilityQuery(facilityId, {
    skip,
  });
  useEffect(() => {
    if (isError) {
      setSkip(true);
      Swal.fire({
        title: "Oops!..",
        icon: "error",
        text: `${(error as any)?.data?.message}`,
        confirmButtonColor: "#0ABAC3",
      });
    }
    if (querySuccess) {
      setSkip(true);
    }
    if (isSuccess) {
      checkForm.resetFields();
    }
  }, [isError, error, isSuccess, checkForm, querySuccess]);
  const onCheckFinish = (values: any) => {
    setFacilityId(values.id);
    setSkip(false);
  };
  return (
    <div>
      <Form onFinish={onCheckFinish} form={checkForm} layout="vertical">
        <div className="flex gap-3">
          <Form.Item
            className="w-full m-0"
            name="id"
            rules={[{ required: true, message: "Enter facility id" }]}
          >
            <Input placeholder="Enter facility Id" />
          </Form.Item>
          <Form.Item className="m-0">
            <Button
              type="primary"
              className="px-5"
              htmlType="submit"
              loading={isLoading}
            >
              Get Facility
            </Button>
          </Form.Item>
        </div>
      </Form>
      {data?.results && (
        <BookingPart
          rentalFacility={data}
          selectSlots={selectSlots}
          setSelectSlots={setSelectSlots}
        />
      )}
      {selectSlots.length > 0 && (
        <Form form={form} onFinish={onFinish} layout="vertical">
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="First Name"
              className="m-0"
              name="first_name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Type here.." />
            </Form.Item>
            <Form.Item
              label="Last Name"
              className="m-0"
              name="last_name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Type here.." />
            </Form.Item>
            <Form.Item
              label="Phone"
              className="m-0"
              name="phone"
              rules={[{ required: true }]}
            >
              <Input placeholder="Type here.." />
            </Form.Item>
            <Form.Item
              label="Email"
              className="m-0"
              name="email"
              rules={[{ required: true }]}
            >
              <Input placeholder="Type here.." />
            </Form.Item>
            <Form.Item
              label="Street Address"
              name="street_address"
              className="m-0"
              rules={[{ required: true }]}
            >
              <Input placeholder="Type here.." />
            </Form.Item>
            <Form.Item
              label="City"
              className="m-0"
              name="city"
              rules={[{ required: true }]}
            >
              <Input placeholder="Type here.." />
            </Form.Item>
            <Form.Item
              label="State/Province"
              name="state"
              className="m-0"
              rules={[{ required: true }]}
            >
              <Input placeholder="Type here.." />
            </Form.Item>
            <Form.Item
              label="Zip/Postal Code"
              name="zip_code"
              className="m-0"
              rules={[{ required: true }]}
            >
              <Input placeholder="Type here.." />
            </Form.Item>
          </div>
          <Form.Item className="mt-5 text-end">
            <Button htmlType="submit" loading={loading} className="primary-btn">
              {record ? "Update" : "Book Now"}
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default FacilityReservationForm;
