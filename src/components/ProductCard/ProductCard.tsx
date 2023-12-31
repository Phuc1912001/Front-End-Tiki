import { Col } from "react-bootstrap";
import { Badge } from "antd";
import { StarFilled, CheckOutlined } from "@ant-design/icons";
import "./ProductCard.scss";
import { IProduct } from "../../Type&Interface/ProductType";
import { NavLink } from "react-router-dom";
import { formattedDate } from "../../services/formatDate";
import { convertPrice } from "../../utils";

interface IpropProduct {
  product: IProduct;
}

const ProductCard = ({ product }: IpropProduct) => {
  const ContentBadgeOfficial = (
    <div className="text-content-badged-product">
      <CheckOutlined />
      <div>Offical</div>
    </div>
  );
  return (
    <Col md={3} sm={6} xs={6} className="mt-3" key={product._id}>
      <NavLink
        to={`product-detail/${product._id}`}
        className="nav-product-detail"
      >
        <Badge.Ribbon text={ContentBadgeOfficial} placement="start">
          <div className=" d-flex flex-column product-wrapper p-2">
            <div className="flex-grow-1">
              <img src={product.image} alt="" className="img-fluid" />
              <div className="name-product">
                {product.name.length > 36
                  ? product.name.substring(0, 36) + "..."
                  : product.name}
              </div>
            </div>

            <div className="align-self-end w-100">
              <div className="d-flex align-items-center gap-1">
                <div className="d-flex align-items-center gap-1">
                  <div className="text-rate-product">{product.rating}</div>
                  <StarFilled className="start-rate-product" />
                </div>
                <div className="text-sold-product">
                  | Đã bán {product.selled}
                </div>
              </div>
              <div className="d-flex align-items-center gap-2 mt-2">
                <div className="text-price-product">
                  {convertPrice(product.price)}
                </div>
                <div className="text-discount-product">{product.discount}%</div>
              </div>
              <div className="text-give-product">
                Tặng tới 15 ASA(3k đ) ≈ 3.6% hoàn tiền
              </div>
              <div className="p-1 text-center mt-2 text-time-delevery-product ">
                Giao {formattedDate}
              </div>
            </div>
          </div>
        </Badge.Ribbon>
      </NavLink>
    </Col>
  );
};

export default ProductCard;
