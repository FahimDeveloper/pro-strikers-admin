/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Modal } from "antd";
import BrandForm from "../form/BrandForm";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useUpdateBrandMutation } from "../../../redux/features/brand/brandApi";
import { IBrand } from "../../../types/brand.types";
import { CiEdit } from "react-icons/ci";

const UpdateBrandModal = ({ record }: { record: IBrand }) => {
  const [form] = Form.useForm();
  const [open, setModalOpen] = useState(false);
  const [update, { data, isLoading, isSuccess, isError, error }] =
    useUpdateBrandMutation();
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
    if (values.brand_logo[0].originFileObj) {
      formData.append("image", values.brand_logo[0].originFileObj);
      delete values.brand_logo;
      formData.append("data", JSON.stringify(values));
      update({ id: record?._id, body: formData });
    } else {
      delete values.brand_logo;
      update({ id: record?._id, body: values });
    }
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
        title="Update Brand"
        centered
        open={open}
        onCancel={onCancel}
        maskClosable={false}
      >
        <BrandForm
          form={form}
          onFinish={onFinish}
          loading={isLoading}
          record={record}
        />
      </Modal>
    </>
  );
};

export default UpdateBrandModal;
