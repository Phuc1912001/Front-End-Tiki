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
    <div style={{ display: "flex", overflowX: "hidden" }}>
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        selectedKeys={keySelected} // Thay đổi thành selectedKeys
        defaultOpenKeys={keySelected} // Vẫn giữ nguyên defaultOpenKeys nếu cần thiết
        mode="inline"
        items={items}
      />
      <div style={{ flex: 1, padding: "15px 0 15px 15px" }}>
        {renderPage(keySelected[0])}
        {/* Access the first element of the array */}
      </div>
    </div>
  );
};

export default AdminPage;
