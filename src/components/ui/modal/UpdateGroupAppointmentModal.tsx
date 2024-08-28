/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Modal } from "antd";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { CiEdit } from "react-icons/ci";
import { useUpdateGroupAppointmentMutation } from "../../../redux/features/schedule/groupAppointmentScheduleApi";
import GroupAppointmentSteps from "../step/GroupAppointmentSteps";

const UpdateGroupAppointmentModal = ({ record }: any) => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [open, setModalOpen] = useState(false);
  const [update, { data, isLoading, isSuccess, isError, error }] =
    useUpdateGroupAppointmentMutation();
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
        text: `${(error as any)?.data?.message}`,
        confirmButtonColor: "#0ABAC3",
      });
    }
  }, [data, isSuccess, isError, form, error]);
  const onSubmit = (values: any) => {
    update({ id: record?._id, body: values });
  };
  const onCancle = () => {
    setModalOpen(false);
    setCurrent(0);
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
        maskClosable={false}
        footer={null}
        title="Update Appointment"
        centered
        open={open}
        onCancel={onCancle}
      >
        <GroupAppointmentSteps
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

export default UpdateGroupAppointmentModal;
