/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "antd/es/form/Form";
import {
  useCheckGroupAppointmentMutation,
  useCreateAppointmentGroupReservationMutation,
} from "../../../redux/features/reservation/appointmentGroupReservatonApi";
import AppointmentGroupReservationForm from "../form/AppointmentGroupReservationForm";
import dayjs from "dayjs";

const AddGroupAppointmentReservationModal = () => {
  const [open, setModalOpen] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [appointmentData, setAppointmentData] = useState({});
  const [form] = useForm();
  const [checkForm] = useForm();
  const [create, { data, isLoading, isSuccess, isError, error }] =
    useCreateAppointmentGroupReservationMutation();
  const [
    check,
    {
      data: checkData,
      isLoading: checkLoading,
      isSuccess: checkSuccess,
      isError: checkError,
      error: errorDetails,
    },
  ] = useCheckGroupAppointmentMutation();
  const onFinish = (values: any) => {
    values.trainer = checkData?.results.trainer;
    values.appointment_date = appointmentDate;
    values.appointment = checkData?.results._id;
    create(values);
  };
  const onCheckFinish = (values: any) => {
    values.date = dayjs(values.date).format();
    setAppointmentDate(values.date);
    check(values);
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
      checkForm.resetFields();
      setAppointmentDate(null);
      setAppointmentData({});
    }
    if (isError) {
      Swal.fire({
        title: "Oops!..",
        icon: "error",
        text: `${(error as any)?.data?.message || "something went wrong"}`,
        confirmButtonColor: "#0ABAC3",
      });
    }
  }, [isSuccess, isError, form, error]);
  useEffect(() => {
    if (checkSuccess) {
      setAppointmentData(checkData?.results);
      form.setFieldsValue({
        sport: checkData.results.sport,
      });
    }
    if (checkError) {
      Swal.fire({
        title: "Oops!..",
        icon: "error",
        text: `${(errorDetails as any)?.data?.message}`,
        confirmButtonColor: "#0ABAC3",
      });
    }
  }, [checkError, checkSuccess]);
  const onCancel = () => {
    setAppointmentData({});
    form.resetFields();
    checkForm.resetFields();
    setAppointmentDate(null);
    setModalOpen(false);
  };
  return (
    <>
      <button onClick={() => setModalOpen(true)} className="btn primary-btn">
        Add Reservation
      </button>
      <Modal
        width={800}
        footer={null}
        title="Create New Appointment Group Reservation"
        centered
        open={open}
        onCancel={onCancel}
        maskClosable={false}
      >
        <div className="my-5">
          <AppointmentGroupReservationForm
            onCheckFinish={onCheckFinish}
            form={form}
            onFinish={onFinish}
            loading={isLoading || checkLoading}
            checkData={appointmentData}
            checkForm={checkForm}
          />
        </div>
      </Modal>
    </>
  );
};

export default AddGroupAppointmentReservationModal;
