/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import VoucherForm from "../form/VoucherForm";
import Swal from "sweetalert2";
import { useUpdateVoucherMutation } from "../../../redux/features/voucher/voucherApi";
import { useForm } from "antd/es/form/Form";
import { CiEdit } from "react-icons/ci";

const UpdateVoucherModal = ({ record }: any) => {
  const [open, setModalOpen] = useState(false);
  const [form] = useForm();
  const [update, { data, isLoading, isSuccess, isError, error }] =
    useUpdateVoucherMutation();
  const onFinish = (values: any) => {
    values.voucher_code = values.voucher_code.toUpperCase();
    update({ id: record?._id, body: values });
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
        title="Update Voucher"
        centered
        open={open}
        onCancel={() => setModalOpen(false)}
        maskClosable={false}
      >
        <VoucherForm
          record={record}
          form={form}
          loading={isLoading}
          onFinish={onFinish}
        />
      </Modal>
    </>
  );
};

export default UpdateVoucherModal;
