/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import OneOnOneAppointmentSteps from "../step/OneOnOneAppointmentSteps";
import { useCreateOneAppointmentMutation } from "../../../redux/features/schedule/oneAppointmentScheduleApi";

const AddOneOnOneAppointmentModal = () => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [open, setModalOpen] = useState(false);
  const [create, { data, isLoading, isSuccess, isError, error }] =
    useCreateOneAppointmentMutation();
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
      setCurrent(0);
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
    setCurrent(0);
    form.resetFields();
  };
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
        onCancel={onCancel}
        maskClosable={false}
      >
        <OneOnOneAppointmentSteps
          current={current}
          setCurrent={setCurrent}
          form={form}
          onSubmit={onSubmit}
          loading={isLoading}
        />
      </Modal>
    </>
  );
};

export default AddOneOnOneAppointmentModal;
