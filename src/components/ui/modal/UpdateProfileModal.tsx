/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal } from "antd";
import { CiEdit } from "react-icons/ci";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import ProfileForm from "../form/ProfileForm";
import { IAdmin } from "../../../types/admin.types";
import { useUpdateAdminMutation } from "../../../redux/features/admin/adminApi";
import { useAppDispatch } from "../../../hooks/useAppHooks";
import { updateUserInfo } from "../../../redux/features/auth/authSlice";

const UpdateProfileModal = ({ record }: { record: IAdmin }) => {
  const [open, setModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [form] = useForm();
  const [update, { data, isLoading, isSuccess, isError, error }] =
    useUpdateAdminMutation();
  const onFinish = (values: any) => {
    const formData = new FormData();
    if (values.image[0].originFileObj) {
      formData.append("image", values.image[0].originFileObj);
      delete values.image;
      formData.append("data", JSON.stringify(values));
      update({ id: record?._id, payload: formData });
    } else {
      delete values.image;
      update({ id: record?._id, payload: values });
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
      dispatch(updateUserInfo(data?.results));
      form.resetFields();
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
  }, [data, isSuccess, isError, error]);
  const onCancel = () => {
    setModalOpen(false);
  };
  return (
    <>
      <Button type="default" onClick={() => setModalOpen(true)}>
        Edit <CiEdit />
      </Button>
      <Modal
        width={800}
        footer={null}
        title="Update Info"
        centered
        open={open}
        onCancel={onCancel}
        maskClosable={false}
      >
        <div className="my-5">
          <ProfileForm
            record={record}
            form={form}
            onFinish={onFinish}
            loading={isLoading}
          />
        </div>
      </Modal>
    </>
  );
};

export default UpdateProfileModal;
