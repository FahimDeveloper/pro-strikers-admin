/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Button, Popconfirm } from "antd";
import { useDeleteFacilityMutation } from "../../../redux/features/schedule/facilityScheduleApi";
import { MdDeleteOutline } from "react-icons/md";

const DeleteFacilityPopup = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const [deleteIt, { data, isLoading, isSuccess, isError, error }] =
    useDeleteFacilityMutation();
  const confirm = () => {
    deleteIt(id);
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
      setOpen(false);
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
  return (
    <Popconfirm
      open={open}
      title="Are you sure?"
      description="Do you want to delete this facility?"
      okText="Yes"
      onConfirm={confirm}
      okButtonProps={{ loading: isLoading }}
      cancelText="No"
      onCancel={() => setOpen(false)}
    >
      <Button
        className="w-full flex items-center gap-1 justify-center"
        type="primary"
        onClick={() => setOpen(true)}
        danger
      >
        <MdDeleteOutline className="size-5 text-white" /> Delete
      </Button>
    </Popconfirm>
  );
};

export default DeleteFacilityPopup;
