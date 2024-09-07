/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { useEffect, useState } from "react";
import VoucherForm from "../form/VoucherForm";
import Swal from "sweetalert2";
import { useCreateVoucherMutation } from "../../../redux/features/voucher/voucherApi";
import { useForm } from "antd/es/form/Form";

const AddVoucherModal = () => {
  const [open, setModalOpen] = useState(false);
  const [form] = useForm();
  const [create, { data, isLoading, isSuccess, isError, error }] =
    useCreateVoucherMutation();
  const onFinish = (values: any) => {
    values.voucher_code = values.voucher_code.toUpperCase();
    values.used = 0;
    create(values);
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
  const onCancle = () => {
    setModalOpen(false);
    form.resetFields();
  };
  return (
    <>
      <button onClick={() => setModalOpen(true)} className="primary-btn">
        Create Voucher
      </button>
      <Modal
        width={800}
        footer={null}
        title="Create New Voucher"
        centered
        open={open}
        onCancel={onCancle}
        maskClosable={false}
      >
        <VoucherForm form={form} loading={isLoading} onFinish={onFinish} />
      </Modal>
    </>
  );
};

export default AddVoucherModal;
