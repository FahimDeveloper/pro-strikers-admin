/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useCreateEventGroupReservationMutation } from "../../../redux/features/reservation/eventGroupReservation";
import GroupEventReservationSteps from "../step/GroupEventReservationSteps";

const AddEventGroupReservationModal = () => {
  const [open, setModalOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [form] = useForm();
  const [create, { data, isLoading, isSuccess, isError, error }] =
    useCreateEventGroupReservationMutation();
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
  const onSubmit = (values: any) => {
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
        title="Create New Event Group Reservation"
        centered
        open={open}
        onCancel={() => setModalOpen(false)}
        maskClosable={false}
      >
        <GroupEventReservationSteps
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

export default AddEventGroupReservationModal;
