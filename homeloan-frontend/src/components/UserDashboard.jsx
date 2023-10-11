import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  NavDropdown,
  Table,
  Button,
  Badge,
  Form,
  Modal,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserSidebar from "./UserSidebar";
import Loader from "./Loader";
import { LoanStatusColor, LoanStatusType } from "../utils/LoanTypes";
import {
  addCollateralToLoanId,
  applyLoan,
  getCollateralByLoanId,
  getLoans,
  removeCollateralFromLoanId,
} from "../features/loan/loanSlice";
import { toast } from "react-toastify";
import {
  getCollaterals,
  resetState,
} from "../features/collateral/collateralSlice";
import { CollateralType } from "../utils/CollateralTypes";
import { getPromotion } from "../features/promotion/promotionSlice";

const UserDashboard = () => {
  const { email, role } = useSelector((state) => state.auth);
  const { isLoading, isError, message, collateral, isSuccess, loans } =
    useSelector((state) => state.loan);
  const { collaterals } = useSelector((state) => state.collateral);
  const { promotion } = useSelector((state) => state.promotion);
  const nav = useNavigate();
  const dispatch = useDispatch();
  let index = 1;
  let collateralIndex = 1;
  const [show, setShow] = useState(false);
  const [loanId, setLoanId] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    console.log(role, email);
    if (!email || role !== "User") {
      nav("/login");
    }
  }, [email, role]);

  useEffect(() => {
    dispatch(getLoans());
    dispatch(getCollaterals());
    dispatch(getPromotion());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess && message) {
      toast.success(message);
      dispatch(resetState());
    }
  }, [isSuccess, message]);

  const renderModal = () => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Collaterals</Modal.Title>
        </Modal.Header>
        <Modal.Body className="overflow-scroll">
          <Row>
            <Col className="py-3">
              <div className="fs-4 fw-bold">Attached Collaterals</div>
              <div>
                {collateral.length > 0 ? (
                  <>
                    <Row>
                      <Col sm="10" className="fw-bold py-2">
                        <i className="fa-solid fa-md fa-hashtag  fa-dark me-3" />
                        <span>CollateralType - CollateralValue - OwnShare</span>
                      </Col>
                    </Row>
                    {collateral?.map((col) => {
                      return (
                        <Row key={col?.id}>
                          <Col sm="8">
                            <i className="fa-solid fa-md fa-angles-right  fa-dark me-3" />
                            {`${CollateralType[col?.collateralType]} - ${
                              col?.collateralValue
                            } - ${col?.ownShare}`}
                          </Col>
                          <Col sm="3">
                            <span className="ms-3">
                              <i
                                className="fa-regular p-1 m-1 fa-trash text-danger fa-md pointer border rounded-2"
                                onClick={() => {
                                  dispatch(
                                    removeCollateralFromLoanId({
                                      loanId: loanId,
                                      collateralId: col?.id,
                                    })
                                  );
                                  handleClose();
                                }}
                              />
                            </span>
                          </Col>
                        </Row>
                      );
                    })}
                  </>
                ) : (
                  <span className="fs-5 text-info">
                    No Attached Collaterals Found
                  </span>
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="fs-4 fw-bold">All Collaterals</div>
              <div>
                <Row>
                  <Col sm="10" className="fw-bold py-2">
                    <i className="fa-solid fa-md fa-hashtag  fa-dark me-3" />
                    <span>CollateralType - CollateralValue - OwnShare</span>
                  </Col>
                </Row>
                {collaterals
                  ?.filter(
                    (element) => !collateral.some((c) => c.id === element.id)
                  )
                  ?.map((col) => {
                    return (
                      <Row key={col?.id}>
                        <Col sm="8">
                          <i className="fa-solid fa-md fa-angles-right  fa-dark me-3" />
                          {`${CollateralType[col?.collateralType]} - ${
                            col?.collateralValue
                          } - ${col?.ownShare}`}
                        </Col>
                        <Col sm="3">
                          <span className="ms-3">
                            <i
                              className="fa-regular p-1 m-1 fa-circle-check text-success fa-md pointer border rounded-2"
                              onClick={() => {
                                console.log(loanId, col?.id);
                                dispatch(
                                  addCollateralToLoanId({
                                    loanId: loanId,
                                    collateralId: col?.id,
                                  })
                                );
                                handleClose();
                              }}
                            />
                          </span>
                        </Col>
                      </Row>
                    );
                  })}
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

  return (
    <Container fluid className="p-0">
      <Row className="flex-nowrap p-0 m-0">
        <UserSidebar />
        <Col className="col overflow-scroll py-3">
          <h3 className="pb-4">Welcome to The Indian Bank !!!</h3>
          <marquee
            className="bg-dark text-white fs-5 my-3"
            direction="left"
            scrollamount="3"
            behavior="scroll"
          >
            {" "}
            {promotion?.message}
          </marquee>
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
                        <th>Property Address</th>
                        <th>Property Size (Yds.)</th>
                        <th>Property Cost</th>
                        <th>Loan Amount</th>
                        <th>Loan Duration</th>
                        <th>Loan State</th>
                        <th>Add Collateral</th>
                        <th>Action</th>
                        {/* <th>Advisor Notes</th> */}
                      </tr>
                    </thead>
                    <tbody className="verticalAlignMiddle">
                      {loans?.map((loan) => {
                        return (
                          <tr key={loan?.loanId}>
                            <td>{index++}</td>
                            <td>{loan?.propertyAddress}</td>
                            <td>{loan?.propertySize}</td>
                            <td>{loan?.propertyCost}</td>
                            <td>{loan?.loanAmount}</td>
                            <td>{loan?.loanDuration}</td>
                            <td className="text-center">
                              <Badge bg={LoanStatusColor[loan?.state]}>
                                {LoanStatusType[loan?.state]}
                              </Badge>
                            </td>
                            <td className="text-center">
                              <i
                                className={
                                  loan?.state === 0
                                    ? "fa-regular fa-files m-1 px-2 pt-3 fa-xl pointer"
                                    : "text-muted fa-regular fa-files m-1 px-2 pt-3 fa-xl "
                                }
                                onClick={() => {
                                  if (loan?.state === 0) {
                                    dispatch(
                                      getCollateralByLoanId(loan?.loanId)
                                    );
                                    handleShow(true);
                                    setLoanId(loan?.loanId);
                                  }
                                }}
                              />
                            </td>
                            <td className="text-center">
                              <i
                                className={
                                  loan?.state === 0
                                    ? "fa-solid p-2 m-1 fa-pen-to-square fa-md pointer text-primary border rounded-2"
                                    : "fa-solid p-2 m-1 fa-pen-to-square fa-md  text-muted border rounded-2"
                                }
                                onClick={() => {
                                  loan?.state === 0 &&
                                    nav(
                                      `/UserDashboard/editLoan/${loan?.loanId}`
                                    );
                                }}
                              />
                              <i
                                className={
                                  loan?.state === 0
                                    ? "fa-solid p-2 m-1 fa-square-check fa-md pointer text-success border rounded-2"
                                    : "fa-solid p-2 m-1 fa-square-check fa-md  text-muted border rounded-2"
                                }
                                onClick={() => {
                                  dispatch(applyLoan(loan?.loanId)).then(() => {
                                    dispatch(getLoans());
                                  });
                                }}
                              />
                            </td>
                          
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <Row>
                <Col sm={6} className="m-auto text-center p-4">
                  <Button
                    variant="dark"
                    onClick={() => {
                      nav("/UserDashboard/addNewLoan");
                    }}
                  >
                    Add New Loan
                  </Button>
                </Col>
              </Row>
            </Container>
          )}
          {renderModal()}
        </Col>
      </Row>
    </Container>
  );
};

export default UserDashboard;
