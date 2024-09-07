/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal, UploadFile } from "antd";
import { useEffect, useState } from "react";
import UserForm from "../form/ClientForm";
import Swal from "sweetalert2";
import { useCreateUserMutation } from "../../../redux/features/user/userApi";

const AddClientModal = () => {
  const [open, setModalOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();
  const [create, { data, isLoading, isSuccess, isError, error }] =
    useCreateUserMutation();
  const onFinish = (values: any) => {
    const formData = new FormData();
    if (values.membership) {
      values.status = true;
      const issueDate = new Date();
      values.issue_date = issueDate.toISOString();
      const expiryDate = new Date(issueDate);
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      values.expiry_date = expiryDate.toISOString();
    } else {
      values.package_name = undefined;
      values.plan = undefined;
    }
    if (values.image) {
      formData.append("image", values.image[0].originFileObj);
      delete values.image;
      formData.append("data", JSON.stringify(values));
      create(formData);
    } else {
      create(values);
    }
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
      form.resetFields();
      setModalOpen(false);
      setFileList([]);
    }
    if (isError) {
      Swal.fire({
        title: "Oops!..",
        icon: "error",
        text: `${(error as any)?.data?.message || "something went wrong"}`,
        confirmButtonColor: "#0ABAC3",
      });
    }
  }, [data, isSuccess, form, isError, error]);
  const onCancle = () => {
    setModalOpen(false);
    form.resetFields();
  };
  return (
    <>
      <button onClick={() => setModalOpen(true)} className="primary-btn">
        Add Client
      </button>
      <Modal
        width={800}
        footer={null}
        title="Create New User"
        centered
        open={open}
        onCancel={onCancle}
        maskClosable={false}
      >
        <div className="my-5">
          <UserForm
            fileList={fileList}
            setFileList={setFileList}
            form={form}
            onFinish={onFinish}
            loading={isLoading}
          />
        </div>
      </Modal>
    </>
  );
};

export default AddClientModal;
