/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import { useEffect, useState } from "react";
import UserForm from "../form/UserForm";
import Swal from "sweetalert2";
import { useCreateUserMutation } from "../../../redux/features/user/userApi";

const AddUserModal = () => {
  const [open, setModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [create, { data, isLoading, isSuccess, isError, error }] =
    useCreateUserMutation();
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
      <button onClick={() => setModalOpen(true)} className="primary-btn">
        Add User
      </button>
      <Modal
        width={800}
        footer={null}
        title="Create New User"
        centered
        open={open}
        onCancel={() => setModalOpen(false)}
      >
        <div className="my-5">
          <UserForm form={form} onFinish={onFinish} loading={isLoading} />
        </div>
      </Modal>
    </>
  );
};

export default AddUserModal;
