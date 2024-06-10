/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, DatePicker, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { useUsersEmailQuery } from "../../../redux/features/user/userApi";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import { useFacilityByDateMutation } from "../../../redux/features/schedule/facilityScheduleApi";
import { createTimeSlots } from "../../../utils/createTimeSlots";
import { useForm } from "antd/es/form/Form";

type TProp = {
  record?: any;
  form: any;
  onFinish: any;
  loading: boolean;
  isSuccess?: boolean;
};

const FacilityReservationForm = ({
  record,
  form,
  onFinish,
  loading,
  isSuccess,
}: TProp) => {
  dayjs.extend(weekday);
  dayjs.extend(localeData);
  const [facilityDate, setFacilityDate] = useState("");
  const [checkForm] = useForm();
  const { data: usres } = useUsersEmailQuery(undefined);
  const [facilityByDate, { data, isLoading, isError, error }] =
    useFacilityByDateMutation();
  const userOptions = usres?.results.map((user: any) => {
    return {
      value: user.email,
      label: user.email,
    };
  });
  const timeSlotOptions = createTimeSlots(
    data?.results?.schedules[0]?.start_time,
    data?.results?.schedules[0]?.end_time,
    data?.results?.facility_duration
  );
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        user_email: record.user_email,
        category: record?.category,
        trainer: record?.trainer,
        facility: record?._id,
        time_slots: record?.time_slots,
        facility_date: record?.facility_date
          ? dayjs(record?.facility_date, "DD/MM/YYYY")
          : "",
      });
    }
    if (data?.results) {
      form.setFieldsValue({
        category: data?.results?.sport,
        trainer: data?.results?.trainer,
        facility: data?.results?._id,
        facility_date: facilityDate,
      });
    }
  }, [record, form, data, facilityDate]);
  useEffect(() => {
    if (isError) {
      Swal.fire({
        title: "Oops!..",
        icon: "error",
        text: `${(error as any)?.data?.message}`,
        confirmButtonColor: "#0ABAC3",
      });
    }
    if (isSuccess) {
      checkForm.resetFields();
    }
  }, [isError, error, isSuccess, checkForm]);
  const onCheckFinish = (values: any) => {
    facilityByDate(values);
    setFacilityDate(values.date);
  };
  return (
    <div className="space-y-5">
      {!record && (
        <Form onFinish={onCheckFinish} form={checkForm} layout="vertical">
          <div className="grid grid-cols-5 gap-3">
            <Form.Item
              className="col-span-3 m-0"
              name="id"
              rules={[{ required: true, message: "Enter facility id" }]}
            >
              <Input placeholder="Enter the class ID" />
            </Form.Item>
            <div className="col-span-2 flex gap-3">
              <Form.Item
                className="m-0 w-full"
                name="date"
                rules={[{ required: true, message: "select booking date" }]}
              >
                <DatePicker className="w-full" />
              </Form.Item>
              <Form.Item className="m-0">
                <Button type="primary" htmlType="submit" loading={isLoading}>
                  Check
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      )}
      <Form onFinish={onFinish} form={form} layout="vertical">
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="user_email"
            label="User"
            className="m-0"
            rules={[
              {
                required: data?.results._id ? true : false,
                message: "select user",
              },
            ]}
          >
            <Select
              placeholder="Select user"
              disabled={data?.results._id ? false : record ? false : true}
              options={userOptions}
              showSearch
            />
          </Form.Item>
          <Form.Item
            name="trainer"
            label="Trainer"
            className="m-0"
            rules={[
              {
                required: data?.results._id ? true : false,
                message: "Enter Trainer",
              },
            ]}
          >
            <Input
              placeholder="Enter trainer"
              readOnly
              disabled={data?.results._id ? false : record ? false : true}
            />
          </Form.Item>
          <Form.Item
            className="col-span-2 m-0"
            name="facility"
            label="Facility ID"
            rules={[{ required: true, message: "enter facility id" }]}
          >
            <Input
              readOnly
              disabled={data?.results._id ? false : record ? false : true}
              placeholder="Enter the facility Id"
            />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            className="m-0"
            rules={[
              {
                required: data?.results._id ? true : false,
                message: "Enter category",
              },
            ]}
          >
            <Input
              disabled={data?.results._id ? false : record ? false : true}
              readOnly
              placeholder="Enter category"
            />
          </Form.Item>
          <Form.Item
            className="m-0 w-full"
            name="facility_date"
            label="Facility Date"
            rules={[
              {
                required: data?.results._id ? true : false,
                message: "select class date",
              },
            ]}
          >
            <DatePicker
              className="w-full"
              disabled={data?.results._id ? false : record ? false : true}
            />
          </Form.Item>
          <Form.Item
            name="time_slots"
            label="Time Slots"
            className="col-span-2 m-0"
            rules={[
              {
                required: data?.results._id ? true : false,
                message: "select time slots",
              },
            ]}
          >
            <Select
              placeholder="select time slots"
              mode="multiple"
              disabled={data?.results._id ? false : record ? false : true}
              options={timeSlotOptions}
            />
          </Form.Item>
        </div>
        <div className="flex justify-end mt-4">
          <Form.Item className="m-0">
            <Button
              type="primary"
              disabled={data?.results._id ? false : record ? false : true}
              htmlType="submit"
              loading={loading}
            >
              {record && Object.keys(record).length > 0
                ? "Update Reservation"
                : "Create Reservation"}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default FacilityReservationForm;
