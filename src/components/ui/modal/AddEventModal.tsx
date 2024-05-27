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
    values.start_date = values.start_date.format("DD/MM/YYYY");
    values.end_date = values.end_date.format("DD/MM/YYYY");
    values.registration_open = values.registration_open.format("DD/MM/YYYY");
    values.registration_close = values.registration_close.format("DD/MM/YYYY");
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
  }, [data, isSuccess, isError, form, error, setModalOpen]);
  return (
    <>
      <button onClick={() => setModalOpen(true)} className="btn primary-btn">
        Create Event
      </button>
      <Modal
        width={800}
        footer={null}
        title="Create New Voucher"
        centered
        open={open}
        onCancel={() => setModalOpen(false)}
      >
        <EventForm form={form} loading={isLoading} onFinish={onFinish} />
      </Modal>
    </>
  );
};

export default AddEventModal;
