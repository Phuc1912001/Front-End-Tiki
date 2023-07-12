import "./ProductDetail.scss";
import { Col, Row } from "react-bootstrap";
import { Input, Rate } from "antd";
import { CiDeliveryTruck } from "react-icons/ci";
import { formattedDate } from "../../services/formatDate";
import { useParams } from "react-router-dom";
import * as productService from "../../services/productSevice";
import { useEffect, useState, useContext } from "react";
import { IProduct } from "../../Type&Interface/ProductType";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/type";
import { myModalContext } from "../../App";
import { addOrderProduct } from "../../Redux/Feature/orderSlice";
import { convertPrice } from "../../utils";

const ProductDetail = () => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState<IProduct>();
  const [numProduct, setNumProduct] = useState<number>(1);

  const user: any = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch<AppDispatch>();

  const myValuesContext: any = useContext(myModalContext);
  const { isLogin, isModalOpen, showModal, toggleLogin, handleCancel } =
    myValuesContext;

  const originalPrice =
    productDetail?.price && productDetail?.discount
      ? productDetail.price / (1 - productDetail.discount / 100)
      : 0;

  const fetchProductDetail = async () => {
    const resProduct = await productService.getDetailsProduct(id);
    setProductDetail(resProduct.data);
  };
  useEffect(() => {
    fetchProductDetail();
  }, [id]);

  const handleChangeValueInput = (value: any) => {
    setNumProduct(Number(value));
  };

  const handelIncrementProduct = () => {
    setNumProduct(numProduct + 1);
  };

  const handelDecrementProduct = () => {
    setNumProduct(numProduct - 1);
  };

  const handleBuy = () => {
    if (!user?.email) {
      showModal();
    } else {
      dispatch(
        addOrderProduct({
          orderItem: {
            name: productDetail?.name || "", // Provide a default value when productDetail?.name is undefined
            amount: numProduct,
            image: productDetail?.image || "",
            price: productDetail?.price || 0,
            product: productDetail?._id || "",
            discount: productDetail?.discount || 0,
            countInstock: productDetail?.countInStock || 0,
          },
        })
      );
    }
  };

  return (
    <Row className="wrapper-product-detail p-2">
      <Col md={5}>
        <img src={productDetail?.image} alt="" className="img-fluid" />
      </Col>
      <Col md={7}>
        <div className="title-product-detail">{productDetail?.name}</div>
        <div className="wrapper-rate-sold-product-detail mt-2">
          <Rate allowHalf defaultValue={4.5} className="rate-product-detail" />
          <div className="sold-product-detail">| Đã bán 17</div>
        </div>
        <Row className="mt-3">
          <Col md={8}>
            <div className="wrapper-price-product-detail p-2">
              <div className="all-price-product-detail">
                <div className="current-price-product-detail">
                  {convertPrice(productDetail?.price)}
                </div>
                <div className="cost-price-product-detail">
                  {convertPrice(originalPrice.toFixed(0))}
                </div>
                <div className="discount-price-product-detail">
                  {productDetail?.discount}%
                </div>
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
              Giao đến <span>{user?.address}</span>
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
                <div onClick={handelDecrementProduct}>
                  <img
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-remove.svg"
                    alt=""
                    className="img-fluid"
                  />
                </div>

                <input value={numProduct} onChange={handleChangeValueInput} />

                <div onClick={handelIncrementProduct}>
                  <img
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-add.svg"
                    alt=""
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
            <div className="mt-3">
              <button className="btn-buy-product-detail" onClick={handleBuy}>
                Chọn mua
              </button>
            </div>
          </Col>
          <Col md={4}>D</Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ProductDetail;
