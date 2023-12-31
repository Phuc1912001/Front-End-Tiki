import { Button, Form, Input, Upload, Popconfirm, Select } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getBase64, renderOptions } from "../../utils";
import * as productService from "../../services/productSevice";
import * as message from "../../components/Message/Message";
import TableComponent from "../TableComponent/TableComponent";
import ModalComponent from "../ModalComponent/ModalComponent";
import Loading from "../Loading/Loading";

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isUpdateProduct, setIsUpdateProduct] = useState(false);
  const [avatar, setAvatar] = useState<any>("");
  const [products, setProducts] = useState<any>([]);
  const [typeProduct, setTypeProduct] = useState<any>([]);
  const [detailProduct, setDetailProduct] = useState<any>({});

  const [rowSelected, setRowSelected] = useState("");
  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setAvatar("");
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    const type = Array.isArray(values.type) ? values.type : [values.type];
    const newValues = { ...values, image: avatar, type: type.join(" ") };
    console.log("newValues", newValues);

    const requestProduct = isUpdateProduct
      ? productService.updateProduct(detailProduct._id, newValues)
      : productService.createProduct(newValues);
    try {
      const responseProduct = await requestProduct;
      console.log("responseProduct", responseProduct);

      if (isUpdateProduct) {
        message.success("update Product Success");
        handleCancel();
        form.resetFields();
        fetchDataProduct();
      } else {
        message.success("Add Product Success");
        handleCancel();
        form.resetFields();
        setAvatar("");
        fetchDataProduct();
      }
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

  const fetchDataProduct = async () => {
    setLoading(true);
    const res = await productService.getAllProduct({ limit: 200 });
    setProducts(res.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchDataProduct();
  }, []);

  const fetchTypeProduct = async () => {
    const res = await productService.getAllTypeProduct();
    setTypeProduct(res.data);
  };

  useEffect(() => {
    fetchTypeProduct();
    console.log("typeProduct", typeProduct);
  }, [isModalOpen]);

  const handleDetailsProduct = async (row: any) => {
    setIsModalOpen(true);
    form.setFieldsValue(row);
    setAvatar(row.image);
    setDetailProduct(row);
    setIsUpdateProduct(true);
  };

  const confirm = async (row: any) => {
    await productService.deleteProduct(row._id);
    message.success("Delete is successfully");
    fetchDataProduct();
  };
  const cancel = () => {
    message.warning("Close Popconfirm ");
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
      sorter: (a: any, b: any) => a.name.length - b.name.length,
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a: any, b: any) => a.price - b.price,
      filters: [
        {
          text: ">= 50",
          value: ">=",
        },
        {
          text: "<= 50",
          value: "<=",
        },
      ],
      onFilter: (value: string, record: any) => {
        if (value === ">=") {
          return record.price >= 50;
        }
        return record.price <= 50;
      },
    },
    {
      title: "Rating",
      dataIndex: "rating",
      sorter: (a: any, b: any) => a.rating - b.rating,
      filters: [
        {
          text: ">= 3",
          value: ">=",
        },
        {
          text: "<= 3",
          value: "<=",
        },
      ],
      onFilter: (value: string, record: any) => {
        if (value === ">=") {
          return Number(record.rating) >= 3;
        }
        return Number(record.rating) <= 3;
      },
    },
    {
      title: "Type",
      dataIndex: "type",
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
            onClick={() => handleDetailsProduct(row)}
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
    products?.length &&
    products?.map((product: any) => {
      return { ...product, key: product._id };
    });

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const handleaddProduct = () => {
    setIsModalOpen(true);
    setIsUpdateProduct(false);
  };

  return (
    <div>
      <h4>Quản lý sản phẩm</h4>
      <div style={{ marginTop: "10px" }}>
        <Button onClick={handleaddProduct}>Thêm sản phẩm</Button>
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
        title={`${isUpdateProduct ? "Sửa sản phẩm" : "Thêm sản phẩm"}`}
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
              <Select
                mode="tags"
                style={{ width: "100%" }}
                onChange={handleChange}
                tokenSeparators={[","]}
                options={renderOptions(typeProduct)}
              />
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
              {isUpdateProduct ? (
                <Button type="primary" htmlType="submit">
                  Update Product
                </Button>
              ) : (
                <Button type="primary" htmlType="submit">
                  Create Product
                </Button>
              )}
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>
    </div>
  );
};

export default AdminProduct;
