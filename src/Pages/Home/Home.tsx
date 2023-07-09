import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Home.scss";
import { Carousel } from "antd";
import { imageUrlsCarousel } from "../../Image/Image";
import { StarFilled } from "@ant-design/icons";

import * as productService from "../../services/productSevice";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProduct] = useState<any>([]);

  const fetchProductAll = async () => {
    setLoading(true);
    const res = await productService.getAllProduct();
    setProduct(res.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchProductAll();
  }, []);

  console.log("products", products);

  return (
    <Container>
      <Row>
        <Col md={12} className="p-md-0">
          <Row>
            <Col md={9}>
              <Carousel autoplay>
                {imageUrlsCarousel.map((imageUrlCarousel) => (
                  <div className="mb-0" key={imageUrlCarousel.id}>
                    <img
                      src={imageUrlCarousel.imageUrlCarousel}
                      alt={`Slide ${imageUrlCarousel.id + 1}`}
                      className="img-fluid image-carousel"
                    />
                  </div>
                ))}
              </Carousel>
            </Col>
            <Col md={3}>
              <img
                className="img-fluid image-near-carousel "
                src="https://salt.tikicdn.com/ts/tikimsp/57/fb/4f/aa6df87b044c19d66f2a00adc7ff5564.png"
                alt=""
              />
            </Col>
          </Row>
        </Col>
        <Col md={3}>
          <div className="product-wrapper p-2">
            <img
              src="https://salt.tikicdn.com/cache/280x280/ts/product/7f/a7/e6/84c2933a6526b4b161eb07f83ab463c5.jpg.webp"
              alt=""
              className="img-fluid"
            />
            <div>Áo thun siêu ccao cấp hahaha</div>
            <div>
              <div>
                <span>5</span>
                <StarFilled
                  style={{ fontSize: "1rem", color: "rgb(253, 216, 54)" }}
                />
              </div>
              <div> | đã bán 14</div>
              <div>
                60.000đ <span>39%</span>
              </div>
            </div>
            <hr />
            <div>giao sieu tốc</div>
          </div>
        </Col>
        <Col md={3}>
          <div className="product-wrapper p-2">2</div>
        </Col>
        <Col md={3}>
          <div className="product-wrapper p-2">2</div>
        </Col>
        <Col md={3}>
          <div className="product-wrapper p-2">2</div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
