/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import { useEffect, useState } from "react";
import FacilitySteps from "../step/FacilitySteps";
import Swal from "sweetalert2";
import { useCreateFacilityMutation } from "../../../redux/features/schedule/facilityScheduleApi";

const AddFacilityModal = () => {
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
  const onSubmit = (values: any) => {
    create(values);
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
        onCancel={() => setModalOpen(false)}
      >
        <FacilitySteps form={form} onSubmit={onSubmit} loading={isLoading} />
      </Modal>
    </>
  );
};

export default AddFacilityModal;
