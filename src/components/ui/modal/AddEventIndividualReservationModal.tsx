/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useCreateEventIndividualReservationMutation } from "../../../redux/features/reservation/eventIndividualReservation";
import EventIndividualReservationForm from "../form/EventIndividualReservationForm";

const AddEventIndividualReservationModal = () => {
  const [open, setModalOpen] = useState(false);
  const [form] = useForm();
  const [create, { data, isLoading, isSuccess, isError, error }] =
    useCreateEventIndividualReservationMutation();
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
  const onFinish = (values: any) => {
    create(values);
  };
  return (
    <>
      <button onClick={() => setModalOpen(true)} className="btn primary-btn">
        Add Reservation
      </button>
      <Modal
        width={800}
        footer={null}
        title="Create New Event Individual Reservation"
        centered
        open={open}
        onCancel={() => setModalOpen(false)}
        maskClosable={false}
      >
        <div className="my-5">
          <EventIndividualReservationForm
            form={form}
            onFinish={onFinish}
            loading={isLoading}
          />
        </div>
      </Modal>
    </>
  );
};

export default AddEventIndividualReservationModal;
