/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import LaneForm from "../form/LaneForm";
import { useCreateLaneMutation } from "../../../redux/features/Lane/laneApi";

const AddLaneModal = () => {
  const [form] = Form.useForm();
  const [open, setModalOpen] = useState(false);
  const [create, { data, isLoading, isSuccess, isError, error }] =
    useCreateLaneMutation();
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
  const onFinish = (values: any) => {
    create(values);
  };
  return (
    <>
      <button onClick={() => setModalOpen(true)} className="btn primary-btn">
        Add Lane
      </button>
      <Modal
        width={800}
        footer={null}
        title="Create New Lane"
        centered
        open={open}
        onCancel={onCancle}
        maskClosable={false}
      >
        <LaneForm form={form} onFinish={onFinish} loading={isLoading} />
      </Modal>
    </>
  );
};

export default AddLaneModal;
