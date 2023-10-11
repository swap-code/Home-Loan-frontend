import React, { useState } from 'react';
import { Col, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UserSidebar = () => {
  const nav = useNavigate();
  const [activeMenuItem, setActiveMenuItem] = useState('');

  const handleMenuItemClick = (menuItem) => {
    nav(menuItem);
    setActiveMenuItem(menuItem);
  };

  return (
    <Col className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
        <a
          href="/"
          className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span className="fs-5 d-none d-sm-inline">Menu</span>
        </a>
        <Nav className="flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
          <Nav.Link
            onClick={() => handleMenuItemClick('/UserDashboard')}
            className={activeMenuItem === '/UserDashboard' ? 'active' : ''}
          >
            <i className="fs-4 fa-home me-2 fa-regular " />
            <span className="ms-1 d-none d-sm-inline">Home</span>
          </Nav.Link>
          <Nav.Link
            onClick={() => handleMenuItemClick('/UserDashboard/addNewLoan')}
            className={activeMenuItem === '/UserDashboard/addNewLoan' ? 'active' : ''}
          >
            <i className="fs-4 me-2 fa-regular fa-money-check-dollar" />
            <span className="ms-1 d-none d-sm-inline">Apply Loan</span>
          </Nav.Link>
          <Nav.Link
            onClick={() => handleMenuItemClick('/UserDashboard/collaterals')}
            className={activeMenuItem === '/UserDashboard/collaterals' ? 'active' : ''}
          >
            <i className="fs-4 me-3 fa-regular fa-file-contract" />
            <span className="ms-1 d-none d-sm-inline">Collateral</span>
          </Nav.Link>
          <Nav.Link
            onClick={() => handleMenuItemClick('/contactus')}
            className={activeMenuItem === '/contactus' ? 'active' : ''}
          >
            <i className="fs-4 me-2 fa-regular fa-address-card" />
            <span className="ms-1 d-none d-sm-inline">Contact Us</span>
          </Nav.Link>
        </Nav>
      </div>
    </Col>
  );
};

export default UserSidebar;
