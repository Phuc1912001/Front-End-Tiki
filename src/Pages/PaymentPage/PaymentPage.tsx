import { useEffect, useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./PaymentPage.scss";
import { AppDispatch, RootState } from "../../Redux/type";
import { useDispatch, useSelector } from "react-redux";
import {
  removeAllOrderProduct,
  selectedOrder,
} from "../../Redux/Feature/orderSlice";
import { convertPrice } from "../../utils";
import { useLocation, useNavigate } from "react-router-dom";
import * as message from "../../components/Message/Message";
import type { RadioChangeEvent } from "antd";
import { Radio } from "antd";
import * as orderService from "../../services/orderService";

const PaymentPage = () => {
  const location = useLocation();
  const orders: any = useSelector<RootState>((store) => store.order);
  const user: any = useSelector<RootState>((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [delivery, setDelivery] = useState("fast");
  const [payment, setPayment] = useState("later_money");

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

  const diliveryPriceMemo = 10000;

  const totalPriceMemo = useMemo(() => {
    return (
      Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo)
    );
  }, [priceMemo, priceDiscountMemo, diliveryPriceMemo]);

  const handleAddOrder = async () => {
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
  };

  const handleChangeAddress = () => {
    navigate("/profile", { state: location?.pathname });
  };
  return (
    <Row>
      <Col md={9}>
        <div>
          <Radio.Group onChange={handleDilivery} value={delivery}>
            <Radio value="fast">
              <span style={{ color: "#ea8500", fontWeight: "bold" }}>FAST</span>
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
        <div>
          <Radio.Group onChange={handlePayment} value={payment}>
            <Radio value="later_money">Thanh toán tiền mặt khi nhận hàng</Radio>
          </Radio.Group>
        </div>
      </Col>
      <Col md={3}>
        <div>địa chỉ gaio hang:</div>
        <div>{`${user?.address} - ${user?.city}`}</div>
        <button onClick={handleChangeAddress}>đổi địa chỉ</button>
        <div>tạm tính :{convertPrice(priceMemo)} </div>
        <div>Giảm Giá : {convertPrice(priceDiscountMemo)} </div>
        <div>Phí giao hàng: {convertPrice(diliveryPriceMemo)} </div>
        <div>Total Price: {convertPrice(totalPriceMemo)} </div>
        <button onClick={handleAddOrder}>mua luôn</button>
      </Col>
    </Row>
  );
};

export default PaymentPage;
