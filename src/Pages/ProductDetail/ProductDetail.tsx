import "./ProductDetail.scss";
import { Col, Row } from "react-bootstrap";
import { Rate } from "antd";
import { CiDeliveryTruck } from "react-icons/ci";
import { BsShop, BsFillPatchCheckFill } from "react-icons/bs";
import { AiOutlinePlus, AiFillLike } from "react-icons/ai";
import { HiReceiptRefund } from "react-icons/hi";
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
import Loading from "../../components/Loading/Loading";
import * as message from "../../components/Message/Message";
import { StarFilled } from "@ant-design/icons";
import { imageSmallProductDetail } from "../../Image/Image";

const ProductDetail = () => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState<IProduct>();
  const [numProduct, setNumProduct] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  const user: any = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch<AppDispatch>();

  const myValuesContext: any = useContext(myModalContext);
  const { showModal } = myValuesContext;

  const originalPrice =
    productDetail?.price && productDetail?.discount
      ? productDetail.price / (1 - productDetail.discount / 100)
      : 0;

  const fetchProductDetail = async () => {
    setLoading(true);
    const resProduct = await productService.getDetailsProduct(id);
    setProductDetail(resProduct.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchProductDetail();
  }, [id]);

  const handelIncrementProduct = () => {
    if (
      productDetail?.countInStock &&
      numProduct < productDetail.countInStock
    ) {
      setNumProduct(numProduct + 1);
    } else {
      message.warning("Bạn đã đặt tối đa sản phẩm");
    }
  };

  const handelDecrementProduct = () => {
    if (numProduct > 1) {
      setNumProduct(numProduct - 1);
    } else {
      message.warning("Bạn giảm đến tối thiểu");
    }
  };

  const handleBuy = () => {
    if (!user?.email) {
      showModal();
    } else {
      dispatch(
        addOrderProduct({
          orderItem: {
            name: productDetail?.name || "",
            amount: numProduct,
            image: productDetail?.image || "",
            price: productDetail?.price || 0,
            product: productDetail?._id || "",
            discount: productDetail?.discount || 0,
            countInstock: productDetail?.countInStock || 0,
          },
        })
      );
      message.success("đã thêm vào giỏ hàng");
    }
  };

  return (
    <Loading isLoading={loading}>
      <Row className="wrapper-product-detail p-2 m-0">
        <Col md={5}>
          <Row className="m-0">
            <Col md={12}>
              <img
                src={productDetail?.image}
                alt=""
                className="img-fluid img-product-detail"
              />
            </Col>
            {imageSmallProductDetail.map((imageSmall: any) => (
              <Col md={3} className="mt-2 column-img-small" key={imageSmall.id}>
                <img
                  src={productDetail?.image}
                  alt=""
                  className="img-fluid img-small-product-detail"
                />
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={7}>
          <div className="title-product-detail">{productDetail?.name}</div>
          <div className="wrapper-rate-sold-product-detail mt-2">
            <Rate
              allowHalf
              value={productDetail?.rating}
              className="rate-product-detail"
            />
            <div className="sold-product-detail">
              | Đã bán {productDetail?.selled}
            </div>
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
                  <div onClick={() => handelDecrementProduct()}>
                    <img
                      src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-remove.svg"
                      alt=""
                      className="img-fluid"
                    />
                  </div>

                  <div className="quantity-product">{numProduct}</div>

                  <div onClick={() => handelIncrementProduct()}>
                    <img
                      src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-add.svg"
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-3 text-center text-md-left">
                <button className="btn-buy-product-detail" onClick={handleBuy}>
                  Chọn mua
                </button>
              </div>
            </Col>
            <Col md={4} className="column-shop-product-detail">
              <div className="p-2 wrapper-shop-product-detail">
                <div className="d-flex align-items-center gap-2">
                  <img
                    src="https://haycafe.vn/wp-content/uploads/2021/11/hinh-anh-hoat-hinh-de-thuong-cute-dep-nhat-600x600.jpg"
                    alt=""
                    className="img-fluid img-shop-product-detail"
                  />
                  <div>
                    <div>Viet Nam Shop</div>
                    <div>
                      <img
                        src="https://salt.tikicdn.com/cache/w100/ts/upload/5d/4c/f7/0261315e75127c2ff73efd7a1f1ffdf2.png.webp"
                        alt=""
                        className="img-fluid w-50"
                      />
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-2">
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <div>
                      4.5/5
                      <span>
                        <StarFilled style={{ color: "yellow" }} />
                      </span>
                    </div>
                    <div>100 Đánh giá</div>
                  </div>
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <div>500</div>
                    <div>Theo dõi</div>
                  </div>
                </div>
                <div className="mt-2 d-flex align-items-center justify-content-between">
                  <button className="btn-shop-product-detail">
                    <BsShop /> xem shop
                  </button>
                  <button className="btn-shop-product-detail">
                    <AiOutlinePlus /> theo dõi
                  </button>
                </div>
                <div className="mt-2 d-flex align-items-center justify-content-between">
                  <div className="text-secondary">Thời gian bảo hành </div>
                  <div>2 năm</div>
                </div>
                <div className="mt-2">
                  <div className="text-secondary">Hình thức bảo hành </div>
                  <div>Phiếu bảo hành</div>
                </div>
                <div className="mt-2">
                  <div className="text-secondary">Nơi bảo hành </div>
                  <div>Bảo hành chính hãng</div>
                </div>
                <div className="mt-3 d-flex  justify-content-between mb-4">
                  <div className="text-shop-refund">
                    <div className="icon-shop-refund">
                      <BsFillPatchCheckFill />
                    </div>
                    hoàn tiền 100% nếu hàng giả
                  </div>
                  <div className="text-shop-refund">
                    <div className="icon-shop-refund">
                      <AiFillLike />
                    </div>
                    Mở hộp kiểm tra nhận hàng
                  </div>
                  <div className="text-shop-refund">
                    <div className="icon-shop-refund">
                      <HiReceiptRefund />
                    </div>
                    Đổi trả trong 30 ngày nếu sản phẩm lỗi
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Loading>
  );
};

export default ProductDetail;
