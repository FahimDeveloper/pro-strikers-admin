/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "antd/es/modal/Modal";
import { useEffect, useState } from "react";
import ClassSteps from "../step/ClassSteps";
import { Button, Form } from "antd";
import Swal from "sweetalert2";
import { useUpdateClassMutation } from "../../../redux/features/schedule/classScheduleApi";
import { CiEdit } from "react-icons/ci";
import { californiaTime } from "../../../utils/timeZone";

const UpdateClassModal = ({ record }: any) => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [open, setModalOpen] = useState(false);
  const [update, { data, isLoading, isSuccess, isError, error }] =
    useUpdateClassMutation();
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
  }, [data, isSuccess, isError, form, error]);
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
    update({ id: record?._id, body: values });
  };
  const onCancel = () => {
    setModalOpen(false);
    setCurrent(0);
  };
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
        title="Update Class"
        centered
        open={open}
        onCancel={onCancel}
        maskClosable={false}
      >
        <ClassSteps
          current={current}
          setCurrent={setCurrent}
          record={record}
          form={form}
          onSubmit={onSubmit}
          loading={isLoading}
        />
      </Modal>
    </>
  );
};

export default UpdateClassModal;
