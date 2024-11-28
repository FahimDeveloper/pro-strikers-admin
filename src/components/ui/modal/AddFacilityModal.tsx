/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import { useEffect, useState } from "react";
import FacilitySteps from "../step/FacilitySteps";
import Swal from "sweetalert2";
import { useCreateFacilityMutation } from "../../../redux/features/schedule/facilityScheduleApi";
import { californiaTime } from "../../../utils/timeZone";

const AddFacilityModal = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [open, setModalOpen] = useState(false);
  const [create, { data, isLoading, isSuccess, isError, error }] =
    useCreateFacilityMutation();
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
  }, [data, isSuccess, isError, form, error]);
  const onSubmit = (values: any) => {
    values.schedules = values.schedules.map((schedule: any) => {
      return {
        ...schedule,
        start_time: californiaTime(schedule.start_time.toISOString()),
        end_time: californiaTime(schedule.end_time.toISOString()),
      };
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
      <button onClick={() => setModalOpen(true)} className="primary-btn">
        Create Facility
      </button>
      <Modal
        width={800}
        footer={null}
        title="Create New Facility"
        centered
        open={open}
        onCancel={onCancel}
        maskClosable={false}
      >
        <FacilitySteps
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

export default AddFacilityModal;
