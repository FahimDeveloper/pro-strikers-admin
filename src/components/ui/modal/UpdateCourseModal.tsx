/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal } from "antd";
import CourseForm from "../form/CourseForm";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { useUpdateCourseMutation } from "../../../redux/features/schedule/courseScheduleApi";
import { CiEdit } from "react-icons/ci";

const UpdateCourseModal = ({ record }: any) => {
  const [open, setModalOpen] = useState(false);
  const [form] = useForm();
  const [update, { data, isLoading, isSuccess, isError, error }] =
    useUpdateCourseMutation();
  const onFinish = (values: any) => {
    update({ id: record?._id, body: values });
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
  return (
    <>
      <Button
        type="primary"
        onClick={() => setModalOpen(true)}
        className="w-full flex gap-1 justify-center items-center"
      >
        <CiEdit className="size-5 text-white" /> Update
      </Button>
      <Modal
        width={800}
        footer={null}
        title="Update Course"
        centered
        open={open}
        onCancel={() => setModalOpen(false)}
      >
        <div className="my-5">
          <CourseForm
            record={record}
            form={form}
            loading={isLoading}
            onFinish={onFinish}
          />
        </div>
      </Modal>
    </>
  );
};

export default UpdateCourseModal;
