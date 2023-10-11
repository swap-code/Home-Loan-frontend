import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const nav = useNavigate();
  return (
    <Container fluid>
      <Row className="flex-column-reverse flex-md-row">
        <Col
          md={12}
          lg={6}
          className="d-flex align-items-center p-md-4 justify-content-center mh-100"
        >
          <div className="p-2 p-md-5 ms-md-5">
            <h4 className="fw-bold fs-2 py-3">
              {" "}
              Unlock your dreams with our hassle-free bank loans!{" "}
            </h4>
            <p className="fs-5">
              Take control of your financial journey
              <br />
              with our comprehensive bank loans for a brighter tomorrow.
            </p>
            <div className="py-3">
              <Button
                className="rounded-1 d-inline-flex align-items-center letsConnect py-2 rounded-pill  me-2"
                variant="dark"
                onClick={() => {
                  nav("/login");
                }}
              >
                <span className="ms-2">Apply Loan</span>
                <i className="fa fa-arrow-circle-right ms-4 fs-4  text-white" />
              </Button>
            </div>
          </div>
        </Col>
        <Col
          md={12}
          lg={6}
          className="d-flex align-items-center justify-content-center"
        >
          <img
            src={
              "https://img.freepik.com/free-vector/inheritance-concept-illustration_114360-12914.jpg?w=1380&t=st=1685371400~exp=1685372000~hmac=c1ff379b1f8270e72f81f7fe674d7651855d2a109ca51cdefaa5b118623f1e96"
            }
            alt="bank"
            className="w-100 p-1 p-md-4"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
