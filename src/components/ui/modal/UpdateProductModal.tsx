/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Modal, UploadFile } from "antd";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ProductForm from "../form/ProductForm";
import { useUpdateProductMutation } from "../../../redux/features/product/productApi";
import { CiEdit } from "react-icons/ci";

const UpdateProductModal = ({ record }: any) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();
  const [open, setModalOpen] = useState(false);
  const [update, { data, isLoading, isSuccess, isError, error }] =
    useUpdateProductMutation();
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
  const onFinish = (values: any) => {
    const formData = new FormData();
    const oldImages: any = [];
    const newImages: any = [];
    if (!values.non_price_variation) {
      delete values.non_price_variations;
      values.non_price_variation = false;
    }
    if (!values.price_variation) {
      delete values.price_variations;
      values.price_variation = false;
    }
    values.images.forEach((image: any) => {
      if (image?.originFileObj) {
        newImages.push(image.originFileObj);
      }
      if (image?.url) {
        oldImages.push(image.url);
      }
    });
    if (newImages.length > 0) {
      newImages.map((image: any) => {
        formData.append("image", image);
      });
      values.images = oldImages;
      formData.append("data", JSON.stringify(values));
      update({ id: record?._id, body: formData });
    } else {
      values.images = oldImages;
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
        title="Update Product"
        centered
        open={open}
        onCancel={() => setModalOpen(false)}
        maskClosable={false}
      >
        <ProductForm
          fileList={fileList}
          setFileList={setFileList}
          record={record}
          form={form}
          onFinish={onFinish}
          loading={isLoading}
        />
      </Modal>
    </>
  );
};

export default UpdateProductModal;
