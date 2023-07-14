import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as orderService from "../../services/orderService";

const DetailOrderPage = () => {
  const params = useParams();
  const { id } = params;

  const [orderDetail, setOrderDetail] = useState();

  const fetchOderDetail = async () => {
    const resOrderDetail = await orderService.getDetailsOrder(id);
    console.log("resOrderDetail", resOrderDetail);
  };
  useEffect(() => {
    fetchOderDetail();
  }, []);

  return <div>DetailOrderPage</div>;
};

export default DetailOrderPage;
