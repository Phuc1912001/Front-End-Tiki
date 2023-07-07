import { api } from "../../services/axiosInstance";
import "./Login.scss";
import { Button, Form, Input } from "antd";
import * as message from "../Message/Message";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/type";
import { updateUser } from "../../Redux/Feature/userSlice";
import jwt_decode from "jwt-decode";

interface IValuesLogin {
  email: string;
  password: string;
}

interface IPropsLogin {
  handleCancel: () => void;
}

const Login = ({ handleCancel }: IPropsLogin) => {
  const dispatch = useDispatch<AppDispatch>();

  const onFinish = async (values: IValuesLogin) => {
    try {
      const acountLogin = await api.post("/user/sign-in", values);
      if (acountLogin?.data?.access_token) {
        const decoded: any = jwt_decode(acountLogin?.data?.access_token);
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, acountLogin?.data?.access_token);
        }
      }
      handleCancel();
      message.success("Login is successfully");
    } catch (error) {
      message.error(`${error}`);
    }
  };

  const handleGetDetailsUser = async (id: any, token: any) => {
    const res = await api.get(`/user/get-details/${id}`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
    console.log("res", res.data.data);

    dispatch(updateUser({ ...res?.data?.data, access_token: token }));
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

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="btn-login mt-3 p-4"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
