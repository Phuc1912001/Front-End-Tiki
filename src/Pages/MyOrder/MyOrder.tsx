import { useState } from "react";
import * as orderService from "../../services/orderService";
import "./MyOrder.scss";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/type";
import { useNavigate } from "react-router-dom";
import * as message from "../../components/Message/Message";
import { Col, Row } from "react-bootstrap";
import SideBarAcount from "../../components/SideBarAcount/SideBarAcount";
import { Button } from "antd";
import { convertPrice } from "../../utils";
import Loading from "../../components/Loading/Loading";

const MyOrder = () => {
  const user: any = useSelector((store: RootState) => store.user);
  const [loading, setLoading] = useState(false);

  const [myOrders, setMyOrders] = useState([]);
  const nav = useNavigate();

  const fetchMyOrders = async () => {
    setLoading(true);
    const resMyOrder = await orderService.getOrderByUserId(user?.id);
    console.log("resMyOrder", resMyOrder);
    setMyOrders(resMyOrder.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const handleDetailOrder = (id: any) => {
    nav(`/details-order/${id}`);
  };

  const handleCanceOrder = async (order: any) => {
    setLoading(true);
    try {
      const resCanceOrder = await orderService.cancelOrder(
        order._id,
        order?.orderItems,
        user.id
      );
      console.log("resCanceOrder", resCanceOrder);
      fetchMyOrders();
      message.success("huỷ đơn hàng thành công");
    } catch (error) {
      message.error(`${error}`);
    }
    setLoading(false);
  };

  return (
    <Row>
      <Col md={2} className="colum-sideBar-acount-none">
        <SideBarAcount />
      </Col>
      <Col md={10}>
        <Loading isLoading={loading}>
          <h5>Đơn hàng của tôi</h5>
          {myOrders.map((order: any) => (
            <div key={order?._id} className="mt-4 p-3 bg-white">
              <div>
                {order?.orderItems.map((orderItem: any) => (
                  <Row className="mt-2">
                    <Col
                      md={2}
                      xs={3}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <img
                        src={orderItem.image}
                        alt=""
                        className="img-fluid img-all-order"
                      />
                    </Col>
                    <Col
                      md={6}
                      xs={9}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <div> {orderItem.name}</div>
                    </Col>
                    <Col
                      md={1}
                      xs={3}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <div className="text-dark fw-bold">
                        x{orderItem.amount}
                      </div>
                    </Col>
                    <Col
                      md={3}
                      xs={9}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <div className="text-dark fw-bold">
                        {convertPrice(orderItem.price)}
                      </div>
                    </Col>
                  </Row>
                ))}
              </div>
              <hr />
              <div>
                <div className="d-flex align-items-center justify-content-end gap-2">
                  <div>Tổng tiền:</div>
                  <div className="text-danger fw-bold">
                    {convertPrice(order.totalPrice)}
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-3">
                  <Button
                    type="primary"
                    ghost
                    onClick={() => handleCanceOrder(order)}
                  >
                    Huỷ đơn hàng
                  </Button>
                  <Button
                    type="primary"
                    ghost
                    onClick={() => handleDetailOrder(order?._id)}
                  >
                    Xem chi tiết
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </Loading>
      </Col>
    </Row>
  );
};

export default MyOrder;
