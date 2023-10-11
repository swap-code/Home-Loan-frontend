import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdvisorSidebar from "./AdvisorSidebar";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { createState, reset } from "../features/state/stateSlice";
import { getCountries } from "../features/country/countrySlice";

const AdvisorAddState = () => {
  const { email, role } = useSelector((state) => state.auth);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.state
  );
  const { countries } = useSelector((state) => state.country);

  const [stateForm, setStateForm] = useState({
    stateName: "",
    stateCode: "",
  });
  const [countryId, setCountryId] = useState("");

  useEffect(() => {
    console.log(role, email);
    if (!email || role !== "Advisor") {
      nav("/login");
    }
  }, [email, role]);

  useEffect(() => {
    dispatch(reset());
    dispatch(getCountries());
  }, []);

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]);

  const handleChange = (e) =>
    setStateForm({ ...stateForm, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks
    if (countryId.trim() === "") {
      toast.error("Please select a country.");
      return;
    }

    if (stateForm.stateName.trim() === "") {
      toast.error("Please enter the state name.");
      return;
    }

    if (stateForm.stateCode.trim() === "") {
      toast.error("Please enter the state code.");
      return;
    }

    if (stateForm.stateCode.length !== 3) {
      toast.error("State code must be 3 characters.");
      return;
    }

    // Dispatch createState action
    dispatch(createState({ countryId, state: stateForm })).then(() => {
      dispatch(reset());
      toast.success("State created successfully");
      nav("/AdvisorDashboard/State");
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
                <h3 className="text-center pb-2"> Add New State</h3>
                <Form
                  onSubmit={handleSubmit}
                  className="border rounded-2 p-3  py-4 shadow"
                >
                  <Form.Group className="mb-3 py-2">
                    <Form.Label htmlFor="countrySelect">Country</Form.Label>
                    <Form.Select
                      id="countrySelect"
                      type="text"
                      name="countryId"
                      value={countryId}
                      onChange={(e) => setCountryId(e.target.value)}
                    >
                      <option value="" disabled>
                        Select Country
                      </option>
                      {countries?.map((country) => (
                        <option
                          key={country?.countryId}
                          value={country.countryId}
                        >
                          {country.countryName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group
                    className="mb-3 py-2"
                    controlId="formBasicPropertyStateName"
                  >
                    <Form.Label>State Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="stateName"
                      placeholder="Enter State Name"
                      value={stateForm?.stateName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 py-2"
                    controlId="formBasicPropertyStateCode"
                  >
                    <Form.Label>State Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="stateCode"
                      placeholder="Enter State Code"
                      value={stateForm?.stateCode}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Button variant="dark" type="submit">
                    Create State
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

export default AdvisorAddState;
