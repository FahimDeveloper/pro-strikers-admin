/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useCreatePaymentMutation } from "../../../redux/features/payment/paymentApi";
import Swal from "sweetalert2";
import { Modal } from "antd";
import PaymentForm from "../form/PaymentForm";

const AddPaymentModal = () => {
  const [open, setModalOpen] = useState(false);
  const [form] = useForm();
  const [create, { data, isLoading, isSuccess, isError, error }] =
    useCreatePaymentMutation();
  const onFinish = (values: any) => {
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
  }, [data, isSuccess, isError, form, error]);
  const onCancle = () => {
    setModalOpen(false);
    form.resetFields();
  };
  return (
    <>
      <button onClick={() => setModalOpen(true)} className="btn primary-btn">
        Add Payment
      </button>
      <Modal
        width={800}
        footer={null}
        title="Create New Payment"
        centered
        open={open}
        onCancel={onCancle}
        maskClosable={false}
      >
        <div className="my-5">
          <PaymentForm form={form} onFinish={onFinish} loading={isLoading} />
        </div>
      </Modal>
    </>
  );
};

export default AddPaymentModal;
