/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Popconfirm } from "antd";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useUpdateOrderMutation } from "../../../redux/features/order/orderApi";

const UpdateOrderStatus = ({ id, status }: { id: string; status: string }) => {
  const [open, setOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [update, { data, isLoading, isSuccess, isError, error }] =
    useUpdateOrderMutation();
  const confirm = () => {
    update({ id, status: newStatus });
  };
  const onClick = (value: string) => {
    setOpen(true);
    setNewStatus(value);
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
      description="Do you want to change the order status?"
      okText="Yes"
      onConfirm={confirm}
      okButtonProps={{ loading: isLoading }}
      cancelText="No"
      onCancel={() => setOpen(false)}
    >
      <Button
        className="w-full flex items-center gap-1 justify-center"
        type="primary"
        onClick={() =>
          onClick(
            status === "pending"
              ? "proccesing"
              : status === "proccesing"
              ? "confirm"
              : status === "confirm"
              ? "shipped"
              : status === "shipped"
              ? "Delivered"
              : ""
          )
        }
      >
        {status === "pending"
          ? "Make Proccesing"
          : status === "proccesing"
          ? "Make Confirm"
          : status === "confirm"
          ? "Make Shipped"
          : status === "shipped"
          ? "Make Delivered"
          : ""}
      </Button>
    </Popconfirm>
  );
};

export default UpdateOrderStatus;
