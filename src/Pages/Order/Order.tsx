import { useEffect, useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import "./Order.scss";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AppDispatch, RootState } from "../../Redux/type";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseAmount,
  increaseAmount,
  removeAllOrderProduct,
  removeOrderProduct,
  selectedOrder,
} from "../../Redux/Feature/orderSlice";
import { convertPrice } from "../../utils";
import { useLocation, useNavigate } from "react-router-dom";
import * as message from "../../components/Message/Message";
import StepComponent from "../../components/StepComponent/StepComponent";

const Order = () => {
  const [numProduct, setNumProduct] = useState<number>(1);
  const [listChecked, setListChecked] = useState<any>([]);

  const location = useLocation();

  const orders: any = useSelector<RootState>((store) => store.order);
  const user: any = useSelector<RootState>((store) => store.user);

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const onChange = (e: CheckboxChangeEvent) => {
    if (listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter(
        (item: any) => item !== e.target.value
      );
      setListChecked(newListChecked);
    } else {
      setListChecked([...listChecked, e.target.value]);
    }
  };
  const handleOnchangeCheckAll = (e: any) => {
    if (e.target.checked) {
      const newListChecked: any = [];
      orders?.orderItems?.forEach((item: any) => {
        newListChecked.push(item?.product);
      });
      setListChecked(newListChecked);
    } else {
      setListChecked([]);
    }
  };

  const priceMemo = useMemo(() => {
    const result = orders?.orderItemsSelected?.reduce(
      (total: any, cur: any) => {
        return total + cur.price * cur.amount;
      },
      0
    );
    return result;
  }, [orders]);

  const priceDiscountMemo = useMemo(() => {
    const result = orders?.orderItemsSelected?.reduce(
      (total: any, cur: any) => {
        const totalDiscount = cur.discount ? cur.discount : 0;
        return total + (priceMemo * totalDiscount) / 100;
      },
      0
    );
    if (Number(result)) {
      return result;
    }
    return 0;
  }, [orders]);

  const diliveryPriceMemo = useMemo(() => {
    if (priceMemo >= 20000 && priceMemo < 500000) {
      return 10000;
    } else if (
      priceMemo >= 500000 ||
      orders?.orderItemsSelected?.length === 0
    ) {
      return 0;
    } else {
      return 20000;
    }
  }, [priceMemo]);

  const totalPriceMemo = useMemo(() => {
    return (
      Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo)
    );
  }, [priceMemo, priceDiscountMemo, diliveryPriceMemo]);

  const handleChangeValueInput = (value: any) => {
    setNumProduct(Number(value));
  };

  const handelIncrementProduct = (productId: any, limited: any) => {
    if (!limited) {
      dispatch(increaseAmount({ idProduct: productId }));
    } else {
      message.warning("Bạn đã đặt tối đa sản phẩm này");
    }
  };

  const handelDecrementProduct = (productId: any, limited: any) => {
    if (!limited) {
      dispatch(decreaseAmount({ idProduct: productId }));
    } else {
      message.warning("Bạn giảm đến tối thiểu");
    }
  };

  const handleRemoveOrder = (productId: any) => {
    dispatch(removeOrderProduct({ idProduct: productId }));
  };

  const handleRemoveAllOrder = () => {
    if (listChecked?.length > 1) {
      dispatch(removeAllOrderProduct({ listChecked }));
    }
  };

  useEffect(() => {
    dispatch(selectedOrder({ listChecked }));
  }, [listChecked]);

  const handleAddCard = () => {
    console.log(!orders?.orderItemsSlected?.length);

    if (!orders?.orderItemsSelected?.length) {
      message.error("Vui lòng chọn sản phẩm");
    } else if (!user?.phone || !user.address || !user.name || !user.city) {
      navigate("/profile", { state: location?.pathname });
      message.error(
        "làm ơn hãy điền đủ các thông tin Name , Phone , Address , City"
      );
    } else {
      navigate("/payment");
    }
  };

  const handleChangeAddress = () => {
    navigate("/profile", { state: location?.pathname });
  };

  const itemsDelivery = [
    {
      title: "20k",
      description: "Dưới 20k",
    },
    {
      title: "10k",
      description: "Từ 200k đến 500k",
    },
    {
      title: "Free ship",
      description: "Trên 500k ",
    },
  ];

  return (
    <Row>
      <Col md={9}>
        <Row className="p-2 wrapper-title-order mb-2">
          <Col md={12}>
            <StepComponent
              items={itemsDelivery}
              current={
                diliveryPriceMemo === 10000
                  ? 2
                  : diliveryPriceMemo === 20000
                  ? 1
                  : orders?.orderItemsSelected.length === 0
                  ? 0
                  : 3
              }
            />
          </Col>
        </Row>
        <Row className="p-2 wrapper-title-order">
          <Col md={5} xs={9}>
            <Checkbox
              onChange={handleOnchangeCheckAll}
              checked={listChecked?.length === orders?.orderItems?.length}
            >
              Tất cả ({orders?.orderItems?.length} sản phẩm)
            </Checkbox>
          </Col>
          <Col
            md={2}
            className=" d-none d-md-flex align-items-center justify-content-center"
          >
            Đơn Giá
          </Col>
          <Col
            md={2}
            className=" d-none d-md-flex align-items-center justify-content-center"
          >
            Số Lượng
          </Col>
          <Col
            md={2}
            className="d-none d-md-flex align-items-center justify-content-center"
          >
            Thành Tiền
          </Col>
          <Col
            md={1}
            xs={2}
            className="d-flex align-items-center justify-content-center"
          >
            <RiDeleteBin6Line onClick={handleRemoveAllOrder} />
          </Col>
        </Row>
        {orders?.orderItems?.length > 0 ? (
          <div className="p-2 mt-3 wrapper-title-order">
            {orders?.orderItems?.map((order: any, index: number) => (
              <Row className="mt-2">
                <Col md={5} xs={12}>
                  <Checkbox
                    onChange={onChange}
                    checked={listChecked.includes(order?.product)}
                    value={order?.product}
                  >
                    <div className="name-product-order">
                      <img src={order?.image} alt="" className="img-fluid" />
                      <div>{order?.name}</div>
                    </div>
                  </Checkbox>
                </Col>
                <Col
                  md={2}
                  xs={4}
                  className="d-flex align-items-center justify-content-center"
                >
                  <div className="price-product-order">
                    <div className="product-real-price-order">
                      {convertPrice(order.price)}
                    </div>
                  </div>
                </Col>
                <Col
                  md={2}
                  xs={3}
                  className="d-flex align-items-center justify-content-center"
                >
                  <div>
                    <div className="group-btn-quantity-product-detail">
                      <div
                        onClick={() =>
                          handelDecrementProduct(
                            order?.product,
                            order?.amount === 1
                          )
                        }
                      >
                        <img
                          src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-remove.svg"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                      <div>{order?.amount}</div>
                      <div
                        onClick={() =>
                          handelIncrementProduct(
                            order?.product,
                            order?.amount === order.countInstock
                          )
                        }
                      >
                        <img
                          src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-add.svg"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                </Col>
                <Col
                  md={2}
                  xs={4}
                  className="d-flex align-items-center justify-content-center"
                >
                  <div className="product-final-price-order">
                    {convertPrice(order?.price * order?.amount)}
                  </div>
                </Col>
                <Col
                  md={1}
                  xs={1}
                  className="d-flex align-items-center justify-content-center"
                >
                  <RiDeleteBin6Line
                    className="icon-remove-product-order"
                    onClick={() => handleRemoveOrder(order?.product)}
                  />
                </Col>
              </Row>
            ))}
          </div>
        ) : (
          <div className="mt-3 p-2 bg-white text-center">
            Chưa có sản phẩm nào cả
          </div>
        )}
      </Col>
      <Col md={3}>
        <div className="wrapper-address-order p-2">
          <div className="d-flex align-items-center justify-content-between">
            <div>Giao tới:</div>
            <button onClick={handleChangeAddress}>Thay đổi</button>
          </div>
          <div>{`${user?.address} - ${user?.city}`}</div>
        </div>

        <div className="bg-white p-2 mt-2 text-secondary">
          <div className="price-order-responsive">
            <div>Tạm Tính :</div>
            <div className="text-dark fw-bold"> {convertPrice(priceMemo)}</div>
          </div>
          <div className="price-order-responsive">
            <div>Giảm Giá :</div>
            <div>{convertPrice(priceDiscountMemo)}</div>
          </div>
          <div className="price-order-responsive">
            <div>Phí giao hàng:</div>
            <div>{convertPrice(diliveryPriceMemo)}</div>
          </div>
          <hr />
          <div className="price-order-responsive">
            <div>Tổng Tiền:</div>
            <div className="text-danger fw-bold">
              {convertPrice(totalPriceMemo)}
            </div>
          </div>
        </div>
        <button className="btn-buy-order mt-3 p-3 " onClick={handleAddCard}>
          Mua Hàng
        </button>
      </Col>
    </Row>
  );
};

export default Order;
