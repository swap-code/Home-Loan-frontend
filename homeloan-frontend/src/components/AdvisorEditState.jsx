import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AdvisorSidebar from "./AdvisorSidebar";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import Loader from "./Loader";
import { toast } from "react-toastify";
import {
  createState,
  getState,
  reset,
  updateState,
} from "../features/state/stateSlice";
import { getCountries } from "../features/country/countrySlice";

const AdvisorEditState = () => {
  const { email, role } = useSelector((state) => state.auth);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.state
  );

  const [stateForm, setStateForm] = useState({
    stateName: "",
    stateCode: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log(role, email);
    if (!email || role !== "Advisor") {
      nav("/login");
    }
  }, [email, role]);

  useEffect(() => {
    dispatch(reset());
    dispatch(getState(params.id)).then((action) => {
      setStateForm(action.payload);
    });
  }, [params.id]);

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]);

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!stateForm.stateName) {
      errors.stateName = "State name is required";
      valid = false;
    }

    if (!stateForm.stateCode) {
      errors.stateCode = "State code is required";
      valid = false;
    }

    if (stateForm.stateCode.length !== 3) {
      errors.stateCodeChar = "State code must be 3 characters";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleChange = (e) =>
    setStateForm({ ...stateForm, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(stateForm);

    if (validateForm()) {
      dispatch(updateState(stateForm)).then(() => {
        toast.success("Updated Successfully");
        nav("/AdvisorDashboard/State");
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
                <h3 className="text-center pb-2"> Edit State</h3>
                <Form
                  onSubmit={handleSubmit}
                  className="border rounded-2 p-3  py-4 shadow"
                >
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
                      isInvalid={!!errors.stateName}
                    />
                    {errors.stateName && (
                      <Form.Control.Feedback type="invalid">
                        {errors.stateName}
                      </Form.Control.Feedback>
                    )}
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
                      isInvalid={!!errors.stateCode || !!errors.stateCodeChar}
                    />
                    {errors.stateCode && (
                      <Form.Control.Feedback type="invalid">
                        {errors.stateCode}
                      </Form.Control.Feedback>
                    )}
                    {!errors.stateCode && errors.stateCodeChar && (
                      <Form.Control.Feedback type="invalid">
                        {errors.stateCodeChar}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <Button variant="dark" type="submit">
                    Update State
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

export default AdvisorEditState;
