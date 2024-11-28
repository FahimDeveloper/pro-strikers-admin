/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Modal } from "antd";
import { useEffect, useState } from "react";
import FacilitySteps from "../step/FacilitySteps";
import { useUpdateFacilityMutation } from "../../../redux/features/schedule/facilityScheduleApi";
import Swal from "sweetalert2";
import { CiEdit } from "react-icons/ci";
import { californiaTime } from "../../../utils/timeZone";

const UpdateFacilityModal = ({ record }: any) => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [open, setModalOpen] = useState(false);
  const [update, { data, isLoading, isSuccess, isError, error }] =
    useUpdateFacilityMutation();
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
      return {
        ...schedule,
        start_time: californiaTime(schedule.start_time.toISOString()),
        end_time: californiaTime(schedule.end_time.toISOString()),
      };
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
        maskClosable={false}
        width={800}
        footer={null}
        title="Update Facility"
        centered
        open={open}
        onCancel={onCancel}
      >
        <FacilitySteps
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

export default UpdateFacilityModal;
