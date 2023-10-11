import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset, signup } from "../features/auth/authSlice";
import Loader from "./Loader";
import { getCountries } from "../features/country/countrySlice";
import { getStates } from "../features/state/stateSlice";
import { getCities } from "../features/city/citySlice";

const Signup = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    countryCode: "",
    stateCode: "",
    cityCode: "",
  });
  const { countries } = useSelector((state) => state.country);
  const { cities } = useSelector((state) => state.city);
  const { states } = useSelector((state) => state.state);
  const { role, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || role) {
      toast.success(message);
      nav("/login");
    }
    dispatch(getCountries());
    dispatch(reset());
  }, [isSuccess, isError, message]);

  const handleChange = (e) =>
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });

  const handleCountryChange = (e) => {
    if (e.target.value !== "") {
      var country = JSON.parse(e.target.value);
      setSignupForm({ ...signupForm, countryCode: country?.countryCode });
      dispatch(getStates(country?.countryId));
    } else {
      setSignupForm({
        ...signupForm,
        countryCode: "",
        stateCode: "",
        cityCode: "",
      });
    }
  };

  const handleStateChange = (e) => {
    if (e.target.value !== "") {
      var state = JSON.parse(e.target.value);
      setSignupForm({ ...signupForm, stateCode: state?.stateCode });
      dispatch(getCities(state?.stateId));
    } else {
      setSignupForm({ ...signupForm, stateCode: "", cityCode: "" });
    }
  };

  const handleCityChange = (e) => {
    if (e.target.value !== "") {
      var city = JSON.parse(e.target.value);
      setSignupForm({ ...signupForm, cityCode: city?.cityCode });
    } else {
      setSignupForm({ ...signupForm, cityCode: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !signupForm.name ||
      !signupForm.email ||
      !signupForm.password ||
      !signupForm.phone ||
      !signupForm.countryCode ||
      !signupForm.stateCode ||
      !signupForm.cityCode
    ) {
      toast.error("Please fill in all the fields");
      return;
    }

    if (signupForm.name.length < 2) {
      toast.error("Name must be atleast 2 characters");
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(signupForm.name)) {
      toast.error("Enter proper name");
      return;
    }

    // phone validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupForm.email)) {
      toast.error("Enter proper email");
      return;
    }

    if (signupForm.password < 8) {
      toast.error("Must be 8 char long");
      return;
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        signupForm.password
      )
    ) {
      toast.error(
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special character, and be at least 8 characters long."
      );
      return;
    }

    if (!/^\d{10}$/.test(signupForm.phone)) {
      toast.error("Enter proper phone");
      return;
    }

    // country, state, city validation
    if (!signupForm.countryCode) {
      toast.error("Select a country");
      return;
    }
    if (!signupForm.stateCode) {
      toast.error("Select a state");
      return;
    }
    if (!signupForm.cityCode) {
      toast.error("Select a city");
      return;
    }

    dispatch(signup(signupForm));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container fluid>
      <Row>
        <Col
          md={12}
          lg={6}
          className="d-flex align-items-center justify-content-cente"
        >
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
          className="d-flex align-items-center justify-content-center p-5"
        >
          <Card className="w-100 shadow mt-5 m-auto">
            <Card.Body className="mx-5">
              <Form onSubmit={handleSubmit} className="p-3 py-2">
                <div className="text-center">
                  <i className="fa fa-duotone py-2 fa-classic fs-1 fa-user" />
                </div>
                <h2 className="text-center py-2">Signup</h2>
                <Form.Group controlId="formBasicEmail" className="p-2 py-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter Full Name"
                    vale={signupForm.name}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail" className="p-2 py-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    vale={signupForm.email}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword" className="p-2 py-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={signupForm.password}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPhone" className="p-2 py-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="number"
                    name="phone"
                    placeholder="Enter Phone Number"
                    value={signupForm.phone}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group
                      controlId="formBasicCountry"
                      className="p-2 py-3"
                    >
                      <Form.Label>Country</Form.Label>
                      <Form.Select
                        name="country"
                        onChange={handleCountryChange}
                      >
                        <option value="" default>
                          Select Country Code
                        </option>
                        {countries?.map((country) => (
                          <option
                            value={JSON.stringify(country)}
                            key={country.countryCode}
                          >
                            {country.countryName}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formBasicState" className="p-2 py-3">
                      <Form.Label>State</Form.Label>
                      <Form.Select
                        name="state"
                        onChange={handleStateChange}
                        disabled={signupForm.countryCode === "" ? true : false}
                      >
                        <option value="" default>
                          Select State Code
                        </option>
                        {states?.map((state) => (
                          <option
                            value={JSON.stringify(state)}
                            key={state.stateCode}
                          >
                            {state.stateName}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group controlId="formBasicState" className="p-2 py-3">
                      <Form.Label>City</Form.Label>
                      <Form.Select
                        name="city"
                        onChange={handleCityChange}
                        disabled={signupForm.stateCode === "" ? true : false}
                      >
                        <option value="" default>
                          Select City Code
                        </option>
                        {cities?.map((city) => (
                          <option
                            value={JSON.stringify(city)}
                            key={city.cityCode}
                          >
                            {city.cityName}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <div className="py-3">
                  <Button
                    variant="dark"
                    type="submit"
                    className="my-2 mx-2 px-3"
                  >
                    SignIn
                  </Button>
                </div>
                <div className="p-2 text-center">
                  Doesn't have an account? <Link to="/signup">Signup</Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
