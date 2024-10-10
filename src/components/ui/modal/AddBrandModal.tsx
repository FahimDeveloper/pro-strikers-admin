/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import { useEffect, useState } from "react";
import { useCreateBrandMutation } from "../../../redux/features/brand/brandApi";
import Swal from "sweetalert2";
import BrandForm from "../form/BrandForm";

const AddBrandModal = () => {
  const [form] = Form.useForm();
  const [open, setModalOpen] = useState(false);
  const [create, { data, isLoading, isSuccess, isError, error }] =
    useCreateBrandMutation();
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

  const onCancel = () => {
    setModalOpen(false);
    form.resetFields();
  };
  const onFinish = (values: any) => {
    const formData = new FormData();
    formData.append("image", values.brand_logo[0].originFileObj);
    delete values.brand_logo;
    formData.append("data", JSON.stringify(values));
    create(formData);
  };
  return (
    <>
      <button onClick={() => setModalOpen(true)} className="btn primary-btn">
        Add Brand
      </button>
      <Modal
        width={800}
        footer={null}
        title="Create New Brand"
        centered
        open={open}
        onCancel={onCancel}
        maskClosable={false}
      >
        <BrandForm form={form} onFinish={onFinish} loading={isLoading} />
      </Modal>
    </>
  );
};

export default AddBrandModal;
