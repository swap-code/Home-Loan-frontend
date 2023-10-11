import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdvisorSidebar from "./AdvisorSidebar";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import Loader from "./Loader";
import { toast } from "react-toastify";
import {
  deleteCountry,
  getCountries,
  reset,
} from "../features/country/countrySlice";

const AdvisorCountry = () => {
  const { email, role } = useSelector((state) => state.auth);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { countries, isLoading } = useSelector((state) => state.country);

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
    return () => {
      dispatch(reset());
    };
  }, []);

  return (
    <Container fluid className="p-0">
      <Row className="flex-nowrap m-0 p-0">
        <AdvisorSidebar />
        <Col className="col py-3">
          {isLoading ? (
            <Loader />
          ) : (
            <Container>
              <Row>
                <h2 className="fs-4 text-center fw-bold"> Countries </h2>
                <Col md={8} className="m-auto ">
                  <Table responsive="sm" bordered className=" m-auto">
                    <thead className="fw-bold">
                      <tr>
                        <th className="px-2">#</th>
                        <th>Country Name</th>
                        <th>Country Code</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="verticalAlignMiddle">
                      {countries?.map((country) => (
                        <tr key={index}>
                          <td>{index++}</td>
                          <td>{country?.countryName}</td>
                          <td>{country?.countryCode}</td>
                          <td>
                            <i
                              className="fa-regular p-2 m-1 fa-pen-to-square fa-md pointer text-primary border rounded-2"
                              onClick={() => {
                                nav(
                                  `/AdvisorDashboard/Country/edit/${country?.countryId}`
                                );
                              }}
                            />
                            <i
                              className="fa-regular p-2 m-1 fa-trash fa-md pointer text-danger border rounded-2"
                              onClick={() => {
                                dispatch(
                                  deleteCountry(country?.countryId)
                                ).then(() => {
                                  toast.success("Deleted Successfully");
                                  dispatch(getCountries());
                                });
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <Row>
                <Col sm={6} className="m-auto text-center p-4">
                  <Button
                    variant="dark"
                    onClick={() => {
                      nav("/AdvisorDashboard/Country/add");
                    }}
                  >
                    Add New Country
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

export default AdvisorCountry;
