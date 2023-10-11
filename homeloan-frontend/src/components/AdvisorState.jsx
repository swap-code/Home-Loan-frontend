import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdvisorSidebar from "./AdvisorSidebar";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import Loader from "./Loader";
import { toast } from "react-toastify";
import {
  deleteCountry,
  getCountries,
  reset,
  resetState,
} from "../features/country/countrySlice";
import {
  deleteState,
  getStates,
  resetState as stateReset,
} from "../features/state/stateSlice";

const AdvisorState = () => {
  const { email, role } = useSelector((state) => state.auth);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [country, setCountry] = useState("");
  const { countries } = useSelector((state) => state.country);
  const { states, isLoading } = useSelector((state) => state.state);

  let index = 1;

  useEffect(() => {
    console.log(role, email);
    if (!email || role !== "Advisor") {
      nav("/login");
    }
  }, [email, role]);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  useEffect(() => {
    dispatch(resetState());
    dispatch(stateReset());
    dispatch(reset);
    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    if (country !== "") {
      dispatch(getStates(country));
    }
  }, [country]);

  return (
    <Container fluid className="p-0">
      <Row className="flex-nowrap m-0 p-0">
        <AdvisorSidebar />
        <Col className="col py-3">
          <h2 className="fs-4 text-center fw-bold"> States </h2>
          <Row className="py-4">
            <Col md={2} className="me-4" />
            <Col md={3} className="">
              <Form>
                <Form.Group className="mb-3" controlId="formBasicCountry">
                  <Form.Label>Select Country</Form.Label>
                  <Form.Control
                    as="select"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Country
                    </option>
                    {countries?.map((country) => (
                      <option
                        key={country?.countryCode}
                        value={country?.countryId}
                      >
                        {country?.countryName}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Form>
            </Col>
          </Row>

          {isLoading ? (
            <Loader />
          ) : (
            <Container>
              <Row>
                <Col md={8} className="m-auto ">
                  {states?.length > 0 ? (
                    <Table responsive="sm" bordered className=" m-auto">
                      <thead className="fw-bold">
                        <tr>
                          <th className="px-2">#</th>
                          <th>State Name</th>
                          <th>State Code</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody className="verticalAlignMiddle">
                        {states?.map((state) => (
                          <tr key={index}>
                            <td>{index++}</td>
                            <td>{state?.stateName}</td>
                            <td>{state?.stateCode}</td>
                            <td>
                              <i
                                className="fa-regular p-2 m-1 fa-pen-to-square fa-md pointer text-primary border rounded-2"
                                onClick={() => {
                                  nav(
                                    `/AdvisorDashboard/State/edit/${state?.stateId}`
                                  );
                                }}
                              />
                              <i
                                className="fa-regular p-2 m-1 fa-trash fa-md pointer text-danger border rounded-2"
                                onClick={() => {
                                  dispatch(deleteState(state?.stateId)).then(
                                    () => {
                                      toast.success("Deleted Successfully");
                                      country !== "" &&
                                        dispatch(getStates(country));
                                    }
                                  );
                                }}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <h2 className="text-center m-3 fs-4">No Content Found</h2>
                  )}
                </Col>
              </Row>
              <Row>
                <Col sm={6} className="m-auto text-center p-4">
                  <Button
                    variant="dark"
                    onClick={() => {
                      nav("/AdvisorDashboard/State/add");
                    }}
                  >
                    Add New State
                  </Button>
                </Col>
              </Row>
            </Container>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AdvisorState;
