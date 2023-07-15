import { Menu } from "antd";
import type { MenuProps } from "antd";
import {
  AppstoreOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminProduct from "../../components/AdminProduct.tsx/AdminProduct";
import AdminOrder from "../../components/AdminOrder/AdminOrder";
import "./AdminPage.scss";
import { Row, Col } from "react-bootstrap";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem("Users", "user", <UserOutlined />),
  { type: "divider" },
  getItem("Products", "product", <AppstoreOutlined />),
  { type: "divider" },
  getItem("Orders", "order", <ShoppingCartOutlined />),
];

const AdminPage = () => {
  const [keySelected, setKeySelected] = useState<string[]>(["user"]); // Updated to store an array of strings

  const renderPage = (key: string) => {
    switch (key) {
      case "user":
        return <AdminUser />;
      case "product":
        return <AdminProduct />;
      case "order":
        return <AdminOrder />;
      default:
        return <></>;
    }
  };

  const onClick: MenuProps["onClick"] = ({ key }: any) => {
    setKeySelected([key]);
  };

  return (
    <Row className="m-0">
      <Col md={3} sm={12}>
        <Menu
          onClick={onClick}
          selectedKeys={keySelected} // Thay đổi thành selectedKeys
          defaultOpenKeys={keySelected} // Vẫn giữ nguyên defaultOpenKeys nếu cần thiết
          mode="inline"
          items={items}
        />
      </Col>
      <Col md={9} sm={12}>
        {renderPage(keySelected[0])}
      </Col>
    </Row>
  );
};

export default AdminPage;
