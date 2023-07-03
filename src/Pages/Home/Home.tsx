import { Container, Row, Col } from "react-bootstrap";
import "./Home.scss";
import { Carousel } from "antd";

const imageUrls = [
  {
    id: 1,
    imageUrl:
      "https://salt.tikicdn.com/ts/tikimsp/85/2e/f9/3689ec6b1d52c41add29d508b6cb5093.png",
  },
  {
    id: 2,
    imageUrl:
      "https://salt.tikicdn.com/ts/tikimsp/ab/00/55/6e65314bd3771f038b95c261c7f9040e.png",
  },
  {
    id: 3,
    imageUrl:
      "https://salt.tikicdn.com/ts/tikimsp/e5/7a/7b/4b5a1a32c8b029487e84d99d3774077d.png",
  },
  {
    id: 4,
    imageUrl:
      "https://salt.tikicdn.com/ts/tka/8c/0c/26/a691081c7ee5f22dc3a6d54bc162bd63.png",
  },
  {
    id: 5,
    imageUrl:
      "https://salt.tikicdn.com/ts/tikimsp/97/58/05/d83c214d8b78b25ecebdbf1381113b8f.png",
  },

  // Thêm các đường dẫn ảnh khác vào đây
];

const Home = () => {
  return (
    <Container>
      <Row>
        <Col md={12} className="p-md-0">
          <Row>
            <Col md={9}>
              <Carousel autoplay>
                {imageUrls.map((imageUrl) => (
                  <div className="mb-0">
                    <img
                      key={imageUrl.id}
                      src={imageUrl.imageUrl}
                      alt={`Slide ${imageUrl.id + 1}`}
                      className="img-fluid image-carousel"
                    />
                  </div>
                ))}
              </Carousel>
            </Col>
            <Col md={3}>
              <img
                className="img-fluid"
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
