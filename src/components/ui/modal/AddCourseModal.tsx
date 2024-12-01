/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { useEffect, useState } from "react";
import CourseForm from "../form/CourseForm";
import { useCreateCourseMutation } from "../../../redux/features/schedule/courseScheduleApi";
import { useForm } from "antd/es/form/Form";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { californiaTime } from "../../../utils/timeZone";

const AddCourseModal = () => {
  const [open, setModalOpen] = useState(false);
  const [form] = useForm();
  const [create, { data, isLoading, isSuccess, isError, error }] =
    useCreateCourseMutation();
  const onFinish = (values: any) => {
    values.start_date = dayjs(values.start_date).format();
    values.end_date = dayjs(values.end_date).format();
    values.start_time = californiaTime(values?.start_time?.toISOString());
    values.end_time = californiaTime(values?.end_time?.toISOString());
    create(values);
  };
  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        title: "Success",
        icon: "success",
        text: `${data?.message}`,
        showConfirmButton: false,
        timer: 1500,
        iconColor: "#0ABAC3",
      });
      setModalOpen(false);
      form.resetFields();
    }
    if (isError) {
      Swal.fire({
        title: "Oops!..",
        icon: "error",
        text: `${(error as any)?.data?.message || "something went wrong"}`,
        confirmButtonColor: "#0ABAC3",
      });
    }
  }, [data, isSuccess, isError, form, error]);
  const onCancel = () => {
    setModalOpen(false);
    form.resetFields();
  };
  return (
    <>
      <button onClick={() => setModalOpen(true)} className="btn primary-btn">
        Add Bootcamp
      </button>
      <Modal
        width={800}
        footer={null}
        title="Create New Bootcamp"
        centered
        open={open}
        onCancel={onCancel}
        maskClosable={false}
      >
        <div className="my-5">
          <CourseForm form={form} loading={isLoading} onFinish={onFinish} />
        </div>
      </Modal>
    </>
  );
};

export default AddCourseModal;
