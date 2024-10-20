/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useUpdateMembershipCancellationMutation } from "../../../redux/features/cancellation/cancellationApi";
import Swal from "sweetalert2";
import { Button, Modal } from "antd";
import { CiEdit } from "react-icons/ci";
import CancellationStatusChangeForm from "../form/CancellationStatusChangeForm";

const MembershipCancellationStatusModal = ({ record }: { record: any }) => {
  const [open, setModalOpen] = useState(false);
  const [form] = useForm();
  const [update, { data, isLoading, isSuccess, isError, error }] =
    useUpdateMembershipCancellationMutation();
  const onFinish = (values: any) => {
    update({ id: record?._id, payload: values });
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
      form.resetFields();
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
  }, [data, isSuccess, isError, form, error, setModalOpen]);
  const onCancel = () => {
    setModalOpen(false);
    form.resetFields();
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
        width={400}
        footer={null}
        title="Update cancellation status"
        centered
        open={open}
        onCancel={onCancel}
        maskClosable={false}
      >
        <CancellationStatusChangeForm
          form={form}
          loading={isLoading}
          onFinish={onFinish}
          status={record?.status}
        />
      </Modal>
    </>
  );
};

export default MembershipCancellationStatusModal;
