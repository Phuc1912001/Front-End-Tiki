import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Home.scss";
import { Carousel, Badge } from "antd";
import { imageUrlsCarousel } from "../../Image/Image";
import { StarFilled, CheckOutlined } from "@ant-design/icons";

import * as productService from "../../services/productSevice";
import ProductCard from "../../components/ProductCard/ProductCard";
import { IProduct, IProductArray } from "../../Type&Interface/ProductType";
import Loading from "../../components/Loading/Loading";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProduct] = useState<IProductArray>([]);

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
      </Row>
      <div className="pt-4">
        <Loading isLoading={loading}>
          <Row>
            {products.map((product: IProduct) => (
              <ProductCard product={product} />
            ))}
          </Row>
        </Loading>
      </div>
    </Container>
  );
};

export default Home;
