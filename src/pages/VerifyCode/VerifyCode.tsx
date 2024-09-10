/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useLinkVerifyQuery,
  useResetPasswordMutation,
  useVerifyCodeMutation,
} from "../../redux/features/auth/authApi";
import { FaSpinner } from "react-icons/fa";
import logo from "../../assets/icon/login-logo.svg";
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import Swal from "sweetalert2";

const VerifyCode = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { token } = useParams();
  const [form] = useForm();
  const {
    isLoading: isVerifyLoading,
    isSuccess: isVerifySuccess,
    isError: isVerifyError,
    error: verifyError,
  } = useLinkVerifyQuery({
    token,
  });
  const [
    sendOtp,
    {
      isLoading: otpVerifyLoading,
      isSuccess: otpVerifySuccess,
      isError: isOtpVerfiyError,
      error: otpVerifyError,
    },
  ] = useVerifyCodeMutation();
  const [resetPass, { data, isLoading, isSuccess, isError, error }] =
    useResetPasswordMutation();
  const onFinish = (values: any) => {
    const otp = Number(values.otp);
    sendOtp({ token, otp });
  };

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
      navigate("/");
      form.resetFields();
    }
    if (isError) {
      Swal.fire({
        title: "Oops..",
        text: `${(error as any)?.data?.message || "something went wrong"}`,
        icon: "error",
        confirmButtonColor: "#0ABAC3",
      });
    }
  }, [isError, isSuccess, error]);
  useEffect(() => {
    if (otpVerifySuccess) {
      resetPass({ ...state, token });
    }
    if (isOtpVerfiyError) {
      Swal.fire({
        title: "Oops..",
        text: `${(otpVerifyError as any)?.data?.message}`,
        icon: "error",
        confirmButtonColor: "#0ABAC3",
      });
    }
  }, [isOtpVerfiyError, otpVerifyError, otpVerifySuccess]);
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
        <div className="w-full flex flex-col justify-center gap-8 items-center">
          <h2 className="text-center font-poppins font-medium text-4xl leading-[46px] text-[#043E41]">
            OTP Verification
          </h2>
          <div className="w-[480px] space-y-5">
            <h3 className="text-center w-[480] mx-auto text-lg text-[#022B2D]">
              We have sent a verification code to your email address
            </h3>
            <Form
              form={form}
              onFinish={onFinish}
              layout="vertical"
              className="space-y-4"
            >
              <Form.Item
                name="otp"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
                className="m-0"
              >
                <Input.OTP
                  length={4}
                  size="large"
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  loading={isLoading || otpVerifyLoading}
                  className="primary-btn w-full"
                  htmlType="submit"
                >
                  Send
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

export default VerifyCode;
