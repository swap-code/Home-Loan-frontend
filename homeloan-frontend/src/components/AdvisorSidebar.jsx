import React from "react";
import { Col, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdvisorSidebar = () => {
  const nav = useNavigate();
  return (
    <Col className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
        <a
          href="/"
          className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span className="fs-5 d-none d-sm-inline">Menu</span>
        </a>
        <Nav
          className="flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          id="menu"
        >
          <Nav.Link onClick={() => nav("/AdvisorDashboard")}>
            <i className="fs-4 fa-home me-2 fa-regular " />
            <span className="ms-1 d-none d-sm-inline">Home</span>
          </Nav.Link>
          <Nav.Link onClick={() => nav("/AdvisorDashboard/Country")}>
            <i className="fs-4 me-3 fa-regular fa-earth-americas" />
            <span className="ms-1 d-none d-sm-inline">Country</span>
          </Nav.Link>
          <Nav.Link onClick={() => nav("/AdvisorDashboard/State")}>
            <i className="fs-4 me-3 fa-regular fa-location-dot" />
            <span className="ms-1 d-none d-sm-inline">State</span>
          </Nav.Link>
          <Nav.Link onClick={() => nav("/AdvisorDashboard/City")}>
            <i className="fs-4 me-3 fa-regular fa-building" />
            <span className="ms-1 d-none d-sm-inline">City</span>
          </Nav.Link>
          <Nav.Link onClick={() => nav("/AdvisorDashboard/AddBankPromotion")}>
            <i className="fs-4 me-2 fa-regular fa-megaphone" />
            <span className="ms-1 d-none d-sm-inline">Bank Promotions</span>
          </Nav.Link>
          <Nav.Link onClick={() => nav("/contactus")}>
            <i className="fs-4 me-2 fa-regular fa-address-card" />
            <span className="ms-1 d-none d-sm-inline">Contact Us</span>
          </Nav.Link>
          {/* <Nav.Link onClick={()=>nav('/UserDashboard/aboutus  ')}>
                        <i className="fs-4 me-2 fa-regular fa-circle-info" />
                        <span className="ms-2 d-none d-sm-inline">About</span>
                    </Nav.Link> */}
        </Nav>
      </div>
    </Col>
  );
};

export default AdvisorSidebar;
