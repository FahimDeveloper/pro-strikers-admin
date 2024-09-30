/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "antd/es/form/Form";
import CourseReservationForm from "../form/CourseReservationForm";
import { useCreateCourseReservationMutation } from "../../../redux/features/reservation/coursesReservation";
import { useGetCourseByIdMutation } from "../../../redux/features/schedule/courseScheduleApi";

const AddCourseReservationModal = () => {
  const [open, setModalOpen] = useState(false);
  const [form] = useForm();
  const [create, { data, isLoading, isSuccess, isError, error }] =
    useCreateCourseReservationMutation();
  const [courseData, setCourseData] = useState({});
  const [checkForm] = useForm();
  const [courseId, setCourseId] = useState("");
  const [
    checkCourse,
    {
      data: course,
      isLoading: checkLoading,
      isSuccess: checkSuccess,
      isError: isCheckError,
      error: checkError,
    },
  ] = useGetCourseByIdMutation();
  const onFinish = (values: any) => {
    values.course = courseId;
    values.trainer = course?.results.trainer;
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
      setCourseId("");
      setCourseData({});
      form.resetFields();
      checkForm.resetFields();
      setModalOpen(false);
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
  useEffect(() => {
    if (checkSuccess) {
      setCourseData(course?.results);
      form.setFieldsValue({
        sport: course.results.sport,
      });
    }
    if (isCheckError) {
      setCourseData({});
      Swal.fire({
        title: "Oops!..",
        icon: "error",
        text: `${(checkError as any)?.data?.message}`,
        confirmButtonColor: "#0ABAC3",
      });
    }
  }, [isCheckError, checkSuccess, checkError]);
  const onCancel = () => {
    setCourseId("");
    setCourseData({});
    form.resetFields();
    checkForm.resetFields();
    setModalOpen(false);
  };
  const onCheckFinish = (values: any) => {
    setCourseId(values.id);
    checkCourse(values);
  };
  return (
    <>
      <button onClick={() => setModalOpen(true)} className="btn primary-btn">
        Add Reservation
      </button>
      <Modal
        width={800}
        footer={null}
        title="Create New Bootcamp Reservation"
        centered
        open={open}
        onCancel={onCancel}
        maskClosable={false}
      >
        <div className="my-5">
          <CourseReservationForm
            form={form}
            onFinish={onFinish}
            loading={isLoading || checkLoading}
            courseData={courseData}
            onCheckFinish={onCheckFinish}
            checkForm={checkForm}
          />
        </div>
      </Modal>
    </>
  );
};

export default AddCourseReservationModal;
