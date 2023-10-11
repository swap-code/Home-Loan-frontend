import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdvisorSidebar from "./AdvisorSidebar";
import {
  Badge,
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { LoanStatusColor, LoanStatusType } from "../utils/LoanTypes";
import Loader from "./Loader";
import { getAdminLoans, updateLoanState } from "../features/loan/loanSlice";
import { LoanStatus } from "../utils/LoanStatus";
import { CollateralType } from "../utils/CollateralTypes";
import { toast } from "react-toastify";

const AdvisorDashboard = () => {
  const { email, role } = useSelector((state) => state.auth);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, loans, isSuccess, isError, message } = useSelector(
    (state) => state.loan
  );
  const [details, setDetails] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [statusForm, setStatusForm] = useState({
    state: "",
    notes: "",
  });

  const [loanId, setLoanId] = useState("");
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  let index = 1;

  useEffect(() => {
    console.log(role, email);
    if (!email || role !== "Advisor") {
      nav("/login");
    }
  }, [email, role]);

  useEffect(() => {
    dispatch(getAdminLoans());
  }, [dispatch]);

  const handleChange = (e) => {
    setStatusForm({ ...statusForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!statusForm.state || !statusForm.notes) {
      toast.error("Please fill in all the fields.");
      return;
    }
    var finalObj = {
      state: Number(statusForm.state),
      notes: statusForm.notes,
      loanId: loanId,
    };
    dispatch(updateLoanState(finalObj))
      .then((action) => {
        toast.success(action.payload.message);
        setStatusForm({ state: "", notes: "" });
        handleClose1();
        dispatch(getAdminLoans());
      })
      .catch((err) => {
        toast.error("Failed to update loan status");
      });
  };

  const renderModal = () => {
    var collaterals = details?.collaterals;
    var loanObj = details?.loan || {};
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="overflow-scroll">
          <Row>
            <Col>
              <div className="fs-4 fw-bold">Loan Details</div>
              {Object.entries(loanObj)
                ?.filter(([key, value]) => key !== "loanId" && key !== "state")
                ?.map(([key, value], index) => {
                  return (
                    <div key={index}>
                      <i className="fa-solid fa-md fa-angles-right fa-dark me-3" />
                      <span className="fs-6 fw-bold text-capitalize">
                        {key}
                      </span>{" "}
                      :<span className="ms-1">{value}</span>
                    </div>
                  );
                })}
            </Col>
          </Row>

          <Row>
            <Col>
              <div className="fs-4 fw-bold">View Collaterals</div>
              <div>
                {collaterals?.length > 0 ? (
                  <>
                    <Row>
                      <Col sm="10" className="fw-bold py-2">
                        <i className="fa-solid fa-md fa-hashtag  fa-dark me-3" />
                        <span>CollateralType - CollateralValue - OwnShare</span>
                      </Col>
                    </Row>
                    {collaterals?.map((col) => {
                      return (
                        <Row key={col?.id}>
                          <Col sm="10">
                            <i className="fa-solid fa-md fa-angles-right  fa-dark me-3" />
                            {`${CollateralType[col?.collateralType]} - ${
                              col?.collateralValue
                            } - ${col?.ownShare}`}
                          </Col>
                        </Row>
                      );
                    })}
                  </>
                ) : (
                  <span className="text-primary fs-5">
                    {" "}
                    No Collaterals Attached
                  </span>
                )}
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  const renderStatusModal = () => {
    return (
      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Update State </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body className="overflow-scroll">
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>State</Form.Label>
                  <Form.Select
                    value={statusForm.state}
                    name="state"
                    onChange={handleChange}
                  >
                    <option value="">Select State</option>
                    {Object.entries(LoanStatusType)
                      ?.filter(([key, value]) => key !== "0" && key !== "2")
                      ?.map(([key, value]) => (
                        <option value={key} key={key}>
                          {value}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control
                    type="text"
                    value={statusForm.notes}
                    placeholder="Enter Notes"
                    name="notes"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit">Save Status</Button>
            <Button variant="danger" onClick={handleClose1}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  };

  return (
    <Container fluid className="p-0">
      <Row className="flex-nowrap p-0 m-0">
        <AdvisorSidebar />
        <Col className="col py-3">
          <h3>Welcome Admin!</h3>
          {isLoading ? (
            <Loader />
          ) : (
            <Container>
              <Row>
                <h2 className="fs-4 text-center fw-bold"> Loans </h2>
                <Col md={12} className="m-auto ">
                  <Table responsive="sm" bordered className=" m-auto">
                    <thead className="fw-bold">
                      <tr>
                        <th className="px-2">#</th>
                        <th>Email</th>
                        <th>Property Address</th>
                        <th>Property Size (Yds.)</th>
                        <th>Loan Amount</th>
                        <th>Loan Duration</th>
                        <th>Loan State</th>
                        <th>View Collateral</th>
                        <th colSpan={4}>Action</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody className="verticalAlignMiddle">
                      {loans?.map((loan) => {
                        return (
                          <tr key={loan?.loan?.loanId}>
                            <td>{index++}</td>
                            <td>{loan?.loan?.userEmail}</td>
                            <td>{loan?.loan?.propertyAddress}</td>
                            <td>{loan?.loan?.propertySize}</td>
                            <td>{loan?.loan?.propertyCost}</td>
                            <td>{loan?.loan?.loanDuration}</td>
                            <td className="text-center">
                              <Badge bg={LoanStatusColor[loan?.state]}>
                                {LoanStatusType[loan?.state]}
                              </Badge>
                            </td>
                            <td className="text-center">
                              <i
                                className={
                                  "fa-regular fa-files m-1 px-2 pt-3 fa-xl pointer"
                                }
                                onClick={() => {
                                  handleShow();
                                  setDetails(loan);
                                }}
                              />
                            </td>
                            <td className="text-center" colSpan={4}>
                              <div className="d-flex">
                                <i
                                  className={
                                    "fa-solid p-2 m-1 fa-pen-to-square fa-LG pointer text-primary border rounded-2"
                                  }
                                  onClick={() => {
                                    handleShow1();
                                    setLoanId(loan?.loan?.loanId);
                                  }}
                                />
                                <i
                                  className={
                                    "fa-solid p-2 m-1 fa-badge-check fa-md pointer text-success border rounded-2"
                                  }
                                  onClick={() => {
                                    dispatch(
                                      updateLoanState({
                                        loanId: loan?.loan?.loanId,
                                        state: 2,
                                      })
                                    ).then(() => {
                                      dispatch(getAdminLoans());
                                    });
                                  }}
                                />
                              </div>
                            </td>
                            <td className="text-center verticleAlignMiddle">
                              <i
                                className={`fa-solid fa-bookmark fa-lg text-${
                                  LoanStatus[loan?.status]
                                }`}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Container>
          )}
          {renderModal()}
          {renderStatusModal()}
        </Col>
      </Row>
    </Container>
  );
};

export default AdvisorDashboard;
