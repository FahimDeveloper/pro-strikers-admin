/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal, UploadFile } from "antd";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ProductForm from "../form/ProductForm";
import { useCreateProductMutation } from "../../../redux/features/store/storeApi";

const AddProductModal = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [open, setModalOpen] = useState(false);
  const [create, { data, isLoading, isSuccess, isError, error }] =
    useCreateProductMutation();
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
  }, [data, isSuccess, isError, form, error]);
  const onCancel = () => {
    setModalOpen(false);
    form.resetFields();
  };
  const onFinish = (values: any) => {
    const formData = new FormData();
    if (!values.non_price_variation) {
      delete values.non_price_variations;
      values.non_price_variation = false;
    }
    if (!values.price_variation) {
      delete values.price_variations;
      values.price_variation = false;
    }
    values.images.forEach((image: any) => {
      formData.append("image", image.originFileObj);
    });
    delete values.images;
    formData.append("data", JSON.stringify(values));
    create(formData);
  };
  return (
    <>
      <button onClick={() => setModalOpen(true)} className="btn primary-btn">
        Add Product
      </button>
      <Modal
        width={800}
        footer={null}
        title="Create New Product"
        centered
        open={open}
        onCancel={onCancel}
        maskClosable={false}
      >
        <ProductForm
          fileList={fileList}
          setFileList={setFileList}
          form={form}
          onFinish={onFinish}
          loading={isLoading}
        />
      </Modal>
    </>
  );
};

export default AddProductModal;
