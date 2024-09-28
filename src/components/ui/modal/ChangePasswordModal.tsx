/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { useChangePasswordMutation } from "../../../redux/features/auth/authApi";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import PasswordForm from "../form/PasswordForm";

const ChangePasswordModal = () => {
  const [open, setModalOpen] = useState(false);
  const [form] = useForm();
  const user = useSelector(selectCurrentUser);
  const [change, { data, isLoading, isError, isSuccess, error }] =
    useChangePasswordMutation();
  const onFinish = (values: any) => {
    if (values.new_password !== values.confirm_password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "New password and confirm password are not the same",
        confirmButtonColor: "#0ABAC3",
      });
    } else {
      delete values.confirm_password;
      change({ id: user?._id, payload: values });
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
  }, [data, isSuccess, form, isError, error]);
  return (
    <>
      <Button type="default" onClick={() => setModalOpen(true)}>
        Change Password <CiEdit />
      </Button>
      <Modal
        width={600}
        footer={null}
        title="Update Password"
        centered
        open={open}
        onCancel={() => setModalOpen(false)}
        maskClosable={false}
      >
        <div className="my-5">
          <PasswordForm form={form} onFinish={onFinish} loading={isLoading} />
        </div>
      </Modal>
    </>
  );
};

export default ChangePasswordModal;
