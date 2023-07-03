import {
  imageSideBarOfCategorys,
  imageSideBarOfOutStandings,
} from "../../Image/Image";
import "./Sidebar.scss";

const Sidebar = () => {
  return (
    <div className="wrapper-sideBar ">
      <div className="wrapper-item-sidebar p-2">
        <h6>Nổi bật</h6>
        {imageSideBarOfOutStandings.map((imageSideBarOfOutStanding) => (
          <div className="item-sidebar" key={imageSideBarOfOutStanding.id}>
            <img
              src={imageSideBarOfOutStanding.imageOutStanding}
              alt=""
              className="img-fluid image-sidebar"
            />
            <div className="text-item-sidebar">
              {imageSideBarOfOutStanding.nameOutStanding}
            </div>
          </div>
        ))}
      </div>
      <div className="wrapper-item-sidebar p-2 mt-3">
        <h6>Danh mục</h6>
        {imageSideBarOfCategorys.map((imageSideBarOfCategory) => (
          <div className="item-sidebar" key={imageSideBarOfCategory.id}>
            <img
              src={imageSideBarOfCategory.imageCategory}
              alt=""
              className="img-fluid image-sidebar"
            />
            <div className="text-item-sidebar">
              {imageSideBarOfCategory.nameCategory}
            </div>
          </div>
        ))}
      </div>
      <div className="wrapper-item-sidebar p-2 mt-3 mb-5">
        <div className="item-sidebar">
          <img
            src="https://salt.tikicdn.com/cache/100x100/ts/upload/08/2f/14/fd9d34a8f9c4a76902649d04ccd9bbc5.png.webp"
            alt=""
            className="img-fluid image-sidebar"
          />
          <div className="text-item-sidebar">Bán Hàng Cùng PhucKi</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
