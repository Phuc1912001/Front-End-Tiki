import { useState } from "react";
import * as orderService from "../../services/orderService";
import "./MyOrder.scss";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/type";
import { useNavigate } from "react-router-dom";

const MyOrder = () => {
  const user: any = useSelector((store: RootState) => store.user);
  console.log(user?.id);

  const [myOrders, setMyOrders] = useState([]);
  const nav = useNavigate();

  const fetchMyOrders = async () => {
    const resMyOrder = await orderService.getOrderByUserId(user?.id);
    console.log("resMyOrder", resMyOrder);
    setMyOrders(resMyOrder.data);
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const handleDetailOrder = (id: any) => {
    nav(`/details-order/${id}`);
  };

  return (
    <div>
      {myOrders.map((order: any) => (
        <div key={order?._id}>
          <div>thanh toán : chưa thanh toán </div>
          {order?.orderItems.map((orderItem: any) => (
            <div key={orderItem._id}>
              <img src={orderItem.image} alt="" className="img-fluid w-25" />
            </div>
          ))}

          <div>totalprice : {order?.totalPrice} </div>
          <div>
            <button>huỷ đơn hàng</button>
            <button onClick={() => handleDetailOrder(order?._id)}>
              xem chi tiết{" "}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrder;
