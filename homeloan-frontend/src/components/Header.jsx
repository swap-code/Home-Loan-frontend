import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

const Header = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { email, role } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!email || !role) nav("/");
  }, [role, email]);

  return (
    <Navbar bg="dark" expand="lg" variant="dark" collapseOnSelect>
      <Container fluid>
        <Navbar.Brand>
          <i className=" fa-xl text-light fa-thin fa-building-columns ms-2 me-1"></i>
          <span> The Indian Bank</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="my-2 my-lg-0 ms-auto me-3"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {!email ? (
              <>
                <Nav.Link
                  onClick={() => {
                    nav("/");
                  }}
                >
                  <i className="fa-regular fa-home fa-lg" /> Home
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    nav("/login");
                  }}
                >
                  <i className="fa-regular fa-user fa-lg" /> Login/Signup
                </Nav.Link>
              </>
            ) : (
              <NavDropdown
                title={
                  <>
                    <i className="fa-regular fa-user fa-lg me-2" />
                    {email}
                  </>
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item
                  onClick={() => {
                    role === "Advisor" && nav("/AdvisorDashboard");
                    role === "User" && nav("/UserDashboard");
                  }}
                >
                  Dashboard
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    nav("/changePassword");
                  }}
                >
                  Change Password
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  LogOut
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
