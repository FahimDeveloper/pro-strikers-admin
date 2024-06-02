/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import { useEffect, useState } from "react";
import ClassSteps from "../step/ClassSteps";
import { useCreateClassMutation } from "../../../redux/features/schedule/classScheduleApi";
import Swal from "sweetalert2";

const AddClassesModal = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [open, setModalOpen] = useState(false);
  const [create, { data, isLoading, isSuccess, isError, error }] =
    useCreateClassMutation();
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
      setCurrent(0);
    }
    if (isError) {
      Swal.fire({
        title: "Oops!..",
        icon: "error",
        text: `${(error as any)?.data?.message}`,
        confirmButtonColor: "#0ABAC3",
      });
    }
  }, [data, isSuccess, isError, form, error, setModalOpen]);
  const onSubmit = (values: any) => {
    create(values);
  };
  const onCancle = () => {
    setModalOpen(false);
    setCurrent(0);
    form.resetFields();
  };
  return (
    <>
      <button onClick={() => setModalOpen(true)} className="btn primary-btn">
        Create Class
      </button>
      <Modal
        width={800}
        footer={null}
        title="Create New Class"
        centered
        open={open}
        onCancel={onCancle}
        maskClosable={false}
      >
        <ClassSteps
          current={current}
          setCurrent={setCurrent}
          form={form}
          onSubmit={onSubmit}
          loading={isLoading}
        />
      </Modal>
    </>
  );
};

export default AddClassesModal;
