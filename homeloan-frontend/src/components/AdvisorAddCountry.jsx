import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdvisorSidebar from "./AdvisorSidebar";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import Loader from "./Loader";
import { toast } from "react-toastify";
import {
  createCountry,
  getCountries,
  reset,
} from "../features/country/countrySlice";

const AdvisorAddCountry = () => {
  const { email, role } = useSelector((state) => state.auth);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.country
  );

  const [countryForm, setCountryForm] = useState({
    countryName: "",
    countryCode: "",
  });

  useEffect(() => {
    console.log(role, email);
    if (!email || role !== "Advisor") {
      nav("/login");
    }
  }, [email, role]);

  useEffect(() => {
    dispatch(reset());
  }, []);

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]);

  const handleChange = (e) =>
    setCountryForm({ ...countryForm, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks
    if (countryForm.countryName.trim() === "") {
      toast.error("Please enter the country name.");
      return;
    }

    if (countryForm.countryCode.trim() === "") {
      toast.error("Please enter the country code.");
      return;
    }

    if (countryForm.countryCode.length !== 3) {
      toast.error("Country code must be 3 characters.");
      return;
    }

    // Dispatch createCountry action
    dispatch(createCountry(countryForm)).then(() => {
      toast.success("Country created successfully");
      nav("/AdvisorDashboard/Country");
    });
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
                <h3 className="text-center pb-2"> Add New Country</h3>
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
                    />
                  </Form.Group>
                  <Button variant="dark" type="submit">
                    Create Country
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

export default AdvisorAddCountry;
