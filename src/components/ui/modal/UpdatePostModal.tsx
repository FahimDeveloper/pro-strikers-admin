/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import PostForm from "../form/PostForm";
import { useForm } from "antd/es/form/Form";
import Swal from "sweetalert2";
import { useUpdatePostMutation } from "../../../redux/features/post/postApi";
import { CiEdit } from "react-icons/ci";

const UpdatePostModal = ({ record }: any) => {
  const [open, setModalOpen] = useState(false);
  const [form] = useForm();
  const [update, { data, isLoading, isSuccess, isError, error }] =
    useUpdatePostMutation();
  const onFinish = (values: any) => {
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
      form.resetFields();
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
        width={1000}
        footer={null}
        title="Update Post"
        centered
        open={open}
        onCancel={() => setModalOpen(false)}
      >
        <PostForm
          record={record}
          onFinish={onFinish}
          form={form}
          loading={isLoading}
        />
      </Modal>
    </>
  );
};

export default UpdatePostModal;
