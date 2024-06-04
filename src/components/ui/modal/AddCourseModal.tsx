/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { useEffect, useState } from "react";
import CourseForm from "../form/CourseForm";
import { useCreateCourseMutation } from "../../../redux/features/schedule/courseScheduleApi";
import { useForm } from "antd/es/form/Form";
import Swal from "sweetalert2";

const AddCourseModal = () => {
  const [open, setModalOpen] = useState(false);
  const [form] = useForm();
  const [create, { data, isLoading, isSuccess, isError, error }] =
    useCreateCourseMutation();
  const onFinish = (values: any) => {
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
        text: `${(error as any)?.data?.message}`,
        confirmButtonColor: "#0ABAC3",
      });
    }
  }, [data, isSuccess, isError, form, error]);
  const onCancle = () => {
    setModalOpen(false);
    form.resetFields();
  };
  return (
    <>
      <button onClick={() => setModalOpen(true)} className="btn primary-btn">
        Add Course
      </button>
      <Modal
        width={800}
        footer={null}
        title="Create New Course"
        centered
        open={open}
        onCancel={onCancle}
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