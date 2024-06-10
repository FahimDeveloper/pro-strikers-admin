/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, DatePicker, Form, Input, Select } from "antd";
import { useEffect } from "react";
import { useUsersEmailQuery } from "../../../redux/features/user/userApi";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import { useCourseByDateMutation } from "../../../redux/features/schedule/courseScheduleApi";

type TProp = {
  record?: any;
  form: any;
  onFinish: any;
  loading: boolean;
};

const CourseReservationForm = ({ record, form, onFinish, loading }: TProp) => {
  dayjs.extend(weekday);
  dayjs.extend(localeData);
  const { data: usres } = useUsersEmailQuery(undefined);
  const [classByDate, { data, isLoading, isError, error }] =
    useCourseByDateMutation();
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
        course: record?._id,
        course_date: record?.course_date
          ? dayjs(record?.course_date, "DD/MM/YYYY")
          : "",
      });
    }
    if (data?.results) {
      form.setFieldsValue({
        category: data?.results?.sport,
        trainer: data?.results?.trainer,
        course: data?.results?._id,
        course_date: dayjs(data?.results?.start_date, "DD/MM/YYYY"),
      });
    }
  }, [record, form, data]);
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
  };
  return (
    <div className="space-y-5">
      {!record && (
        <Form onFinish={onCheckFinish} layout="vertical">
          <div className="flex gap-2">
            <Form.Item
              className="m-0 w-full"
              name="id"
              rules={[{ required: true, message: "Enter course id" }]}
            >
              <Input placeholder="Enter the course ID" />
            </Form.Item>
            <Form.Item className="m-0">
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Check
              </Button>
            </Form.Item>
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
            name="course"
            label="Course ID"
            rules={[{ required: true, message: "Enter course id" }]}
          >
            <Input
              readOnly
              disabled={data?.results._id ? false : record ? false : true}
              placeholder="Enter the course ID"
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
            name="course_date"
            label="Course Start Date"
            rules={[
              {
                required: data?.results._id ? true : false,
                message: "select course date",
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

export default CourseReservationForm;
