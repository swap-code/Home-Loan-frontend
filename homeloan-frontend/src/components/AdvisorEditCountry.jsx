import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AdvisorSidebar from "./AdvisorSidebar";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import Loader from "./Loader";
import { toast } from "react-toastify";
import {
  createCountry,
  editCountry,
  getCountries,
  reset,
} from "../features/country/countrySlice";

const AdvisorEditCountry = () => {
  const { email, role } = useSelector((state) => state.auth);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.country
  );

  const [countryForm, setCountryForm] = useState({
    countryName: "",
    countryCode: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log(role, email);
    if (!email || role !== "Advisor") {
      nav("/login");
    }
  }, [email, role]);

  useEffect(() => {
    dispatch(getCountries()).then((action) => {
      var country = action.payload?.filter(
        (country) => country.countryId === params.id
      )[0];
      setCountryForm(country);
    });
    dispatch(reset());
  }, [params.id]);

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
      return;
    }
  }, [isError, isSuccess, message]);

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!countryForm.countryName) {
      errors.countryName = "Country name is required";
      valid = false;
    }

    if (!countryForm.countryCode) {
      errors.countryCode = "Country code is required";
      valid = false;
    }

    if (countryForm.countryCode.length !== 3) {
      errors.countryCodeChar = "Country code must be 3 characters";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleChange = (e) =>
    setCountryForm({ ...countryForm, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(countryForm);

    if (validateForm()) {
      dispatch(editCountry(countryForm)).then((action) => {
        toast.success("Country Updated Successfully!");
        nav("/AdvisorDashboard/Country");
      });
    }
  };

  return (
    <Container fluid className="p-0">
      <Row className="flex-nowrap m-0 p-0">
        <AdvisorSidebar />
        <Col className="col py-3">
          {isLoading ? (
            <Loader />
          ) : (
            <Row>
              <Col md={6} className="m-auto p-3">
                <h3 className="text-center pb-2"> Edit Country</h3>
                <Form
                  onSubmit={handleSubmit}
                  className="border rounded-2 p-3  py-4 shadow"
                >
                  <Form.Group
                    className="mb-3 py-2"
                    controlId="formBasicPropertyCountryName"
                  >
                    <Form.Label>Country Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="countryName"
                      placeholder="Enter Country Name"
                      value={countryForm?.countryName}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.countryName}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    className="mb-3 py-2"
                    controlId="formBasicPropertyCountryCode"
                  >
                    <Form.Label>Country Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="countryCode"
                      placeholder="Enter Country Code"
                      value={countryForm?.countryCode}
                      onChange={handleChange}
                      isInvalid={
                        !!errors.countryCode || !!errors.countryCodeChar
                      }
                    />
                    {errors.countryCode && (
                      <Form.Control.Feedback type="invalid">
                        {errors.countryCode}
                      </Form.Control.Feedback>
                    )}
                    {!errors.countryCode && errors.countryCodeChar && (
                      <Form.Control.Feedback type="invalid">
                        {errors.countryCodeChar}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <Button variant="dark" type="submit">
                    Update Country
                  </Button>
                </Form>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AdvisorEditCountry;
