/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { useState } from "react";
import Swal from "sweetalert2";
import AdminForm from "../form/AdminForm";

const AddAdminModal = () => {
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
        Add Member
      </button>
      <Modal
        width={800}
        footer={null}
        title="Create New Admin"
        centered
        open={open}
        onCancel={() => setModalOpen(false)}
      >
        <div className="my-5">
          <AdminForm onFinish={onFinish} />
        </div>
      </Modal>
    </>
  );
};

export default AddAdminModal;
