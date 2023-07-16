import { useLocation } from "react-router-dom";
import { convertPrice, orderContant } from "../../utils";
import { Row, Col } from "react-bootstrap";
import "./OrderSucess.scss";
import { formattedDate } from "../../services/formatDate";

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
    <Row>
      <Col md={12} className="text-center">
        <h2>Bạn đã đặt hàng thành công</h2>
      </Col>
      <Col md={9}>
        <div className="p-4 bg-white">
          <div className="d-flex align-items-center justify-content-between">
            <div>Phương thức giao hàng : </div>
            <div>
              <span style={{ color: "#2889ca", fontWeight: "bold" }}>
                {state?.delivery}
              </span>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <div>Phương thức thanh toán : </div>
            <div>
              <span style={{ color: "#2889ca", fontWeight: "bold" }}>
                {
                  ((orderContant as OrderContant).payment as any)[
                    state?.payment
                  ]
                }
              </span>
            </div>
          </div>
          <hr />
          <div>
            {state?.orders.map((order: any) => (
              <Row>
                <Col
                  md={3}
                  xs={4}
                  className="d-flex align-items-center justify-content-center"
                >
                  <img src={order.image} alt="" className="img-fluid" />
                </Col>
                <Col
                  md={5}
                  xs={8}
                  className="d-flex align-items-center justify-content-center"
                >
                  {order.name}
                </Col>
                <Col
                  md={2}
                  xs={4}
                  className="d-flex align-items-center justify-content-center text-dark fw-bold"
                >
                  x{order.amount}
                </Col>
                <Col
                  md={2}
                  xs={8}
                  className="d-flex align-items-center justify-content-center text-dark fw-bold"
                >
                  {convertPrice(order.price)}
                </Col>
              </Row>
            ))}
          </div>
          <hr />
          <div className="d-flex align-items-center justify-content-between">
            <div>Tổng tiền:</div>
            <div className="text-danger fw-bold">
              {convertPrice(state?.totalPriceMemo)}
            </div>
          </div>
        </div>
      </Col>
      <Col md={3} className="code-order-success">
        <div className="p-2 bg-white">
          <div className="">
            Mã đơn hàng: <span className="text-dark fw-bold">19001008 </span>
          </div>
          <hr />
          <div className="d-flex d-md-block align-items-center justify-content-between">
            <div>Giao vào :</div>
            <div className="text-success fw-bold">{formattedDate}</div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default OrderSucess;
