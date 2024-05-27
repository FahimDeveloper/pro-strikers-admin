/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { useState } from "react";
import PostForm from "../form/PostForm";

const AddPostModal = () => {
  const [open, setModalOpen] = useState(false);
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <>
      <button onClick={() => setModalOpen(true)} className="primary-btn">
        Create Post
      </button>
      <Modal
        width={800}
        footer={null}
        title="Create New Post"
        centered
        open={open}
        onCancel={() => setModalOpen(false)}
      >
        <PostForm onFinish={onFinish} />
      </Modal>
    </>
  );
};

export default AddPostModal;
