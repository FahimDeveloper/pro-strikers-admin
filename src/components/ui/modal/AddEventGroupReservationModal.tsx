/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useCreateEventGroupReservationMutation } from "../../../redux/features/reservation/eventGroupReservation";
import GroupEventReservationSteps from "../step/GroupEventReservationSteps";
import { useGetEventByIdMutation } from "../../../redux/features/event/eventApi";

const AddEventGroupReservationModal = () => {
  const [open, setModalOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [form] = useForm();
  const [eventData, setEventData] = useState({});
  const [checkForm] = useForm();
  const [create, { data, isLoading, isSuccess, isError, error }] =
    useCreateEventGroupReservationMutation();
  const [eventId, setEventId] = useState("");
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
      form.resetFields();
      checkForm.resetFields();
      setCurrent(0);
      setEventId("");
      setEventData({});
      setModalOpen(false);
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
      setEventData(event?.results);
      form.setFieldsValue({
        sport: event?.results?.sport,
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
  }, [isCheckError, checkSuccess, checkError]);
  const onSubmit = (values: any) => {
    values.event = eventId;
    create(values);
  };
  const onCheckFinish = (values: any) => {
    setEventId(values.id);
    values.event_type = "group";
    checkEvent(values);
  };
  const onCancel = () => {
    setModalOpen(false);
    form.resetFields();
    checkForm.resetFields();
    setCurrent(0);
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
        title="Create New Event Group Reservation"
        centered
        open={open}
        onCancel={onCancel}
        maskClosable={false}
      >
        <GroupEventReservationSteps
          current={current}
          setCurrent={setCurrent}
          form={form}
          onSubmit={onSubmit}
          loading={isLoading || checkLoading}
          onCheckFinish={onCheckFinish}
          checkForm={checkForm}
          eventData={eventData}
        />
      </Modal>
    </>
  );
};

export default AddEventGroupReservationModal;
