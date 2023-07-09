import { Container, Row, Col } from "react-bootstrap";
import "./Header.scss";
import { Input, Button, Badge, Modal, Popover } from "antd";
import {
  SearchOutlined,
  HomeOutlined,
  SmileOutlined,
  RocketOutlined,
  ShoppingCartOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import Login from "../Login/Login";
import SignUp from "../Signup/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/type";
import { resetUser } from "../../Redux/Feature/userSlice";
import * as message from "../Message/Message";

const typeProducts = [
  {
    id: 1,
    name: "trai cay",
  },
  {
    id: 2,
    name: "banh my",
  },
  {
    id: 3,
    name: "bo sau",
  },
  {
    id: 4,
    name: "hai san",
  },
];

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isLogin, setIsLogin] = useState(true);

  const user: any = useSelector<RootState>((store) => store.user);
  const dispatch = useDispatch<AppDispatch>();

  const nav = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const toggleLogin = () => {
    setIsLogin(!isLogin);
  };

  const handleLogOut = () => {
    dispatch(resetUser());
    message.success("Logout successfully");
  };

  const handleNavToProfile = () => {
    nav("profile");
  };

  const handelNavToMyOrder = () => {
    nav("my-order");
  };

  const handleNavToAdminPage = () => {
    nav("system/admin");
  };

  const content = (
    <div>
      <div
        className="item-content-popover-header p-1"
        onClick={handleNavToProfile}
      >
        Thông Tin Tài Khoản
      </div>
      {user?.isAdmin && (
        <div
          className="item-content-popover-header p-1"
          onClick={handleNavToAdminPage}
        >
          Quản Lý Hệ Thống
        </div>
      )}

      <div
        className="item-content-popover-header p-1"
        onClick={handelNavToMyOrder}
      >
        Đơn Hàng Của Tôi
      </div>
      <div className="item-content-popover-header p-1" onClick={handleLogOut}>
        Log out
      </div>
    </div>
  );

  return (
    <Container>
      <Row className="p-2">
        <Col className="p-0 logo-phucki" md={1}>
          PhucKi
        </Col>
        <Col className="p-xs-0" md={7}>
          <div className="search-group ">
            <SearchOutlined />
            <Input
              className="input-search "
              placeholder="Phucki rẻ mỗi ngày,không chỉ một ngày"
            />
            <Button className="button-search">Tìm kiếm</Button>
          </div>
        </Col>
        <Col className="p-xs-0 wrapper-menu-header " md={4}>
          <div className="menu-group-header">
            <NavLink to={"/"} className="item-menu-header">
              <HomeOutlined /> Trang chủ
            </NavLink>
            <NavLink to={"astra"} className="item-menu-header">
              <RocketOutlined />
              Astra
            </NavLink>
            {user?.email ? (
              <Popover content={content}>
                <div className="item-menu-header ">
                  <SmileOutlined />
                  Tài khoản
                </div>
              </Popover>
            ) : (
              <div className="item-menu-header " onClick={showModal}>
                <SmileOutlined />
                Tài khoản
              </div>
            )}
          </div>

          <div>
            <NavLink to={"order"}>
              <Badge count={5} size="small">
                <ShoppingCartOutlined className="order-header" />
              </Badge>
            </NavLink>
          </div>
        </Col>
      </Row>
      <Row className="p-2 pt-0">
        <Col className="p-0" md={1}></Col>
        <Col className="p-xs-0" md={7}>
          <div className="wrapper-product-header">
            {typeProducts.map((typeProduct) => (
              <div key={typeProduct.id} className="text-product-header">
                {typeProduct.name}
              </div>
            ))}
          </div>
        </Col>
        <Col className="p-xs-0" md={4}>
          <div className="text-address-header">
            <EnvironmentOutlined />
            Giao đến:
            <span>H.Sóc Sơn,X.Mai Đình,Hà Nội</span>
          </div>
        </Col>
      </Row>

      <Modal
        // onOk={handleOk}
        open={isModalOpen}
        onCancel={handleCancel}
        width={700}
        footer={false}
      >
        <Row className="m-0">
          <Col md={8} className="p-5">
            <div className="text-title-modal-header ">Xin Chào,</div>
            {isLogin ? (
              <div>
                <div
                  className="text-switch-acount-header mb-2"
                  onClick={toggleLogin}
                >
                  Tạo tài khoản
                </div>
                <Login handleCancel={handleCancel} />
              </div>
            ) : (
              <div>
                <div
                  className="text-switch-acount-header"
                  onClick={toggleLogin}
                >
                  Đăng nhập
                </div>
                <SignUp toggleLogin={toggleLogin} />
              </div>
            )}
            <div className="social-heading mt-4">
              <span className="flex-grow-1" />
              <div className="mx-2">Hoặc tiếp tục bằng</div>
              <span className="flex-grow-1" />
            </div>
            <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
              <img
                src="https://salt.tikicdn.com/ts/upload/3a/22/45/0f04dc6e4ed55fa62dcb305fd337db6c.png"
                className="img-fluid image-social-modal"
                alt=""
              />
              <img
                src="https://salt.tikicdn.com/ts/upload/1c/ac/e8/141c68302262747f5988df2aae7eb161.png"
                className="img-fluid image-social-modal"
                alt=""
              />
            </div>
            <div className="text-access-modal mt-3">
              bằng việc tiếp tục bạn ,đã chấp nhận
              <span>điều khoản sử dụng</span>
            </div>
          </Col>
          <Col md={4} className="right-modal-header">
            <img
              src="https://salt.tikicdn.com/ts/upload/eb/f3/a3/25b2ccba8f33a5157f161b6a50f64a60.png"
              className="img-fluid"
              alt=""
            />
            <div className="text-center text-title-right-modal-header ">
              Mua sắm tại PhucKi
            </div>
            <div className="text-center text-content-right-modal-header">
              Siêu ưu đãi mỗi ngày
            </div>
          </Col>
        </Row>
      </Modal>
    </Container>
  );
};

export default Header;
