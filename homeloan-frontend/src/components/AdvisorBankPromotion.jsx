import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import AdvisorSidebar from "./AdvisorSidebar";
import { BankPromotion } from "../utils/BankPromotion";
import { createPromotion, reset } from "../features/promotion/promotionSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { toast } from "react-toastify";

const AdvisorBankPromotion = () => {
  var todayDate = new Date().toISOString().slice(0, 10);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [bankPromotion, setBankPromotion] = useState({
    start_date: "",
    end_date: "",
    message: "",
    type: "",
  });
  const { email, role } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.promotion
  );
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
    if (isSuccess && message) {
      toast.success(message);

      nav("/AdvisorDashboard");
    }
    if (isError && message) {
      toast.error(message);
    }
  }, [isSuccess, isError, message]);

  const handleChange = (e) =>
    setBankPromotion({ ...bankPromotion, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks
    if (bankPromotion.start_date.trim() === "") {
      toast.error("Please enter the start date.");
      return;
    }

    if (bankPromotion.end_date.trim() === "") {
      toast.error("Please enter the end date.");
      return;
    }

    if (bankPromotion.start_date > bankPromotion.end_date) {
      toast.error("Start date must be before the end date.");
      return;
    }

    if (bankPromotion.message.trim() === "") {
      toast.error("Please enter the promotion message.");
      return;
    }

    if (bankPromotion.type === "") {
      toast.error("Please select a promotion type.");
      return;
    }

    // Dispatch createPromotion action
    var finalObj = {
      ...bankPromotion,
      type: Number(bankPromotion.type),
    };
    dispatch(createPromotion(finalObj));
  };

  return (
    <Container fluid className="p-0">
      <Row className="flex-nowrap m-0 p-0">
        <AdvisorSidebar />
        <Col className="py-3 m-auto col overflow-scroll vh100 " sm={12} md={6}>
          <h3 className="text-center">Add Bank Promotion</h3>
          {isLoading ? (
            <Loader />
          ) : (
            <Row>
              <Col md={7} className="m-auto">
                <Form
                  onSubmit={handleSubmit}
                  className="border rounded-2 p-3  py-4 shadow"
                >
                  <Form.Group
                    className="mb-3 py-2"
                    controlId="formBasicPropertyStartDate"
                  >
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="start_date"
                      placeholder="Enter Start Date"
                      min={todayDate}
                      value={bankPromotion?.start_date}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 py-2"
                    controlId="formBasicPropertyEndDate"
                  >
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="end_date"
                      placeholder="Enter End Date"
                      min={todayDate}
                      value={bankPromotion?.end_date}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 py-2"
                    controlId="formBasicMessage"
                  >
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      type="text"
                      name="message"
                      placeholder="Enter Message"
                      value={bankPromotion?.message}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 py-2" controlId="formBasicType">
                    <Form.Label>Type</Form.Label>
                    <Form.Select
                      name="type"
                      value={bankPromotion?.type}
                      onChange={handleChange}
                    >
                      <option value="">Select Type</option>
                      {Object.entries(BankPromotion).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Button variant="dark" type="submit">
                    Create Bank Promotion
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

export default AdvisorBankPromotion;
