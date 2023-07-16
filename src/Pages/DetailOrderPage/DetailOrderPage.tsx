import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as orderService from "../../services/orderService";
import { Row, Col } from "react-bootstrap";
import SideBarAcount from "../../components/SideBarAcount/SideBarAcount";
import { convertPrice } from "../../utils";
import Loading from "../../components/Loading/Loading";
import "./DetailOrderPage.scss";

const DetailOrderPage = () => {
  const params = useParams();
  const { id } = params;
  const [orderDetail, setOrderDetail] = useState<any>();
  const [loading, setLoading] = useState(false);

  const fetchOderDetail = async () => {
    setLoading(true);
    const resOrderDetail = await orderService.getDetailsOrder(id);
    console.log("resOrderDetail", resOrderDetail);
    setOrderDetail(resOrderDetail.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchOderDetail();
  }, []);

  return (
    <Row>
      <Col md={2} className="colum-sideBar-acount-none">
        <SideBarAcount />
      </Col>
      <Col md={10}>
        <Loading isLoading={loading}>
          <h3>Chi tiết đơn hàng</h3>
          <div className="p-4 bg-white">
            <div>
              <Row className="header-detail-order-row">
                <Col
                  md={2}
                  className="d-flex align-items-center justify-content-center"
                >
                  sản phẩm
                </Col>
                <Col md={4}> </Col>
                <Col
                  md={2}
                  className="d-flex align-items-center justify-content-center"
                >
                  Số lượng
                </Col>
                <Col
                  md={2}
                  className="d-flex align-items-center justify-content-center"
                >
                  Giảm giá
                </Col>
                <Col
                  md={2}
                  className="d-flex align-items-center justify-content-center"
                >
                  Tạm tính
                </Col>
              </Row>

              {orderDetail?.orderItems.map((orderItem: any) => (
                <Row className="mt-3">
                  <Col
                    md={2}
                    xs={2}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <img src={orderItem.image} alt="" className="img-fluid" />
                  </Col>
                  <Col
                    md={4}
                    xs={10}
                    className="d-flex align-items-center justify-content-center"
                  >
                    {orderItem.name}
                  </Col>
                  <Col
                    md={2}
                    xs={2}
                    className="d-flex align-items-center justify-content-center"
                  >
                    x{orderItem.amount}
                  </Col>
                  <Col
                    md={2}
                    xs={7}
                    className="d-flex align-items-center justify-content-center"
                  >
                    {orderItem.discount}%
                  </Col>
                  <Col
                    md={2}
                    xs={3}
                    className="d-flex align-items-center justify-content-center text-dark fw-bold"
                  >
                    {convertPrice(orderItem?.price)}
                  </Col>
                </Row>
              ))}
            </div>
            <hr />
            <div>
              <div className="d-flex align-items-center justify-content-between gap-5">
                <div>Tạm tính :</div>
                <div className="text-dark fw-bold">
                  {convertPrice(orderDetail?.itemsPrice)}
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between gap-5">
                <div>Phí vận chuyển:</div>
                <div className="text-dark fw-bold">
                  {convertPrice(orderDetail?.shippingPrice)}
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between gap-5">
                <div>Tổng Tiền:</div>
                <div className="text-danger fw-bold">
                  {convertPrice(orderDetail?.totalPrice)}
                </div>
              </div>
            </div>
          </div>
        </Loading>
      </Col>
    </Row>
  );
};

export default DetailOrderPage;
