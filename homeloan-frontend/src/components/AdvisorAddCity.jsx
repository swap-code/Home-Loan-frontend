import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdvisorSidebar from "./AdvisorSidebar";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { createState, getStates, reset } from "../features/state/stateSlice";
import { getCountries } from "../features/country/countrySlice";
import { createCity, reset as cityReset } from "../features/city/citySlice";

const AdvisorAddCity = () => {
  const { email, role } = useSelector((state) => state.auth);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, message, isSuccess, states } = useSelector(
    (state) => state.state
  );
  const { countries } = useSelector((state) => state.country);

  const [cityForm, setCityForm] = useState({
    cityName: "",
    cityCode: "",
  });
  const [stateId, setStateId] = useState("");
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
    countryId !== "" && dispatch(getStates(countryId));
  }, [countryId]);

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]);

  const handleChange = (e) =>
    setCityForm({ ...cityForm, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks
    if (countryId === "") {
      toast.error("Please select a country.");
      return;
    }

    if (stateId === "") {
      toast.error("Please select a state.");
      return;
    }

    if (cityForm.cityName.trim() === "") {
      toast.error("Please enter the city name.");
      return;
    }

    if (cityForm.cityCode.trim() === "") {
      toast.error("Please enter the city code.");
      return;
    }

    if (cityForm.cityCode.length !== 3) {
      toast.error("City code must be 3 characters.");
      return;
    }

    // Dispatch createCity action
    dispatch(createCity({ stateId, city: cityForm })).then(() => {
      dispatch(reset());
      dispatch(cityReset());
      toast.success("City created successfully");
      nav("/AdvisorDashboard/City");
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
                <h3 className="text-center pb-2"> Add New City</h3>
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
                  <Form.Group className="mb-3 py-2">
                    <Form.Label htmlFor="stateSelect">State</Form.Label>
                    <Form.Select
                      id="stateSelect"
                      type="text"
                      name="stateId"
                      value={stateId}
                      onChange={(e) => setStateId(e.target.value)}
                    >
                      <option value="" disabled>
                        Select State
                      </option>
                      {states?.map((state) => (
                        <option key={state?.stateId} value={state.stateId}>
                          {state.stateName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group
                    className="mb-3 py-2"
                    controlId="formBasicPropertyStateName"
                  >
                    <Form.Label>City Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="cityName"
                      placeholder="Enter City Name"
                      value={cityForm?.stateName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 py-2"
                    controlId="formBasicPropertyStateCode"
                  >
                    <Form.Label>City Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="cityCode"
                      placeholder="Enter City Code"
                      value={cityForm?.stateCode}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Button variant="dark" type="submit">
                    Create City
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

export default AdvisorAddCity;
