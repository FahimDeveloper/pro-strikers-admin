/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "antd/es/form/Form";
import GroupAppointmentReservationForm from "../form/GroupAppointmentReservationForm";
import { useCreateAppointmentGroupReservationMutation } from "../../../redux/features/reservation/appointmentGroupReservatonApi";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { useAppointmentQuery } from "../../../redux/features/schedule/appointmentScheduleApi";

const AddGroupAppointmentReservationModal = () => {
  const [open, setModalOpen] = useState(false);
  const [appointmentId, setAppointmentId] = useState("");
  const [skip, setSkip] = useState(true);
  const user = useSelector(selectCurrentUser);
  const [form] = useForm();
  const [current, setCurrent] = useState(0);
  const {
    data: appointment,
    isSuccess: querySuccess,
    isLoading: queryLoading,
    isError: queryError,
    error: queryErrorDetails,
  } = useAppointmentQuery(appointmentId, {
    skip,
  });
  const [selectSlots, setSelectSlots] = useState<any[]>([]);
  const [
    create,
    { data: createData, isLoading, isSuccess: createSuccess, isError, error },
  ] = useCreateAppointmentGroupReservationMutation();
  const onSubmit = (values: any) => {
    values.trainer = appointment?.results.trainer;
    values.appointment = appointmentId;
    const bookings: any = [];
    selectSlots?.forEach((dateSlots) =>
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
      setModalOpen(false);
      setSelectSlots([]);
      form.resetFields();
      setCurrent(0);
    }
    if (isError) {
      Swal.fire({
        title: "Oops!..",
        icon: "error",
        text: `${(error as any)?.data?.message}`,
        confirmButtonColor: "#0ABAC3",
      });
    }
  }, [isError, error, createSuccess]);

  useEffect(() => {
    if (queryError) {
      setSkip(true);
      Swal.fire({
        title: "Oops!..",
        icon: "error",
        text: `${(queryErrorDetails as any)?.data?.message}`,
        confirmButtonColor: "#0ABAC3",
      });
    }
    if (querySuccess) {
      setSkip(false);
      form.setFieldsValue({
        sport: appointment?.results.sport,
      });
    }
  }, [queryError, querySuccess]);

  const onCancle = () => {
    setModalOpen(false);
    form.resetFields();
    setCurrent(0);
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
        onCancel={onCancle}
        maskClosable={false}
      >
        <div className="my-5">
          <GroupAppointmentReservationForm
            form={form}
            onSubmit={onSubmit}
            loading={isLoading || queryLoading}
            current={current}
            setCurrent={setCurrent}
            isSuccess={createSuccess}
            selectSlots={selectSlots}
            setSelectSlots={setSelectSlots}
            data={appointment}
            appointmentId={appointmentId}
            setAppointmentId={setAppointmentId}
            setSkip={setSkip}
            skip={skip}
          />
        </div>
      </Modal>
    </>
  );
};

export default AddGroupAppointmentReservationModal;
