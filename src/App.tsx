import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import NotFound from "./Pages/NotFound/NotFound";
import Astra from "./Pages/Astra/Astra";
import Order from "./Pages/Order/Order";
import MyOrder from "./Pages/MyOrder/MyOrder";
import AdminPage from "./Pages/AdminPage/AdminPage";
import { useSelector } from "react-redux";
import { RootState } from "./Redux/type";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import TypeProductPage from "./Pages/TypeProductPage/TypeProductPage";
import { createContext, useState } from "react";
import PaymentPage from "./Pages/PaymentPage/PaymentPage";
import OrderSucess from "./Pages/OrderSucess/OrderSucess";
import DetailOrderPage from "./Pages/DetailOrderPage/DetailOrderPage";

export const myModalContext = createContext(null);

function App() {
  const user = useSelector((state: RootState) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const showModal = () => {
    console.log("alo");

    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const toggleLogin = () => {
    setIsLogin(!isLogin);
  };

  const values: any = {
    isModalOpen,
    setIsModalOpen,
    isLogin,
    setIsLogin,
    showModal,
    handleCancel,
    toggleLogin,
  };

  const adminElement = user.isAdmin ? (
    <AdminPage />
  ) : (
    <div>you are not admin</div>
  );
  console.log("user.isAdmin", user.isAdmin);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "astra",
          element: <Astra />,
        },
        {
          path: "order",
          element: <Order />,
        },
        {
          path: "my-order",
          element: <MyOrder />,
        },

        {
          path: "/details-order/:id",
          element: <DetailOrderPage />,
        },
        {
          path: "system/admin",
          element: adminElement,
        },
        {
          path: "product-detail/:id",
          element: <ProductDetail />,
        },
        {
          path: "product/:type",
          element: <TypeProductPage />,
        },
        {
          path: "payment",
          element: <PaymentPage />,
        },
        {
          path: "order-success",
          element: <OrderSucess />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return (
    <myModalContext.Provider value={values}>
      <RouterProvider router={router} />
    </myModalContext.Provider>
  );
}

export default App;
