import { api } from "../../services/axiosInstance";
import "./SignUp.scss";
import { Button, Form, Input } from "antd";
import * as message from "../Message/Message";
import { Dispatch } from "react";

interface IValuesSignUp {
  email: string;
  password: string;
  confirmPassword: string;
}

interface IpropSignUp {
  toggleLogin: () => void;
}

const SignUp = ({ toggleLogin }: IpropSignUp) => {
  const onFinish = async (values: IValuesSignUp) => {
    try {
      await api.post("/user/sign-up", values);
      message.success("Signup is successfully");
      toggleLogin();
    } catch (error) {
      message.error(`${error}`);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  // ...

  // Custom validator function for email
  const validateEmail = (rule: any, value: string, callback: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      callback("Email is required!"); // Check if the field is empty
    } else if (!emailRegex.test(value)) {
      callback("Please enter a valid email address!"); // Check if the value is a valid email format
    } else {
      callback(); // No error
    }
  };

  // Custom validator function for password
  const validatePassword = (rule: any, value: string, callback: any) => {
    if (!value) {
      callback("Password is required!"); // Check if the field is empty
    } else if (value.trim() === "") {
      callback("Password cannot be empty!"); // Check if the value contains only spaces
    } else {
      callback(); // No error
    }
  };

  // ...

  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { validator: validateEmail }, // Add the custom email validator
          ]}
        >
          <Input className="input-control" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { validator: validatePassword }, // Add the custom password validator
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="ConfirmPassword"
          name="confirmPassword"
          rules={[
            { validator: validatePassword }, // Add the custom password validator
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="btn-login mt-3 p-4"
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
