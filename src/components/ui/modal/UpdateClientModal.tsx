/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Modal } from "antd";
import { useEffect, useState } from "react";
import UserForm from "../form/ClientForm";
import Swal from "sweetalert2";
import { useUpdateUserMutation } from "../../../redux/features/user/userApi";
import { CiEdit } from "react-icons/ci";

const UpdateClientModal = ({ record }: any) => {
  const [open, setModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [update, { data, isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();
  const onFinish = (values: any) => {
    if (!record?.issue_date && !record?.expiry_date && values.membership) {
      values.status = true;
      const issueDate = new Date();
      values.issue_date = issueDate.toISOString();
      const expiryDate = new Date(issueDate);
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      values.expiry_date = expiryDate.toISOString();
    } else {
      values.status = false;
    }
    const formData = new FormData();
    if (values.image[0].originFileObj) {
      formData.append("image", values.image[0].originFileObj);
      delete values.image;
      formData.append("data", JSON.stringify(values));
      update({ id: record?._id, body: formData });
    } else {
      delete values.image;
      update({ id: record?._id, body: values });
    }
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
  }, [data, isSuccess, form, isError, error]);
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
        title="Update User"
        centered
        open={open}
        onCancel={() => setModalOpen(false)}
        maskClosable={false}
      >
        <div className="my-5">
          <UserForm
            record={record}
            form={form}
            onFinish={onFinish}
            loading={isLoading}
          />
        </div>
      </Modal>
    </>
  );
};

export default UpdateClientModal;
