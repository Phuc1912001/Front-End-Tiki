import { Container, Row, Col } from "react-bootstrap";
import "./Footer.scss";
import { aboutTikis, imgMethodFooters, supportCustomers } from "./dataFooter";

const Footer = () => {
  return (
    <Container>
      <Row className="bg-white mt-5 p-2">
        <Col md={2} sm={12} className="p-md-0">
          <h4 className="text-title-footer">Hỗ trợ khách hàng</h4>
          {supportCustomers.map((supportCustomer) => (
            <div key={supportCustomer.id} className="mt-2">
              <div className="text-content-footer">
                {supportCustomer.nameSupport}
                <span>{supportCustomer.phoneNumber}</span>
              </div>
              {supportCustomer.note && (
                <div className="text-content-footer">
                  {supportCustomer.note}
                </div>
              )}
            </div>
          ))}
        </Col>

        <Col md={2} sm={12} className="no-right-padding-footer-aboutTiki">
          <h4 className="text-title-footer">Về Tiki</h4>
          {aboutTikis.map((aboutTiki) => (
            <div key={aboutTiki.id} className="mt-2">
              <div className="text-content-footer">
                {aboutTiki.nameAboutTiki}
              </div>
            </div>
          ))}
        </Col>
        <Col md={3} sm={12}>
          <h4 className="text-title-footer">Hợp Tác Và Liên Kết</h4>
          <p className="text-content-footer">Quy chế hoạt động sàn GDTMDT</p>
          <p className="text-content-footer">Bán hàng cùng Tiki</p>
          <h4 className="text-title-footer">Chứng nhận bởi</h4>
          <img
            src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/bo-cong-thuong-2.png"
            className="img-fluid certification-footer"
            alt="a"
          />
          <img
            src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/bo-cong-thuong.svg"
            className="img-fluid"
            alt="a"
          />
        </Col>
        <Col md={2} sm={12}>
          <h4 className="text-title-footer">Phương Thức Thanh Toán</h4>
          <div className="wrapper-image-method-footer">
            {imgMethodFooters.map((imgMethodFooter) => (
              <div key={imgMethodFooter.id}>
                <img
                  src={imgMethodFooter.imageUrl}
                  className="img-fluid image-method-footer"
                  alt="a"
                />
              </div>
            ))}
          </div>
          <h4 className="text-title-delyver-footer mt-3">Dịch vụ giao hàng</h4>
          <img
            src="https://static.topcv.vn/company_logos/cong-ty-tnhh-tikinow-smart-logistics-603b82be436b1.jpg"
            className="img-fluid image-tikiNow-footer "
            alt="a"
          />
        </Col>
        <Col md={3} sm={12}>
          <h4 className="text-title-footer mb-4">Kết Nối Với Chúng Tôi</h4>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
            className="img-fluid image-facebook-footer"
            alt="a"
          />
          <img
            src="https://banghieuminhkhang.com/upload/Thu-vien/logo-youtube-vector-4.jpg"
            className="img-fluid image-youtube-footer"
            alt="a"
          />
          <img
            src="https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Zalo-Arc.png"
            className="img-fluid image-zalo-footer"
            alt="a"
          />
          <h4 className="text-title-delyver-footer mt-4">
            Tải ứng dụng trên điện thoại
          </h4>
          <div className="d-flex gap-2">
            <img
              src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/qrcode.png"
              alt=""
              className="img-fluid img-QRcode-footer "
            />
            <div>
              <img
                src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/appstore.png"
                alt=""
                className="img-fluid img-app-footer"
              />
              <img
                src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/playstore.png"
                alt=""
                className="img-fluid mt-1 img-app-footer"
              />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
