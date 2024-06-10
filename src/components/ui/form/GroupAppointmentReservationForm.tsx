/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, DatePicker, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { useUsersEmailQuery } from "../../../redux/features/user/userApi";
import { useClassByDateMutation } from "../../../redux/features/schedule/classScheduleApi";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

type TProp = {
  record?: any;
  form: any;
  onFinish: any;
  loading: boolean;
};

const GroupAppointmentReservationForm = ({
  record,
  form,
  onFinish,
  loading,
}: TProp) => {
  dayjs.extend(weekday);
  dayjs.extend(localeData);
  const [classDate, setClassDate] = useState("");
  const { data: usres } = useUsersEmailQuery(undefined);
  const [classByDate, { data, isLoading, isError, error }] =
    useClassByDateMutation();
  const userOptions = usres?.results.map((user: any) => {
    return {
      value: user.email,
      label: user.email,
    };
  });
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        user_email: record.user_email,
        category: record?.category,
        trainer: record?.trainer,
        class: record?._id,
        class_date: record?.class_date
          ? dayjs(record?.class_date, "DD/MM/YYYY")
          : "",
      });
      console.log();
    }
    if (data?.results) {
      form.setFieldsValue({
        category: data?.results?.sport,
        trainer: data?.results?.trainer,
        class: data?.results?._id,
        class_date: classDate,
      });
    }
  }, [record, form, data, classDate]);
  useEffect(() => {
    if (isError) {
      Swal.fire({
        title: "Oops!..",
        icon: "error",
        text: `${(error as any)?.data?.message}`,
        confirmButtonColor: "#0ABAC3",
      });
    }
  }, [isError, error]);
  const onCheckFinish = (values: any) => {
    classByDate(values);
    setClassDate(values.date);
  };
  return (
    <div className="space-y-5">
      {!record && (
        <Form onFinish={onCheckFinish} layout="vertical">
          <div className="grid grid-cols-5 gap-3">
            <Form.Item
              className="col-span-3 m-0"
              name="id"
              rules={[{ required: true, message: "Enter class id" }]}
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
                message: "select Trainer",
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
            name="class"
            label="Class ID"
            rules={[{ required: true, message: "enter class id" }]}
          >
            <Input
              readOnly
              disabled={data?.results._id ? false : record ? false : true}
              placeholder="Enter the class ID"
            />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            className="m-0"
            rules={[
              {
                required: data?.results._id ? true : false,
                message: "select category",
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
            name="class_date"
            label="Class Date"
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

export default GroupAppointmentReservationForm;
