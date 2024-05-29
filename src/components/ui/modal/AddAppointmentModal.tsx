/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import { useEffect, useState } from "react";
import AppointmentSteps from "../step/AppointmentSteps";
import { useCreateAppointmentMutation } from "../../../redux/features/schedule/appointmentScheduleApi";
import Swal from "sweetalert2";

const AddAppointmentModal = () => {
  const [form] = Form.useForm();
  const [open, setModalOpen] = useState(false);
  const [create, { data, isLoading, isSuccess, isError, error }] =
    useCreateAppointmentMutation();
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
      form.resetFields();
      setModalOpen(false);
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
  const onSubmit = (values: any) => {
    create(values);
  };
  return (
    <>
      <button onClick={() => setModalOpen(true)} className="btn primary-btn">
        Create Appointment
      </button>
      <Modal
        width={800}
        footer={null}
        title="Create New Appointment"
        centered
        open={open}
        onCancel={() => setModalOpen(false)}
      >
        <AppointmentSteps form={form} onSubmit={onSubmit} loading={isLoading} />
      </Modal>
    </>
  );
};

export default AddAppointmentModal;
