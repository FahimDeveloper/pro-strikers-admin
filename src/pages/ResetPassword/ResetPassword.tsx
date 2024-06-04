/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input } from "antd";
import logo from "../../assets/icon/login-logo.svg";
import { AiOutlineLock } from "react-icons/ai";
import {
  useLinkVerifyQuery,
  useSendVerifyCodeMutation,
} from "../../redux/features/auth/authApi";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { FaSpinner } from "react-icons/fa6";
const ResetPassword = () => {
  const { id, token } = useParams();
  const [resetData, setResetData] = useState({});
  const [form] = useForm();
  const navigate = useNavigate();
  const {
    isLoading: isVerifyLoading,
    isSuccess: isVerifySuccess,
    isError: isVerifyError,
    error: verifyError,
  } = useLinkVerifyQuery({
    token,
  });
  const [send, { data, isLoading, isError, isSuccess, error }] =
    useSendVerifyCodeMutation();
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
      navigate(`/${id}/${token}/verify`, { state: resetData });
    }
    if (isError) {
      Swal.fire({
        title: "Oops..",
        text: `${(error as any)?.data?.message}`,
        icon: "error",
        confirmButtonColor: "#0ABAC3",
      });
    }
  }, [isError, isSuccess, error, data, form, navigate, id, token, resetData]);
  const onFinish = (values: any) => {
    if (values.password !== values.confirm_password) {
      Swal.fire({
        title: "Oops..",
        text: "Password does not match",
        icon: "error",
        confirmButtonColor: "#0ABAC3",
      });
      return;
    } else {
      setResetData({ id, password: values.password });
      send({ token });
    }
  };
  return (
    <div className="flex">
      <div className="w-[432px] h-screen flex justify-center bg-primary items-center rounded-e-3xl">
        <img src={logo} className="w-2/3 object-cover" alt="logo" />
      </div>
      {isVerifyLoading && (
        <div className="h-svh flex items-center justify-center w-full">
          <FaSpinner className="size-8 text-primary animate-spin" />
        </div>
      )}
      {isVerifySuccess && (
        <div className="w-full flex flex-col justify-center gap-10 items-center">
          <h2 className="text-center font-poppins font-medium text-4xl leading-[46px] text-[#043E41]">
            Update your password
          </h2>
          <div className="w-[480px] space-y-5">
            <h3 className="text-center w-[480] mx-auto text-lg text-[#022B2D]">
              Set your new password with minimum 8 characters with a combination
              of letters and numbers
            </h3>
            <Form
              form={form}
              onFinish={onFinish}
              layout="vertical"
              className="space-y-4"
            >
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
                label="Password"
                className="m-0"
              >
                <Input.Password
                  className="h-10 m-0"
                  prefix={<AiOutlineLock className="size-5" />}
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item
                name="confirm_password"
                rules={[
                  {
                    required: true,
                    message: "Please input your confirm password!",
                  },
                ]}
                label="Confirm Password"
                className="m-0"
              >
                <Input.Password
                  className="h-10 m-0"
                  prefix={<AiOutlineLock className="size-5" />}
                  placeholder="Re-type your new password"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  loading={isLoading}
                  className="primary-btn w-full"
                  htmlType="submit"
                >
                  Change Password
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      )}
      {isVerifyError && (
        <div className="h-svh flex items-center justify-center w-full">
          <div className="space-y-5">
            <h2 className="text-center font-poppins font-medium text-4xl leading-[46px] text-[#043E41]">
              {(verifyError as any)?.data?.message === "jwt malformed"
                ? "Invalid link"
                : "Link Already Expired"}
            </h2>
            <Link to="/" className="block">
              <Button className="primary-btn w-full">Go Back</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
