import { Button, Form, Input, Upload } from "antd";

import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";

import { getBase64 } from "../../utils";
import * as productService from "../../services/productSevice";
import * as message from "../../components/Message/Message";
import TableComponent from "../TableComponent/TableComponent";
import ModalComponent from "../ModalComponent/ModalComponent";
import Loading from "../Loading/Loading";

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<any>("");
  const [products, setProducts] = useState<any>([]);

  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    const newValues = { ...values, image: avatar };
    const newProduct = await productService.createProduct(newValues);
    if (newProduct?.status === "OK") {
      message.success("Add Product Success");
      handleCancel();
      form.resetFields();
      setAvatar("");
      fetchDataProduct();
    } else {
      message.error(`${newProduct?.message}`);
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

  const fetchDataProduct = async () => {
    setLoading(true);
    const res = await productService.getAllProduct({ limit: 5 });
    setProducts(res.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchDataProduct();
  }, []);

  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined
          style={{ color: "red", fontSize: "30px", cursor: "pointer" }}
          // onClick={() => setIsModalOpenDelete(true)}
        />
        <EditOutlined
          style={{ color: "orange", fontSize: "30px", cursor: "pointer" }}
          //onClick={handleDetailsProduct}
        />
      </div>
    );
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (image: any) => (
        <span>
          {image && (
            <img
              src={image}
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
        </span>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Rating",
      dataIndex: "rating",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];
  const dataTable =
    products?.length &&
    products?.map((product: any) => {
      return { ...product, key: product._id };
    });

  console.log("dataTable", dataTable);

  return (
    <div>
      <h1>Quản lý sản phẩm</h1>
      <div style={{ marginTop: "10px" }}>
        <Button
          style={{
            height: "150px",
            width: "150px",
            borderRadius: "6px",
            borderStyle: "dashed",
          }}
          onClick={() => setIsModalOpen(true)}
        >
          <PlusOutlined style={{ fontSize: "60px" }} />
        </Button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          columns={columns}
          isLoading={loading}
          data={dataTable}
        />
      </div>
      <ModalComponent
        forceRender
        title="Add Product"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Loading isLoading={loading}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Type Product"
              name="type"
              rules={[{ required: true, message: "Please input your type!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please input your price!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="CountInStock"
              name="countInStock"
              rules={[
                { required: true, message: "Please input your countInStock!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Rating"
              name="rating"
              rules={[{ required: true, message: "Please input your rating!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please input your description!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Discount"
              name="discount"
              rules={[
                { required: true, message: "Please input your discount!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Image Product"
              name="image"
              rules={[
                { required: true, message: "Please input your Image Product!" },
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
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>
    </div>
  );
};

export default AdminProduct;
