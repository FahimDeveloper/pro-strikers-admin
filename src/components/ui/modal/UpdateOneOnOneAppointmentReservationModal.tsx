/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "antd/es/form/Form";
import { CiEdit } from "react-icons/ci";
import { useUpdateAppointmentOneOnOneReservationMutation } from "../../../redux/features/reservation/appointmentOneOnOneReservatonApi";
import OneOnOneAppointmentReservationDetailsForm from "../form/OneOnOneAppointmentReservationDetailsForm";

const UpdateOneOnOneAppointmentReservationModal = ({ record }: any) => {
  const [open, setModalOpen] = useState(false);
  const [form] = useForm();
  const [update, { data, isLoading, isSuccess, isError, error }] =
    useUpdateAppointmentOneOnOneReservationMutation();
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
        text: `${(error as any)?.data?.message || "something went wrong"}`,
        confirmButtonColor: "#0ABAC3",
      });
    }
  }, [data, isSuccess, isError, form, error]);
  const onCancel = () => {
    setModalOpen(false);
  };
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
        title="Update Appointment One On One Reservation"
        centered
        open={open}
        onCancel={onCancel}
        maskClosable={false}
      >
        <div className="my-5">
          <OneOnOneAppointmentReservationDetailsForm
            record={record}
            form={form}
            onFinish={onFinish}
            loading={isLoading}
          />
        </div>
      </Modal>
    </>
  );
};

export default UpdateOneOnOneAppointmentReservationModal;
