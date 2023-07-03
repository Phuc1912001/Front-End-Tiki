import { Container, Row, Col } from "react-bootstrap";
import "./Header.scss";
import { Input, Button, Badge } from "antd";
import {
  SearchOutlined,
  HomeOutlined,
  SmileOutlined,
  RocketOutlined,
  ShoppingCartOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

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
            <NavLink to={"profile"} className="item-menu-header">
              <SmileOutlined />
              Tài khoản
            </NavLink>
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
    </Container>
  );
};

export default Header;
