/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "antd/es/form/Form";
import { useCreateAppointmentOneOnOneReservationMutation } from "../../../redux/features/reservation/appointmentOneOnOneReservatonApi";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import OneOnOneApppointmentReservationForm from "../form/OneOnOneApppointmentReservationForm";
import { useGetOneAppointmentMutation } from "../../../redux/features/schedule/oneAppointmentScheduleApi";

const AddOneOnOneAppointmentReservationModal = () => {
  const [open, setModalOpen] = useState(false);
  const [appointmentId, setAppointmentId] = useState("");
  const user = useSelector(selectCurrentUser);
  const [form] = useForm();
  const [checkForm] = useForm();
  const [selectSlots, setSelectSlots] = useState<any>([]);
  const [data, setData] = useState(null);
  const [
    getData,
    {
      data: appointment,
      isSuccess: querySuccess,
      isLoading: queryLoading,
      isError: queryError,
      error: queryErrorDetails,
    },
  ] = useGetOneAppointmentMutation();
  const [
    create,
    { data: createData, isLoading, isSuccess: createSuccess, isError, error },
  ] = useCreateAppointmentOneOnOneReservationMutation();

  const onFinish = (values: any) => {
    values.trainer = appointment?.results.trainer;
    values.appointment = appointmentId;
    const bookings: any = [];
    selectSlots?.forEach((dateSlots: any) =>
      dateSlots.slots.forEach((slot: string) =>
        bookings.push({
          date: dateSlots.date.toISOString().split("T")[0],
          time_slot: slot,
          training: appointmentId,
        })
      )
    );
    values.bookings = bookings;
    create({ id: user?._id, payload: values });
  };
  useEffect(() => {
    if (createSuccess) {
      Swal.fire({
        title: "Success",
        icon: "success",
        text: `${createData?.message}`,
        showConfirmButton: false,
        timer: 1500,
        iconColor: "#0ABAC3",
      });
      setData(null);
      setSelectSlots([]);
      form.resetFields();
      checkForm.resetFields();
      setModalOpen(false);
    }
    if (querySuccess) {
      setData(appointment);
      form.setFieldsValue({
        sport: appointment?.results.sport,
      });
    }
    if (isError) {
      Swal.fire({
        title: "Oops!..",
        icon: "error",
        text: `${(error as any)?.data?.message || "something went wrong"}`,
        confirmButtonColor: "#0ABAC3",
      });
    }
    if (queryError) {
      Swal.fire({
        title: "Oops!..",
        icon: "error",
        text: `${(queryErrorDetails as any)?.data?.message}`,
        confirmButtonColor: "#0ABAC3",
      });
    }
  }, [isError, createSuccess, queryError, querySuccess]);

  const onCheckFinish = (values: any) => {
    setAppointmentId(values.id);
    getData(values.id);
  };

  const onCancel = () => {
    form.resetFields();
    checkForm.resetFields();
    setData(null);
    setSelectSlots([]);
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
        title="Create New Appointment One On One Reservation"
        centered
        open={open}
        onCancel={onCancel}
        maskClosable={false}
      >
        <div className="my-5">
          <OneOnOneApppointmentReservationForm
            form={form}
            onFinish={onFinish}
            loading={isLoading || queryLoading}
            appointmentId={appointmentId}
            checkForm={checkForm}
            data={data}
            onCheckFinish={onCheckFinish}
            selectSlots={selectSlots}
            setSelectSlots={setSelectSlots}
          />
        </div>
      </Modal>
    </>
  );
};

export default AddOneOnOneAppointmentReservationModal;
