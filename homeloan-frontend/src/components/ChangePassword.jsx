import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  login,
  logout,
  reset,
  resetPassword,
} from "../features/auth/authSlice";
import Loader from "./Loader";

const ChangePassword = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [changePasswordForm, setChangePasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const { role, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success(message);
      dispatch(logout());
      nav("/UserDashboard");
    }
    dispatch(reset());
  }, [isSuccess, isError, message]);

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!changePasswordForm.currentPassword) {
      errors.currentPassword = "Current password is required";
      valid = false;
    } else if (changePasswordForm.currentPassword.length < 8) {
      errors.currentPassword =
        "Current password must be at least 8 characters long";
      valid = false;
    }

    if (!changePasswordForm.newPassword) {
      errors.newPassword = "New password is required";
      valid = false;
    } else if (changePasswordForm.newPassword.length < 8) {
      errors.newPassword = "New password must be at least 8 characters long";
      valid = false;
    } else if (
      changePasswordForm.newPassword === changePasswordForm.currentPassword
    ) {
      errors.newPassword =
        "New password must be different from the current password";
      valid = false;
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        changePasswordForm.newPassword
      )
    ) {
      errors.newPassword =
        "New password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleChange = (e) =>
    setChangePasswordForm({
      ...changePasswordForm,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(changePasswordForm);
    if (validateForm()) {
      dispatch(resetPassword(changePasswordForm));
    }
  };

  const [errors, setErrors] = useState({});

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Container fluid>
      <Row>
        <Col md={12} lg={6}>
          <img
            src={
              "https://img.freepik.com/free-vector/finance-services-financial-transaction-e-commerce-e-payment_335657-3134.jpg?w=2000&t=st=1685374340~exp=1685374940~hmac=13c96d6a3d7d6c56700b2a0a0d1c0f3cd21321d80dd9a6d3082d49be1fd3832b"
            }
            alt="bank"
            className="w-100 p-1 p-md-4 mh-100"
          />
        </Col>
        <Col
          md={12}
          lg={6}
          className="mh-100 d-flex align-items-center justify-content-center"
        >
          <Card className="w-75 shadow mt-5 m-auto">
            <Card.Body className="mx-5">
              <Form onSubmit={handleSubmit} className="p-3 py-5">
                <div className="text-center">
                  <i className="fa fa-duotone py-2 fa-classic fs-1 fa-user" />
                </div>
                <h2 className="text-center py-2">Reset Password</h2>
                <Form.Group controlId="formBasicEmail" className="p-2 py-3">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="currentPassword"
                    placeholder="Enter Current Password"
                    vale={changePasswordForm.currentPassword}
                    onChange={handleChange}
                    isInvalid={!!errors.currentPassword}
                  />
                  {errors.currentPassword && (
                    <Form.Control.Feedback type="invalid">
                      {errors.currentPassword}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group controlId="formBasicPassword" className="p-2 py-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="newPassword"
                    placeholder="Enter New Password"
                    value={changePasswordForm.newPassword}
                    onChange={handleChange}
                    isInvalid={!!errors.newPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.newPassword}
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="py-3">
                  <Button
                    variant="dark"
                    type="submit"
                    className="my-2 mx-2 px-3"
                  >
                    Update Password
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ChangePassword;
