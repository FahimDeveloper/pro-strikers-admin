/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, UploadFile } from "antd";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AdminForm from "../form/AdminForm";
import { useUpdateAdminMutation } from "../../../redux/features/admin/adminApi";
import { useForm } from "antd/es/form/Form";
import { CiEdit } from "react-icons/ci";

const UpdateAdminModal = ({ record }: any) => {
  const [open, setModalOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = useForm();
  const [update, { data, isLoading, isSuccess, isError, error }] =
    useUpdateAdminMutation();
  const onFinish = (values: any) => {
    const formData = new FormData();
    if (values.image[0].originFileObj) {
      formData.append("image", values.image[0].originFileObj);
      delete values.image;
      formData.append("data", JSON.stringify(values));
      update({ id: record?._id, body: formData });
    } else {
      delete values.image;
      update({ id: record?._id, body: values });
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
      setModalOpen(false);
      form.resetFields();
      setFileList([]);
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
  const onCancle = () => {
    setModalOpen(false);
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
        title="Update member"
        centered
        open={open}
        onCancel={onCancle}
        maskClosable={false}
      >
        <div className="my-5">
          <AdminForm
            form={form}
            onFinish={onFinish}
            record={record}
            loading={isLoading}
            fileList={fileList}
            setFileList={setFileList}
          />
        </div>
      </Modal>
    </>
  );
};

export default UpdateAdminModal;
