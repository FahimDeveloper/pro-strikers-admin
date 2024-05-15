/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Checkbox, Form, Input } from "antd";
import logo from "../../assets/icon/login-logo.svg";
import { AiOutlineLock, AiOutlineUser } from "react-icons/ai";
const Login = () => {
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <div className="flex">
      <div className="w-[432px] h-screen flex justify-center bg-primary items-center rounded-e-3xl">
        <img src={logo} className="w-2/3 object-cover" alt="logo" />
      </div>
      <div className="w-full flex flex-col justify-center gap-10 items-center">
        <h2 className="text-center font-poppins font-bold text-4xl leading-[46px] text-[#043E41]">
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
                className="h-10 m-0"
                prefix={<AiOutlineLock className="size-5" />}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button className="primary-btn w-full" htmlType="submit">
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
