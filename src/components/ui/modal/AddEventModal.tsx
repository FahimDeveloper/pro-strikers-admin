/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { useEffect, useState } from "react";
import EventForm from "../form/EventForm";
import { useCreateEventMutation } from "../../../redux/features/event/eventApi";
import { useForm } from "antd/es/form/Form";
import Swal from "sweetalert2";

const AddEventModal = () => {
  const [open, setModalOpen] = useState(false);
  const [form] = useForm();
  const [create, { data, isLoading, isSuccess, isError, error }] =
    useCreateEventMutation();
  const onFinish = (values: any) => {
    const formData = new FormData();
    formData.append("image", values.image[0].originFileObj);
    delete values.image;
    formData.append("data", JSON.stringify(values));
    create(formData);
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
      <button onClick={() => setModalOpen(true)} className="primary-btn">
        Create Event
      </button>
      <Modal
        width={800}
        footer={null}
        title="Create New Event"
        centered
        open={open}
        onCancel={onCancel}
        maskClosable={false}
      >
        <EventForm form={form} loading={isLoading} onFinish={onFinish} />
      </Modal>
    </>
  );
};

export default AddEventModal;
