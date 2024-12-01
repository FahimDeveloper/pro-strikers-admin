/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import { useEffect, useState } from "react";
import ClassSteps from "../step/ClassSteps";
import { useCreateClassMutation } from "../../../redux/features/schedule/classScheduleApi";
import Swal from "sweetalert2";
import { californiaTime } from "../../../utils/timeZone";

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
        text: `${(error as any)?.data?.message || "something went wrong"}`,
        confirmButtonColor: "#0ABAC3",
      });
    }
  }, [data, isSuccess, isError, form, error, setModalOpen]);
  const onSubmit = (values: any) => {
    values.schedules = values.schedules.map((schedule: any) => {
      if (schedule?.start_time && schedule?.end_time) {
        return {
          ...schedule,
          start_time: californiaTime(schedule?.start_time?.toISOString()),
          end_time: californiaTime(schedule?.end_time?.toISOString()),
        };
      }
      return schedule;
    });
    create(values);
  };
  const onCancel = () => {
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
        onCancel={onCancel}
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
