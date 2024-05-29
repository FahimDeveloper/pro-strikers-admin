/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Modal } from "antd";
import { useEffect, useState } from "react";
import UserForm from "../form/UserForm";
import Swal from "sweetalert2";
import { useUpdateUserMutation } from "../../../redux/features/user/userApi";
import { CiEdit } from "react-icons/ci";

const UpdateUserModal = ({ record }: any) => {
  const [open, setModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [update, { data, isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();
  const onFinish = (values: any) => {
    if (values.password !== values.confirm_password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passoword does not match",
        confirmButtonColor: "#0ABAC3",
      });
    }
    delete values.confirm_password;
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
      form.resetFields();
      setModalOpen(false);
    }
    if (isError) {
      Swal.fire({
        title: "Oops!..",
        icon: "error",
        text: `${(error as any)?.data?.message}`,
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

export default UpdateUserModal;
