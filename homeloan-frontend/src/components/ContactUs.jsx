import React, { useEffect } from "react";

import { Col, Container, Row } from "react-bootstrap";
import AdvisorSidebar from "./AdvisorSidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserSidebar from "./UserSidebar";
export const ContactUs = () => {
  const nav = useNavigate();
  const handleSubmit = () => {
    document.getElementById("contact-form").submit();
  };
  const { role, email } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!role && !email) {
      nav("/login");
    }
  }, [role, email]);

  return (
    <Container fluid className="p-0">
      <Row className="flex-nowrap m-0 p-0">
        {role === "Advisor" && <AdvisorSidebar />}
        {role === "User" && <UserSidebar />}
        <Col className="col py-3 overflow-scroll m-auto vh100" md="8">
          <section className="mb-4 border rounded-2 p-4 py-5">
            <h2 className="h1-responsive font-weight-bold text-center my-4">
              Contact Us
            </h2>
            <p className="text-center w-responsive mx-auto mb-5">
              Do you have any questions? Please do not hesitate to contact us
              directly. Our team will get back to you within a matter of hours
              to assist you.
            </p>
            <div className="row px-3 ">
              <div className="col-md-9 mb-md-0 mb-5 ">
                <form
                  id="contact-form"
                  name="contact-form"
                  action="mail.php"
                  method="POST"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                          Your name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Your email
                        </label>
                        <input
                          type="text"
                          id="email"
                          name="email"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label htmlFor="subject" className="form-label">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label htmlFor="message" className="form-label">
                          Your message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows="2"
                          className="form-control"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <button className="btn btn-dark" onClick={handleSubmit}>
                      Send
                    </button>
                  </div>
                  <div className="status"></div>
                </form>
              </div>
              <div className="col-md-3 text-center">
                <ul className="list-unstyled mb-0">
                  <li>
                    <i className="fas fa-map-marker-alt fa-2x"></i>
                    <p>Gurgaon, Haryana, IND</p>
                  </li>
                  <li>
                    <i className="fas fa-phone mt-4 fa-2x"></i>
                    <p>+ 91 7982958113</p>
                  </li>
                  <li>
                    <i className="fas fa-envelope mt-4 fa-2x"></i>
                    <p>RishabhDealer@gmail.com</p>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </Col>
      </Row>
    </Container>
  );
};
