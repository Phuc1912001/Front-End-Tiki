import { useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./PaymentPage.scss";
import { AppDispatch, RootState } from "../../Redux/type";
import { useDispatch, useSelector } from "react-redux";
import { removeAllOrderProduct } from "../../Redux/Feature/orderSlice";
import { convertPrice } from "../../utils";
import { useLocation, useNavigate } from "react-router-dom";
import * as message from "../../components/Message/Message";
import type { RadioChangeEvent } from "antd";
import { Radio } from "antd";
import * as orderService from "../../services/orderService";
import Loading from "../../components/Loading/Loading";

const PaymentPage = () => {
  const location = useLocation();
  const orders: any = useSelector<RootState>((store) => store.order);
  const user: any = useSelector<RootState>((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [delivery, setDelivery] = useState("fast");
  const [payment, setPayment] = useState("later_money");
  const [loading, setLoading] = useState(false);

  const handleDilivery = (e: RadioChangeEvent) => {
    setDelivery(e.target.value);
  };

  const handlePayment = (e: RadioChangeEvent) => {
    setPayment(e.target.value);
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
      return 5000;
    } else {
      return 20000;
    }
  }, [priceMemo]);

  const totalPriceMemo = useMemo(() => {
    return (
      Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo)
    );
  }, [priceMemo, priceDiscountMemo, diliveryPriceMemo]);

  const handleAddOrder = async () => {
    setLoading(true);
    if (
      orders?.orderItemsSelected &&
      user?.name &&
      user?.address &&
      user?.phone &&
      user?.city &&
      priceMemo &&
      user?.id
    ) {
      // eslint-disable-next-line no-unused-expressions
      const data = {
        orderItems: orders?.orderItemsSelected,
        fullName: user?.name,
        address: user?.address,
        phone: user?.phone,
        city: user?.city,
        paymentMethod: payment,
        itemsPrice: priceMemo,
        shippingPrice: diliveryPriceMemo,
        totalPrice: totalPriceMemo,
        user: user?.id,
        email: user?.email,
      };

      try {
        console.log("data", data);
        const createOrder = await orderService.createOrder(data);
        console.log("createOrder", createOrder);
        console.log("alo");

        const arrayOrdered: any = [];
        orders?.orderItemsSelected?.forEach((element: any) => {
          arrayOrdered.push(element.product);
        });
        dispatch(removeAllOrderProduct({ listChecked: arrayOrdered }));
        message.success("Đặt hàng thành công");
        navigate("/order-success", {
          state: {
            delivery,
            payment,
            orders: orders?.orderItemsSelected,
            totalPriceMemo: totalPriceMemo,
          },
        });
      } catch (error) {
        console.log("error khi tạo", error);
      }
    }
    setLoading(false);
  };

  const handleChangeAddress = () => {
    navigate("/profile", { state: location?.pathname });
  };
  return (
    <Loading isLoading={loading}>
      <Row>
        <Col md={9}>
          <div>
            <Radio.Group
              onChange={handleDilivery}
              value={delivery}
              className="d-flex flex-column p-4 gap-4 bg-white"
            >
              <Radio value="fast">
                <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                  FAST
                </span>
                Giao hàng tiết kiệm
              </Radio>
              <Radio value="gojek">
                <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                  GO_JEK
                </span>
                Giao hàng tiết kiệm
              </Radio>
            </Radio.Group>
          </div>
          <div className="p-4 bg-white mt-3">
            <Radio.Group onChange={handlePayment} value={payment}>
              <Radio value="later_money">
                Thanh toán tiền mặt khi nhận hàng
              </Radio>
            </Radio.Group>
          </div>
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
              <div className="text-dark fw-bold">
                {" "}
                {convertPrice(priceMemo)}
              </div>
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
          <button className="btn-buy-order mt-3 p-3 " onClick={handleAddOrder}>
            Đặt Hàng
          </button>
        </Col>
      </Row>
    </Loading>
  );
};

export default PaymentPage;
