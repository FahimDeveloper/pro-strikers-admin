/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import EventForm from "../form/EventForm";
import { useUpdateEventMutation } from "../../../redux/features/event/eventApi";
import { useForm } from "antd/es/form/Form";
import Swal from "sweetalert2";
import { CiEdit } from "react-icons/ci";

const UpdateEventModal = ({ record }: any) => {
  const [open, setModalOpen] = useState(false);
  const [form] = useForm();
  const [update, { data, isLoading, isSuccess, isError, error }] =
    useUpdateEventMutation();
  const onFinish = (values: any) => {
    const formData = new FormData();
    if (values.image[0].originFileObj) {
      formData.append("image", values.image[0].originFileObj);
      delete values.image;
      formData.append("data", JSON.stringify(values));
      update({ id: record?._id, body: formData });
    } else {
      delete values.image;
      update({ id: record?._id, body: values });
    }
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
    }
    if (isError) {
      Swal.fire({
        title: "Oops!..",
        icon: "error",
        text: `${(error as any)?.data?.message || "something went wrong"}`,
        confirmButtonColor: "#0ABAC3",
      });
    }
  }, [data, isSuccess, isError, form, error, setModalOpen]);
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
        maskClosable={false}
        footer={null}
        title="Update Event"
        centered
        open={open}
        onCancel={() => setModalOpen(false)}
      >
        <EventForm
          record={record}
          form={form}
          loading={isLoading}
          onFinish={onFinish}
        />
      </Modal>
    </>
  );
};

export default UpdateEventModal;
