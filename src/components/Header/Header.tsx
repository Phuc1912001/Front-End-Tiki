import { Container, Row, Col } from "react-bootstrap";
import "./Header.scss";
import { Input, Button, Badge, Popover, Modal } from "antd";
import {
  SearchOutlined,
  HomeOutlined,
  SmileOutlined,
  RocketOutlined,
  ShoppingCartOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import Login from "../Login/Login";
import SignUp from "../Signup/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/type";
import { resetUser } from "../../Redux/Feature/userSlice";
import * as message from "../Message/Message";
import { searchProductGlobal } from "../../Redux/Feature/productSlice";
import { getTypeProducts } from "../../Redux/Feature/typeProductSlice";
import { myModalContext } from "../../App";

const Header = () => {
  const user: any = useSelector<RootState>((store) => store.user);

  const dispatch = useDispatch<any>();

  const fetchTypeProducts = () => {
    dispatch(getTypeProducts());
  };

  useEffect(() => {
    fetchTypeProducts();
  }, []);
  const typeProducts: any = useSelector<RootState>(
    (store) => store.typeProduct.typeProduct
  );
  const order: any = useSelector<RootState>((store) => store.order);

  console.log("typeProductsin header", typeProducts);

  const myValuesContext: any = useContext(myModalContext);
  const { isLogin, isModalOpen, showModal, toggleLogin, handleCancel } =
    myValuesContext;

  const nav = useNavigate();

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

  const handleSearchProduct = (e: any) => {
    dispatch(searchProductGlobal(e.target.value));
  };

  const handleNavigatetype = (type: any) => {
    nav(
      `/product/${type
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        ?.replace(/ /g, "_")}`,
      { state: type }
    );
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
              onChange={handleSearchProduct}
            />
            <Button className="button-search">Tìm kiếm</Button>
          </div>
        </Col>
        <Col className="p-xs-0 wrapper-menu-header pt-xs-3 " md={4}>
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

          <div className="d-flex justify-content-center align-items-center pt-2">
            <NavLink to={"order"}>
              <Badge count={order?.orderItems.length} size="small">
                <ShoppingCartOutlined className="order-header" />
              </Badge>
            </NavLink>
          </div>
        </Col>
      </Row>
      <Row className="p-2 pt-0 row-under-header">
        <Col className="p-0" md={1}></Col>
        <Col className="p-xs-0" md={7}>
          <div className="wrapper-product-header">
            {Array.isArray(typeProducts) ? (
              typeProducts.map((typeProduct: any, index: number) => (
                <div
                  key={index}
                  onClick={() => handleNavigatetype(typeProduct)}
                  className="text-product-header"
                >
                  {typeProduct}
                </div>
              ))
            ) : (
              <div>Không có sản phẩm</div>
            )}
          </div>
        </Col>
        <Col className="p-xs-0" md={4}>
          <div className="text-address-header">
            <EnvironmentOutlined />
            Giao đến:
            {user?.address ? (
              <span>{user?.address}</span>
            ) : (
              <span>hãy đăng nhập ở tài khoản để có địa chỉ</span>
            )}
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
