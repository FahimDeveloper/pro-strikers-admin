/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "antd/es/form/Form";
import {
  useCheckClassMutation,
  useCreateClassReservationMutation,
} from "../../../redux/features/reservation/classReservation";
import ClassReservationForm from "../form/ClassReservationForm";

const AddClassReservationModal = () => {
  const [open, setModalOpen] = useState(false);
  const [classDate, setClassDate] = useState();
  const [classData, setClassData] = useState({});
  const [form] = useForm();
  const [checkForm] = useForm();
  const [create, { data, isLoading, isSuccess, isError, error }] =
    useCreateClassReservationMutation();
  const [
    check,
    {
      data: checkData,
      isLoading: checkLoading,
      isSuccess: checkSuccess,
      isError: checkError,
      error: errorDetails,
    },
  ] = useCheckClassMutation();
  const onFinish = (values: any) => {
    values.trainer = checkData?.results.trainer;
    values.class_date = classDate;
    values.class = checkData?.results._id;
    create(values);
  };
  const onCheckFinish = (values: any) => {
    setClassDate(values.date);
    check(values);
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
    if (checkSuccess) {
      setClassData(checkData?.results);
      form.setFieldsValue({
        sport: checkData.results.sport,
      });
    }
    if (checkError) {
      Swal.fire({
        title: "Oops!..",
        icon: "error",
        text: `${(errorDetails as any)?.data?.message}`,
        confirmButtonColor: "#0ABAC3",
      });
    }
  }, [isSuccess, isError, form, error, checkError, checkSuccess]);
  const onCancle = () => {
    setClassData({});
    setModalOpen(false);
    form.resetFields();
    checkForm.resetFields();
  };
  return (
    <>
      <button onClick={() => setModalOpen(true)} className="btn primary-btn">
        Add Reservation
      </button>
      <Modal
        width={800}
        footer={null}
        title="Create New Class Reservation"
        centered
        open={open}
        onCancel={onCancle}
        maskClosable={false}
      >
        <div className="my-5">
          <ClassReservationForm
            onCheckFinish={onCheckFinish}
            form={form}
            onFinish={onFinish}
            loading={isLoading || checkLoading}
            checkData={classData}
            checkForm={checkForm}
          />
        </div>
      </Modal>
    </>
  );
};

export default AddClassReservationModal;
