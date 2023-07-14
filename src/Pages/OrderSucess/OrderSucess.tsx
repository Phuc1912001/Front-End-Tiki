import { useLocation } from "react-router-dom";
import { orderContant } from "../../utils";

interface OrderContant {
  payment: {
    later_money: string;
    paypal: string;
  };
}

const OrderSucess = () => {
  const location = useLocation();
  const { state } = location;
  return (
    <div>
      <h3>Đơn hàng đặt thành công nhân</h3>
      <div>Phương thức giao hàng</div>
      <div>
        <span style={{ color: "#ea8500", fontWeight: "bold" }}>
          {state?.delivery}
        </span>
        Giao hàng tiết kiệm
      </div>
      <div>Phương thức thanh toán</div>
      <div>
        <span style={{ color: "#ea8500", fontWeight: "bold" }}>
          {((orderContant as OrderContant).payment as any)[state?.payment]}
        </span>
      </div>

      <div>các sản phẩm sẽ dk render từ state.orders</div>
      <div>{state?.totalPriceMemo}</div>
    </div>
  );
};

export default OrderSucess;
