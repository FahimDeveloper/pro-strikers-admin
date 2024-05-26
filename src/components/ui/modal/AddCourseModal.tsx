/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { useState } from "react";
import CourseForm from "../form/CourseForm";

const AddCourseModal = () => {
  const [open, setModalOpen] = useState(false);
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <>
      <button onClick={() => setModalOpen(true)} className="btn primary-btn">
        Add Course
      </button>
      <Modal
        width={800}
        footer={null}
        title="Create New Course"
        centered
        open={open}
        onCancel={() => setModalOpen(false)}
      >
        <div className="my-5">
          <CourseForm onFinish={onFinish} />
        </div>
      </Modal>
    </>
  );
};

export default AddCourseModal;
