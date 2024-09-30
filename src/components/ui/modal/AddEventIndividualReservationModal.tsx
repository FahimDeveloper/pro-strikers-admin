/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useCreateEventIndividualReservationMutation } from "../../../redux/features/reservation/eventIndividualReservation";
import EventIndividualReservationForm from "../form/EventIndividualReservationForm";
import { useGetEventByIdMutation } from "../../../redux/features/event/eventApi";

const AddEventIndividualReservationModal = () => {
  const [open, setModalOpen] = useState(false);
  const [form] = useForm();
  const [eventData, setEventData] = useState({});
  const [checkForm] = useForm();
  const [eventId, setEventId] = useState("");
  const [create, { data, isLoading, isSuccess, isError, error }] =
    useCreateEventIndividualReservationMutation();
  const [
    checkEvent,
    {
      data: event,
      isLoading: checkLoading,
      isSuccess: checkSuccess,
      isError: isCheckError,
      error: checkError,
    },
  ] = useGetEventByIdMutation();
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
      setEventId("");
      setEventData({});
    }
    if (isError) {
      Swal.fire({
        title: "Oops!..",
        icon: "error",
        text: `${(error as any)?.data?.message || "something went wrong"}`,
        confirmButtonColor: "#0ABAC3",
      });
    }
    if (checkSuccess) {
      setEventData(event?.results);
      form.setFieldsValue({
        sport: event.results.sport,
      });
    }
    if (isCheckError) {
      setEventData({});
      Swal.fire({
        title: "Oops!..",
        icon: "error",
        text: `${(checkError as any)?.data?.message}`,
        confirmButtonColor: "#0ABAC3",
      });
    }
  }, [
    data,
    isSuccess,
    isError,
    form,
    error,
    isCheckError,
    checkSuccess,
    checkError,
  ]);
  const onFinish = (values: any) => {
    values.event = eventId;
    create(values);
  };
  const onCheckFinish = (values: any) => {
    setEventId(values.id);
    values.event_type = "individual";
    checkEvent(values);
  };
  const onCancel = () => {
    setModalOpen(false);
    form.resetFields();
    checkForm.resetFields();
    setEventId("");
    setEventData({});
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
        onCancel={onCancel}
        maskClosable={false}
      >
        <div className="my-5">
          <EventIndividualReservationForm
            form={form}
            onFinish={onFinish}
            loading={isLoading || checkLoading}
            eventData={eventData}
            onCheckFinish={onCheckFinish}
            checkForm={checkForm}
          />
        </div>
      </Modal>
    </>
  );
};

export default AddEventIndividualReservationModal;
