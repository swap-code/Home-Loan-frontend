import React, { useEffect } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import UserSidebar from "./UserSidebar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "./Loader";
import { CollateralType } from "../utils/CollateralTypes";
import {
  deleteCollateral,
  getCollaterals,
  resetState,
  reset,
} from "../features/collateral/collateralSlice";

const UserCollaterals = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { email, role } = useSelector((state) => state.auth);
  const { collaterals, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.collateral
  );
  let index = 1;

  useEffect(() => {
    dispatch(resetState());
    if (!email || role !== "User") {
      nav("/login");
    }
    if (isError) {
      toast.error(message);
    }

    return () => {
      dispatch(reset());
    };
  }, [email, role, isError]);
  useEffect(() => {
    dispatch(getCollaterals());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess && message) {
      toast.success(message);
      dispatch(resetState());
    }
  }, [isSuccess, message]);

  return (
    <Container fluid className="p-0">
      <Row className="flex-nowrap m-0 p-0">
        <UserSidebar />
        {isLoading ? (
          <Loader />
        ) : (
          <Col className="col overflow-scroll py-3">
            <Container>
              <Row>
                <h2> Collaterals </h2>
                <Col md={6} className="m-auto">
                  <Table responsive="sm" bordered className=" m-auto">
                    <thead className="fw-bold">
                      <tr>
                        <th className="px-2">#</th>
                        <th>Own Share</th>
                        <th>Collateral Type</th>
                        <th>Collateral Value</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {collaterals?.map((collateral) => {
                        return (
                          <tr key={collateral?.id}>
                            <td>{index++}</td>
                            <td>{collateral?.ownShare}</td>
                            <td>
                              {CollateralType[collateral?.collateralType]}
                            </td>
                            <td>{collateral?.collateralValue}</td>
                            <td>
                              <i
                                className="fa-regular p-2 m-1 fa-pen-to-square fa-md pointer text-primary border rounded-2"
                                onClick={() => {
                                  nav(
                                    `/UserDashboard/collaterals/edit/${collateral?.id}`
                                  );
                                }}
                              />
                              <i
                                className="fa-regular p-2 m-1 fa-trash fa-md pointer text-danger border rounded-2"
                                onClick={() => {
                                  dispatch(deleteCollateral(collateral?.id));
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
                      nav("/UserDashboard/collaterals/add");
                    }}
                  >
                    Add New Collateral
                  </Button>
                </Col>
              </Row>
            </Container>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default UserCollaterals;
