import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { AuthClient } from "../../../services/web-api-client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import logo from "../../../assets/react.svg";
const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
    }
  }, []);

  const onFinish = (values: any) => {
    const client = new AuthClient();
    values["name"] = "";
    values["phoneNumber"] = "";
    client.login(values).then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/admin");
      }
    });
  };
  return (
    <div className="bg-white w-[500px] p-10 rounded-lg shadow flex flex-col gap-5 items-center">
      <div className="pt-4 pb-8 flex flex-col items-center gap-4">
        <img src={logo} alt="" />
        <span className="font-medium text-xl uppercase ">Welcome back</span>
      </div>

      <Form
        name="normal_login"
        className="login-form w-full"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            {
              type: "email",
              message: "The input is not valid email!",
            },
          ]}
        >
          <Input
            className="mb-2"
            size="large"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            size="large"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="login-form-button mt-12 w-full"
          >
            Log In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
