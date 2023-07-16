import { useState, useEffect } from "react";
import "./SideBarAcount.scss";
import { BiSolidUser, BiSolidMap } from "react-icons/bi";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { IoIosNotifications } from "react-icons/io";
import { HiReceiptRefund } from "react-icons/hi";
import { AiFillCreditCard, AiFillHeart, AiFillEye } from "react-icons/ai";
import { SiKickstarter } from "react-icons/si";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/type";
import { IUser } from "../../Type&Interface/UserType";

const SideBarAcount = () => {
  const [activeProfile, setActiveProfile] = useState(false);
  const [activeMyOrder, setActiveMyOrder] = useState(false);
  const location = useLocation();
  const nav = useNavigate();
  const user: IUser = useSelector((store: RootState) => store.user);

  const handleNavigateInfoAcount = () => {
    nav("/profile");
    setActiveProfile(true);
    setActiveMyOrder(false);
  };
  const handleNavigateMyOrder = () => {
    nav("/my-order");
    setActiveMyOrder(true);
    setActiveProfile(false);
  };

  useEffect(() => {
    if (location.pathname === "/profile") {
      setActiveProfile(true);
      setActiveMyOrder(false);
    }
    if (location.pathname === "/my-order") {
      setActiveMyOrder(true);
      setActiveProfile(false);
    }
  }, [location.pathname]);
  return (
    <div>
      <div className="img-sideBar-acount">
        <img src="https://salt.tikicdn.com/desktop/img/avatar.png" alt="" />
        <div className="name-sidebar-acount">
          <div>Tài khoản của :</div>
          <strong>{user?.name}</strong>
        </div>
      </div>
      <div
        className={`d-flex align-items-center gap-2 p-2 mt-2 item-sideBar-acount ${
          activeProfile ? "activeSideBarAcount" : ""
        } `}
        onClick={handleNavigateInfoAcount}
      >
        <BiSolidUser />
        <div>Thông tin tài khoản</div>
      </div>
      <div
        className={`d-flex align-items-center gap-2 p-2 mt-2 item-sideBar-acount ${
          activeMyOrder ? "activeSideBarAcount" : ""
        } `}
        onClick={handleNavigateMyOrder}
      >
        <BsFillJournalBookmarkFill />
        <div>Quản lý đơn hàng</div>
      </div>
      <div className="d-flex align-items-center gap-2 p-2 mt-2 item-sideBar-acount">
        <IoIosNotifications />
        <div>Thông báo của tôi</div>
      </div>
      <div className="d-flex align-items-center gap-2 p-2 mt-2 item-sideBar-acount">
        <HiReceiptRefund />
        <div>Quản lý đổi trả</div>
      </div>
      <div className="d-flex align-items-center gap-2 p-2 mt-2 item-sideBar-acount">
        <BiSolidMap />
        <div>Sổ địa chỉ</div>
      </div>
      <div className="d-flex align-items-center gap-2 p-2 mt-2 item-sideBar-acount">
        <AiFillCreditCard />
        <div>Thông tin thanh toán</div>
      </div>
      <div className="d-flex align-items-center gap-2 p-2 mt-2 item-sideBar-acount">
        <BiSolidUser />
        <div>Đánh giá sản phẩm</div>
      </div>
      <div className="d-flex align-items-center gap-2 p-2 mt-2 item-sideBar-acount">
        <AiFillHeart />
        <div>Sản phẩm yêu thích </div>
      </div>
      <div className="d-flex align-items-center gap-2 p-2 mt-2 item-sideBar-acount">
        <SiKickstarter />
        <div>Nhận xét của tôi </div>
      </div>
      <div className="d-flex align-items-center gap-2 p-2 mt-2 item-sideBar-acount">
        <AiFillEye />
        <div>chia sẻ có lời </div>
      </div>
    </div>
  );
};

export default SideBarAcount;
