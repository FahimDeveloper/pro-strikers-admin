/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { useState } from "react";
import UserForm from "../form/UserForm";
import Swal from "sweetalert2";

const AddUserModal = () => {
  const [open, setModalOpen] = useState(false);
  const onFinish = (values: any) => {
    if (values.password !== values.confirm_password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passoword does not match",
        confirmButtonColor: "#0ABAC3",
      });
    }
    values.date_of_birth = values.date_of_birth.format("YYYY-MM-DD");
    delete values.confirm_password;
    console.log(values);
  };
  return (
    <>
      <button onClick={() => setModalOpen(true)} className="btn primary-btn">
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
          <UserForm onFinish={onFinish} />
        </div>
      </Modal>
    </>
  );
};

export default AddUserModal;
