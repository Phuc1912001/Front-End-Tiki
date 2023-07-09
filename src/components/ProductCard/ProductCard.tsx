import { Col } from "react-bootstrap";
import { Badge } from "antd";
import { StarFilled, CheckOutlined } from "@ant-design/icons";
import "./ProductCard.scss";
import { IProduct } from "../../Type&Interface/ProductType";
import { NavLink } from "react-router-dom";

interface IpropProduct {
  product: IProduct;
}

const ProductCard = ({ product }: IpropProduct) => {
  console.log("products in product card ", product);

  const moment = require("moment");
  require("moment/locale/vi"); // Import locale tiếng Việt

  // Thiết lập ngôn ngữ là tiếng Việt
  moment.locale("vi");

  // Lấy ngày hôm nay
  const today = moment();

  // Tính toán ngày cách xa 4 ngày
  const futureDate = today.clone().add(4, "days");

  // Render thứ, ngày và tháng của ngày cách xa 4 ngày
  const formattedDate = futureDate.format(`dddd, [ngày] DD/MM`);

  const ContentBadgeOfficial = (
    <div className="text-content-badged-product">
      <CheckOutlined />
      <div>Offical</div>
    </div>
  );

  return (
    <Col md={3} className="mt-3" key={product._id}>
      <NavLink to={`${product._id}`}>
        <Badge.Ribbon text={ContentBadgeOfficial} placement="start">
          <div className="product-wrapper p-2">
            <img
              src="https://salt.tikicdn.com/cache/280x280/ts/product/7f/a7/e6/84c2933a6526b4b161eb07f83ab463c5.jpg.webp"
              alt=""
              className="img-fluid"
            />
            <div className="name-product">
              {product.name.length > 43
                ? product.name.substring(0, 43) + "..."
                : product.name}
            </div>
            <div className="d-flex align-items-center gap-1">
              <div className="d-flex align-items-center gap-1">
                <div className="text-rate-product">{product.rating}</div>
                <StarFilled className="start-rate-product" />
              </div>
              <div className="text-sold-product">
                {" "}
                | Đã bán {product.selled}
              </div>
            </div>
            <div className="d-flex align-items-center gap-2 mt-2">
              <div className="text-price-product">{product.price} đ</div>
              <div className="text-discount-product">{product.discount}%</div>
            </div>
            <div className="text-give-product">
              Tặng tới 15 ASA(3k đ) ≈ 3.6% hoàn tiền
            </div>

            <div className="text-center p-1 mt-2 text-time-delevery-product">
              Giao {formattedDate}
            </div>
          </div>
        </Badge.Ribbon>
      </NavLink>
    </Col>
  );
};

export default ProductCard;
