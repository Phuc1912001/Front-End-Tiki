import { useEffect, useState } from "react";
import * as orderService from "../../services/orderService";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/type";
import { convertPrice, orderContant } from "../../utils";
import TableComponent from "../TableComponent/TableComponent";

type PaymentMethods = {
  later_money: string;
  paypal: string;
};

const AdminOrder = () => {
  const user = useSelector((state: RootState) => state?.user);

  const [allOrderAdmin, setAllOrderAdmin] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const getAllOrder = async () => {
    setLoading(true);
    const res = await orderService.getAllOrder();
    setAllOrderAdmin(res.data);
    setLoading(false);
  };
  useEffect(() => {
    getAllOrder();
  }, []);

  const columns = [
    {
      title: "User name",
      dataIndex: "userName",
      sorter: (a: any, b: any) => a.userName.length - b.userName.length,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a: any, b: any) => a.phone.length - b.phone.length,
    },
    {
      title: "Address",
      dataIndex: "address",
      sorter: (a: any, b: any) => a.address.length - b.address.length,
    },
    {
      title: "Paided",
      dataIndex: "isPaid",
      sorter: (a: any, b: any) => a.isPaid.length - b.isPaid.length,
    },
    {
      title: "Shipped",
      dataIndex: "isDelivered",
      sorter: (a: any, b: any) => a.isDelivered.length - b.isDelivered.length,
    },
    {
      title: "Payment method",
      dataIndex: "paymentMethod",
      sorter: (a: any, b: any) =>
        a.paymentMethod.length - b.paymentMethod.length,
    },
    {
      title: "Total price",
      dataIndex: "totalPrice",
      sorter: (a: any, b: any) => a.totalPrice.length - b.totalPrice.length,
    },
  ];

  const dataTable =
    allOrderAdmin?.length &&
    allOrderAdmin?.map((order: any) => {
      return {
        ...order,
        key: order._id,
        userName: order?.shippingAddress?.fullName,
        phone: order?.shippingAddress?.phone,
        address: order?.shippingAddress?.address,
        paymentMethod:
          orderContant.payment[order.paymentMethod as keyof PaymentMethods],
        isPaid: order?.isPaid ? "TRUE" : "FALSE",
        isDelivered: order?.isDelivered ? "TRUE" : "FALSE",
        totalPrice: convertPrice(order?.totalPrice),
      };
    });

  return (
    <div className="mt-3">
      <TableComponent columns={columns} isLoading={loading} data={dataTable} />
    </div>
  );
};

export default AdminOrder;
