import "./ProductDetail.scss";
import { Col, Row } from "react-bootstrap";
import { Input, Rate } from "antd";
import { CiDeliveryTruck } from "react-icons/ci";
import { formattedDate } from "../../services/formatDate";

const ProductDetail = () => {
  const currentPrice = 58.0;
  const discountRate = 25;
  const originalPrice = currentPrice / (1 - discountRate / 100);

  return (
    <Row className="wrapper-product-detail p-2">
      <Col md={5}>
        <img
          src="https://salt.tikicdn.com/cache/750x750/ts/product/4d/4c/8a/f17cddb2d46a408ca7f719b1e0736485.jpg.webp"
          alt=""
          className="img-fluid"
        />
      </Col>
      <Col md={7}>
        <div className="title-product-detail">
          Áo Thun Nam Ngắn Tay 5S CONFIDENT, Chất Liệu Cotton Thoáng Mát, Co
          Giãn, Thiết Kế In Trẻ Trung (TSO23014)
        </div>
        <div className="wrapper-rate-sold-product-detail mt-2">
          <Rate allowHalf defaultValue={4.5} className="rate-product-detail" />
          <div className="sold-product-detail">| Đã bán 17</div>
        </div>
        <Row className="mt-3">
          <Col md={8}>
            <div className="wrapper-price-product-detail p-2">
              <div className="all-price-product-detail">
                <div className="current-price-product-detail">58.000 đ </div>
                <div className="cost-price-product-detail">
                  {originalPrice.toFixed(0)}.000 đ
                </div>
                <div className="discount-price-product-detail">-35%</div>
              </div>
              <div className="d-flex align-items-center mt-2">
                <div className="wrapper-give-product-detail">
                  <div>
                    <img
                      src="https://salt.tikicdn.com/ts/upload/df/e2/b4/063c4d55ca380f818547f00f5175d39f.png"
                      alt=""
                      className="img-fluid img-logo-give-product-detail"
                    />
                  </div>
                  Thưởng 31,13 ASA (≈ 6.475đ)
                </div>
                <div>
                  <img
                    src="https://salt.tikicdn.com/ts/upload/9e/93/48/33bcc35a1465f46346c03a17d0c36ab8.png"
                    alt=""
                    className="img-fluid img-logo-astra-product-detail"
                  />
                </div>
              </div>
            </div>
            <div className="mt-3 pt-3 text-delivery-product-detail">
              Giao đến <span>H.Sóc Sơn,X.Mai Đình, Hà Nội</span>
            </div>
            <div className="mt-3 wrapper-time-price-delivery-product-detail p-2">
              <div>
                <CiDeliveryTruck /> <span>{formattedDate}</span>
              </div>
              <div>Vận Chuyển: 23.000đ</div>
            </div>
            <div className="freeship-product-detail pt-3 pb-3">
              <img
                src="https://salt.tikicdn.com/ts/upload/04/30/ef/19cf951e219725e2e26d73f688e7f275.png"
                alt=""
                className="img-fluid"
              />
              Bạn sẽ được freeship 15.000đ cho đơn từ 149.000đ
            </div>
            <div className="mt-3">
              <h6>Số Lượng</h6>
              <div className="group-btn-quantity-product-detail">
                <div>
                  <img
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-remove.svg"
                    alt=""
                    className="img-fluid"
                  />
                </div>

                <input value={1} />

                <div>
                  <img
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-add.svg"
                    alt=""
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
            <div className="mt-3">
              <button className="btn-buy-product-detail">Chọn mua</button>
            </div>
          </Col>
          <Col md={4}>D</Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ProductDetail;
