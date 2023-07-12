import { useMemo, useState } from "react";
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
} from "../../Redux/Feature/orderSlice";
import { convertPrice } from "../../utils";

const Order = () => {
  const [numProduct, setNumProduct] = useState<number>(1);
  const [listChecked, setListChecked] = useState<any>([]);

  const orders: any = useSelector<RootState>((store) => store.order.orderItems);
  console.log("orders in order", orders);

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
      orders?.forEach((item: any) => {
        newListChecked.push(item?.product);
      });
      setListChecked(newListChecked);
    } else {
      setListChecked([]);
    }
  };

  const priceMemo = useMemo(() => {
    const result = orders?.reduce((total: any, cur: any) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [orders]);
  console.log("priceMemo", priceMemo);

  const priceDiscountMemo = useMemo(() => {
    const result = orders?.reduce((total: any, cur: any) => {
      const totalDiscount = cur.discount ? cur.discount : 0;
      return total + (priceMemo * (totalDiscount * cur.amount)) / 100;
    }, 0);
    if (Number(result)) {
      return result;
    }
    return 0;
  }, [orders]);

  const diliveryPriceMemo = useMemo(() => {
    if (priceMemo >= 20000 && priceMemo < 500000) {
      return 10000;
    } else if (priceMemo >= 500000 || orders?.length === 0) {
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

  const handelIncrementProduct = (productId: any) => {
    console.log("productId in order", productId);

    dispatch(increaseAmount({ idProduct: productId }));
  };

  const handelDecrementProduct = (productId: any) => {
    console.log("giảm");

    dispatch(decreaseAmount({ idProduct: productId }));
  };

  const handleRemoveOrder = (productId: any) => {
    dispatch(removeOrderProduct({ idProduct: productId }));
  };

  const handleRemoveAllOrder = () => {
    if (listChecked?.length > 1) {
      dispatch(removeAllOrderProduct({ listChecked }));
    }
  };

  return (
    <Row>
      <Col md={9}>
        <Row className="p-2 wrapper-title-order">
          <Col md={5}>
            <Checkbox
              onChange={handleOnchangeCheckAll}
              checked={listChecked?.length === orders?.length}
            >
              Tất cả ({orders.length} sản phẩm)
            </Checkbox>
          </Col>
          <Col
            md={2}
            className="d-flex align-items-center justify-content-center"
          >
            Đơn Giá
          </Col>
          <Col
            md={2}
            className="d-flex align-items-center justify-content-center"
          >
            Số Lượng
          </Col>
          <Col
            md={2}
            className="d-flex align-items-center justify-content-center"
          >
            Thành Tiền
          </Col>
          <Col
            md={1}
            className="d-flex align-items-center justify-content-center"
          >
            <RiDeleteBin6Line onClick={handleRemoveAllOrder} />
          </Col>
        </Row>
        <div className="p-2 mt-3 wrapper-title-order">
          {orders.map((order: any, index: number) => (
            <Row>
              <Col md={5}>
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
                className="d-flex align-items-center justify-content-center"
              >
                <div className="price-product-order">
                  <div className="product-real-price-order">
                    {convertPrice(order.price)}
                  </div>
                  <div className="product-discount-price-order">
                    {convertPrice(
                      (
                        order?.price /
                        (1 - (order?.discount || 0) / 100)
                      ).toFixed(0)
                    )}
                  </div>
                </div>
              </Col>
              <Col
                md={2}
                className="d-flex align-items-center justify-content-center"
              >
                <div>
                  <div className="group-btn-quantity-product-detail">
                    <div onClick={() => handelDecrementProduct(order?.product)}>
                      <img
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-remove.svg"
                        alt=""
                        className="img-fluid"
                      />
                    </div>

                    <input
                      value={order?.amount}
                      onChange={handleChangeValueInput}
                    />

                    <div onClick={() => handelIncrementProduct(order?.product)}>
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
                className="d-flex align-items-center justify-content-center"
              >
                <div className="product-final-price-order">
                  {convertPrice(order?.price * order?.amount)}
                </div>
              </Col>
              <Col
                md={1}
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
      </Col>
      <Col md={3}>
        <div>tạm tính :{convertPrice(priceMemo)} </div>
        <div>Giảm Giá : {convertPrice(priceDiscountMemo)} </div>
        <div>Phí giao hàng: {convertPrice(diliveryPriceMemo)} </div>
        <div>Total Price: {convertPrice(totalPriceMemo)} </div>
      </Col>
    </Row>
  );
};

export default Order;
