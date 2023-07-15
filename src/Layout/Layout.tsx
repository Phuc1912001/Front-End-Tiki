import { Container, Row, Col } from "react-bootstrap";
import { Outlet, useLocation } from "react-router-dom";
import "./Layout.scss";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar";

const Layout = () => {
  const location = useLocation();
  return (
    <div>
      <Container className="layout-container-header p-0" fluid>
        <div>
          <Header />
        </div>
      </Container>
      <Container className="layout-container-body p-0 pt-3" fluid>
        <div>
          <Container>
            <Row>
              {location.pathname === "/" && (
                <Col md={2} className="p-0">
                  <Sidebar />
                </Col>
              )}
              <Col md={location.pathname === "/" ? 10 : 12}>
                <div>
                  <Outlet />
                  <Footer />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </Container>
    </div>
  );
};

export default Layout;
