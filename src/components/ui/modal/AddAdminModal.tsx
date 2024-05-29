/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AdminForm from "../form/AdminForm";
import { useCreateAdminMutation } from "../../../redux/features/admin/adminApi";
import { useForm } from "antd/es/form/Form";

const AddAdminModal = () => {
  const [open, setModalOpen] = useState(false);
  const [form] = useForm();
  const [create, { data, isLoading, isSuccess, isError, error }] =
    useCreateAdminMutation();
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
      <button onClick={() => setModalOpen(true)} className="btn primary-btn">
        Add Member
      </button>
      <Modal
        width={800}
        footer={null}
        title="Create New Member"
        centered
        open={open}
        onCancel={() => setModalOpen(false)}
      >
        <div className="my-5">
          <AdminForm form={form} onFinish={onFinish} loading={isLoading} />
        </div>
      </Modal>
    </>
  );
};

export default AddAdminModal;
