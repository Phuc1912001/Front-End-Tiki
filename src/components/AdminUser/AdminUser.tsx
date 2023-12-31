import { Button, Form, Input, Upload, Popconfirm, Col, Row } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getBase64 } from "../../utils";
import * as userService from "../../services/userService";
import * as message from "../../components/Message/Message";
import TableComponent from "../TableComponent/TableComponent";
import ModalComponent from "../ModalComponent/ModalComponent";
import Loading from "../Loading/Loading";

const AdminUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<any>("");
  const [users, setUsers] = useState<any>([]);
  const [detailUser, setDetailUser] = useState<any>({});

  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    const newValues = { ...values, avatar: avatar };
    const updateUserData = {
      id: detailUser._id,
      data: newValues,
    };
    console.log("updateUserData", updateUserData);

    try {
      const responseProduct = await userService.updateUser(updateUserData);
      console.log("responseProduct", responseProduct);
      message.success("update Product Success");
      handleCancel();
      form.resetFields();
      fetchDataUsers();
    } catch (error) {
      message.error(`${error}`);
    }

    setLoading(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleOnchangeAvatar = async ({ fileList }: any) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview);
  };

  const fetchDataUsers = async () => {
    setLoading(true);
    const res = await userService.getAllUser();
    setUsers(res.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchDataUsers();
  }, []);

  const handleDetailsUser = async (row: any) => {
    console.log("row in admin user", row);
    setIsModalOpen(true);
    form.setFieldsValue(row);
    setDetailUser(row);
  };

  const confirm = async (row: any) => {
    await userService.deleteUser(row._id);
    message.success("Delete is successfully");
    fetchDataUsers();
  };
  const cancel = () => {
    message.warning("Close Popconfirm ");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a: any, b: any) => a.name.length - b.name.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a: any, b: any) => a.email.length - b.email.length,
    },
    {
      title: "Address",
      dataIndex: "address",
      sorter: (a: any, b: any) => a.address.length - b.address.length,
    },
    {
      title: "Admin",
      dataIndex: "isAdmin",
      render: (isAdmin: boolean) => (isAdmin ? "True" : "False"),
      filters: [
        { text: "True", value: "true" },
        { text: "False", value: "false" },
      ],
      onFilter: (value: string, record: any) =>
        record.isAdmin.toString() === value,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a: any, b: any) => a.phone - b.phone,
    },
    {
      title: "Action",
      dataIndex: "action",
      fixed: "right",
      render: (_: any, row: any) => (
        <div className="d-flex gap-2">
          <Button
            type="dashed"
            size="small"
            onClick={() => handleDetailsUser(row)}
            icon={<EditOutlined />}
          ></Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => confirm(row)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="dashed"
              size="small"
              icon={<DeleteOutlined />}
              danger
            ></Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  const dataTable =
    users?.length &&
    users?.map((product: any) => {
      return { ...product, key: product._id };
    });

  console.log("dataTable", dataTable);

  return (
    <div>
      <h4>Quản lý người dùng</h4>

      <div style={{ marginTop: "20px" }}>
        <TableComponent
          columns={columns}
          isLoading={loading}
          data={dataTable}
        />
      </div>

      <Row>
        <Col xs={24} sm={24} md={20} lg={20} xl={20}>
          <ModalComponent
            forceRender
            title="Update User"
            isOpen={isModalOpen}
            onCancel={handleCancel}
            footer={null}
          >
            <Loading isLoading={loading}>
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
                onFinish={onFinish}
                autoComplete="on"
                form={form}
              >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please input your name!" },
                  ]}
                >
                  <Input />
                </Form.Item>

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
                  label="Phone"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your  phone!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Adress"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Please input your  address!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Avatar"
                  name="avatar"
                  rules={[
                    { required: true, message: "Please input your image!" },
                  ]}
                >
                  <Upload onChange={handleOnchangeAvatar} maxCount={1}>
                    <Button icon={<UploadOutlined />}>Select File</Button>
                    {avatar && (
                      <img
                        src={avatar}
                        style={{
                          height: "60px",
                          width: "60px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          marginLeft: "15px",
                        }}
                        alt="avatar"
                      />
                    )}
                  </Upload>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Update User
                  </Button>
                </Form.Item>
              </Form>
            </Loading>
          </ModalComponent>
        </Col>
      </Row>
    </div>
  );
};

export default AdminUser;
