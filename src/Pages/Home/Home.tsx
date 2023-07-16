import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Home.scss";
import { Carousel, Pagination } from "antd";
import { imageProductBrandHomes, imageUrlsCarousel } from "../../Image/Image";
import * as productService from "../../services/productSevice";
import ProductCard from "../../components/ProductCard/ProductCard";
import { IProduct, IProductArray } from "../../Type&Interface/ProductType";
import Loading from "../../components/Loading/Loading";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/type";
import { useDebounce } from "../../hook/useDebounce";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<IProductArray>([]);
  const searchProduct: any = useSelector(
    (store: RootState) => store?.product?.search
  );
  const searchDebounce = useDebounce(searchProduct, 500);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const limit = 12;

  const fetchProductAll = async (searchProduct: string, page: number) => {
    setLoading(true);
    let realPage = page > 0 ? page - 1 : 0;
    const res = await productService.getAllProduct({
      search: searchProduct,
      limit: limit,
      page: realPage,
    });
    console.log("res", res);
    setTotalPages(res.total);
    setProducts(res.data);
    setLoading(false);
  };
  console.log("totalPages", totalPages);
  useEffect(() => {
    fetchProductAll(searchDebounce, currentPage);
  }, [searchDebounce, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  console.log("products", products);

  return (
    <Container>
      <Row>
        <Col md={12} className="p-md-0">
          <Row>
            <Col md={9}>
              <Carousel autoplay>
                {imageUrlsCarousel.map((imageUrlCarousel: any) => (
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
                className="img-fluid image-near-carousel"
                src="https://salt.tikicdn.com/ts/tikimsp/57/fb/4f/aa6df87b044c19d66f2a00adc7ff5564.png"
                alt=""
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={12}>
          <div className="p-4 wraper-brand-product">
            <div>
              <div className="fw-bold">Thương hiệu chính hãng</div>
            </div>
            <div className="wrapper-img-product-brand mt-3">
              <Row>
                {imageProductBrandHomes.map((imageProductBrandHome: any) => (
                  <Col
                    md={2}
                    xs={6}
                    key={imageProductBrandHome.id}
                    className="mt-3"
                  >
                    <img
                      src={imageProductBrandHome.imgUrl}
                      alt=""
                      className="img-fluid"
                    />
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </Col>
      </Row>
      <div className="pt-4">
        <Loading isLoading={loading}>
          <Row>
            {products.map((product: IProduct) => (
              <ProductCard product={product} />
            ))}
          </Row>
          <div className="mt-3 text-center">
            <Pagination
              current={currentPage}
              total={totalPages}
              pageSize={limit}
              onChange={handlePageChange}
            />
          </div>
        </Loading>
      </div>
    </Container>
  );
};

export default Home;
