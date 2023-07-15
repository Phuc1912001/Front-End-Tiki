import "./Profile.scss";

import { Row, Col, Button, Upload, Form, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/type";
import { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";

import * as UserService from "../../services/userService";
import { getBase64 } from "../../utils";
import { updateUser } from "../../Redux/Feature/userSlice";
import Loading from "../../components/Loading/Loading";
import { useLocation, useNavigate } from "react-router-dom";
import SideBarAcount from "../../components/SideBarAcount/SideBarAcount";

const Profile = () => {
  const user: any = useSelector((store: RootState) => store.user);
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    console.log("values", values);

    setLoading(true);
    const updateValues = { ...values, avatar: avatar };

    try {
      const updateUserData = {
        id: user.id,
        data: updateValues,
      };

      const updateUserResponse = await UserService.updateUser(updateUserData);

      dispatch(
        updateUser({
          ...updateUserResponse?.data,
          access_token: user?.access_token,
        })
      );
      message.success("update user thành công");
      if (location?.state) {
        navigate(location?.state);
      }
    } catch (error) {
      // Xử lý lỗi
      message.error(`${error}`);
      console.log("error", error);
    }
    setLoading(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleFieldedForm = () => {
    form.setFieldsValue(user);
  };

  useEffect(() => {
    handleFieldedForm();
    setAvatar(user?.avatar);
  }, [user]);

  const handleOnchangeAvatar = async ({ fileList }: any) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview);
  };

  return (
    <Row>
      <Col
        xs={24}
        sm={24}
        md={4}
        lg={4}
        xl={4}
        className="column-sidebar-profile"
      >
        <SideBarAcount />
      </Col>
      <Col xs={24} sm={24} md={20} lg={20} xl={20}>
        <Loading isLoading={loading}>
          <div className="wrapper-acount-frofile p-4">
            <div className="form-profile">
              <Form
                name="basic"
                labelCol={{
                  xs: { span: 24 },
                  sm: { span: 8 },
                  md: { span: 6 },
                }}
                wrapperCol={{
                  xs: { span: 24 },
                  sm: { span: 16 },
                  md: { span: 18 },
                }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please input your Name!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[
                    { required: true, message: "Please input your Phone!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[
                    { required: true, message: "Please input your Address!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item label="City" name="city">
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Avatar"
                  name="avatar"
                  rules={[
                    { required: true, message: "Please input your Avatar!" },
                  ]}
                >
                  <Upload onChange={handleOnchangeAvatar} maxCount={1}>
                    <Button icon={<UploadOutlined />}>Select File</Button>
                  </Upload>
                  {avatar && (
                    <img
                      src={avatar}
                      style={{
                        height: "60px",
                        width: "60px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                      alt="avatar"
                    />
                  )}
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </Loading>
      </Col>
    </Row>
  );
};

export default Profile;
