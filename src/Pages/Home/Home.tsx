import { Container, Row, Col } from "react-bootstrap";
import "./Home.scss";
import { Carousel } from "antd";
import { imageUrlsCarousel } from "../../Image/Image";

const Home = () => {
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
    </Container>
  );
};

export default Home;
