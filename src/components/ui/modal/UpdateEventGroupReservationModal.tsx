/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "antd/es/form/Form";
import { CiEdit } from "react-icons/ci";
import { useUpdateEventGroupReservationMutation } from "../../../redux/features/reservation/eventGroupReservation";
import GroupEventReservationSteps from "../step/GroupEventReservationSteps";

const UpdateEventGroupReservationModal = ({ record }: any) => {
  const [open, setModalOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [form] = useForm();
  const [update, { data, isLoading, isSuccess, isError, error }] =
    useUpdateEventGroupReservationMutation();
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
    update({ id: record?._id, payload: values });
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
        title="Update Group Reservation"
        centered
        open={open}
        onCancel={() => setModalOpen(false)}
        maskClosable={false}
      >
        <GroupEventReservationSteps
          current={current}
          setCurrent={setCurrent}
          record={record}
          form={form}
          onSubmit={onSubmit}
          loading={isLoading}
        />
      </Modal>
    </>
  );
};

export default UpdateEventGroupReservationModal;
