/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input } from "antd";
import logo from "../../assets/icon/login-logo.svg";
import { AiOutlineUser } from "react-icons/ai";
import { useFogotPasswordMutation } from "../../redux/features/auth/authApi";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";
const SendResetMail = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const [send, { data, isLoading, isError, isSuccess, error }] =
    useFogotPasswordMutation();
  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        title: "Success",
        text: `${data?.message}`,
        icon: "success",
        showConfirmButton: true,
        iconColor: "#0ABAC3",
        confirmButtonColor: "#0ABAC3",
      });
      form.resetFields();
      navigate("/");
    }
    if (isError) {
      Swal.fire({
        title: "Oops..",
        text: `${(error as any)?.data?.message}`,
        icon: "error",
        confirmButtonColor: "#0ABAC3",
      });
    }
  }, [isError, isSuccess, error, data, form, navigate]);
  const onFinish = (values: any) => {
    send(values);
  };
  return (
    <div className="flex">
      <div className="w-[432px] h-screen flex justify-center bg-primary items-center rounded-e-3xl">
        <img src={logo} className="w-2/3 object-cover" alt="logo" />
      </div>
      <div className="w-full flex flex-col justify-center gap-7 items-center">
        <h2 className="text-center font-poppins font-medium text-4xl leading-[46px] text-[#043E41]">
          Prostrikers Validations
        </h2>
        <div className="w-[480px] space-y-5">
          <h3 className="text-center text-lg text-[#022B2D]">
            Enter your validate email address
          </h3>
          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            className="space-y-4"
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
              label="Email"
              className="m-0"
            >
              <Input
                className="h-10"
                prefix={<AiOutlineUser className="size-5" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item>
              <Button
                loading={isLoading}
                className="primary-btn w-full"
                htmlType="submit"
              >
                Send
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SendResetMail;
