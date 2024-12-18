/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Checkbox, Form, Input } from "antd";
import logo from "../../assets/icon/login-logo.svg";
import { AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useAppDispatch } from "../../hooks/useAppHooks";
import { loggedInUser } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
const Login = () => {
  const dispatch = useAppDispatch();
  const [login, { data, isLoading, isError, isSuccess, error }] =
    useLoginMutation();
  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        title: "Success",
        text: `${data?.message}`,
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
        iconColor: "#0ABAC3",
      });
      dispatch(loggedInUser(data?.results));
    }
    if (isError) {
      Swal.fire({
        title: "Oops..",
        text: `${(error as any)?.data?.message || "something went wrong"}`,
        icon: "error",
        confirmButtonColor: "#0ABAC3",
      });
    }
  }, [isError, isSuccess, error, data, dispatch]);
  const onFinish = (values: any) => {
    login(values);
  };
  return (
    <div className="flex">
      <div className="w-[432px] h-screen flex justify-center bg-primary items-center rounded-e-3xl">
        <img src={logo} className="w-2/3 object-cover" alt="logo" />
      </div>
      <div className="w-full flex flex-col justify-center gap-10 items-center">
        <h2 className="text-center font-poppins font-medium text-4xl leading-[46px] text-[#043E41]">
          Welcome to ProStrikers
        </h2>
        <div className="w-[480px] space-y-5">
          <h3 className="text-center font-poppins text-2xl font-medium text-[#022B2D]">
            Login first to your account
          </h3>
          <Form onFinish={onFinish} layout="vertical" className="space-y-4">
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
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
              label="Password"
              className="m-0"
            >
              <Input.Password
                className="h-10"
                prefix={<AiOutlineLock className="size-5" />}
                placeholder="Password"
              />
            </Form.Item>
            <div className="flex justify-between">
              <Form.Item
                name="remember"
                valuePropName="checked"
                className="m-0"
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Link to="/forget-password">
                <span className="font-poppins text-primary">
                  Forgot Password?
                </span>
              </Link>
            </div>
            <Form.Item>
              <Button
                loading={isLoading}
                className="primary-btn w-full"
                htmlType="submit"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
