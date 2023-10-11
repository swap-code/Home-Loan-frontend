import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  editCollateral,
  getCollateral,
  getCollaterals,
  reset,
  resetState,
} from "../features/collateral/collateralSlice";
import UserSidebar from "./UserSidebar";
import { CollateralType } from "../utils/CollateralTypes";
import Loader from "./Loader";
import { toast } from "react-toastify";

const EditUserCollateral = () => {
  const { role, email } = useSelector((state) => state.auth);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.collateral
  );
  const [collateralForm, setCollateralForm] = useState({
    ownShare: 0,
    collateralType: "",
    collateralValue: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!email || role !== "User") {
      nav("/login");
    }
    if (isError) {
      toast.error(message);
    }
  }, [role, email]);

  useEffect(() => {
    dispatch(getCollaterals()).then((action) => {
      var collateral = action.payload.filter((col) => col.id === params.id)[0];
      setCollateralForm(collateral);
    });
  }, [dispatch, params.id]);

  const handleChange = (e) =>
    setCollateralForm({ ...collateralForm, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      var finalRes = {
        ...collateralForm,
        ownShare: Number(collateralForm.ownShare),
        collateralType: Number(collateralForm.collateralType),
        collateralValue: Number(collateralForm.collateralValue),
      };
      console.log(finalRes);
      dispatch(resetState());
      dispatch(editCollateral(finalRes)).then((res) => {
        toast.success("Collateral Updated successfully");
        nav("/UserDashboard/collaterals");
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!collateralForm.collateralValue) {
      errors.collateralValue = "Collateral value is required";
      valid = false;
    } else if (collateralForm.collateralValue > 100000000) {
      errors.collateralValue = "Please enter collateral value less then 10 Cr.";
      valid = false;
    } else if (collateralForm.collateralValue.length < 6) {
      errors.collateralValue =
        "Collateral Value must be greater than 6 figures.";
      valid = false;
    }

    if (collateralForm.ownShare < 1 || collateralForm.ownShare > 100) {
      toast.error("Please enter a valid own share between 1 and 100.");
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  return (
    <Container fluid className="p-0">
      <Row className="flex-nowrap m-0 p-0">
        <UserSidebar />
        {isLoading ? (
          <Loader />
        ) : (
          <Col className="col py-3 pt-5">
            <h3 className="text-center">Edit Collateral</h3>
            <Row className="pt-2">
              <Col md="5" className="m-auto border border-2 p-4 ">
                <Form onSubmit={handleSubmit} className="">
                  <Form.Group
                    className="mb-3 py-2"
                    controlId="formBasicCollateralValue"
                  >
                    <Form.Label>Collateral Value</Form.Label>
                    <Form.Control
                      type="text"
                      name="collateralValue"
                      placeholder="Enter Collateral Value"
                      value={collateralForm.collateralValue}
                      onChange={handleChange}
                      isInvalid={!!errors.collateralValue}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.collateralValue}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    className="mb-3 py-2"
                    controlId="formBasicCollateralType"
                  >
                    <Form.Label>Collateral Type</Form.Label>
                    <Form.Select
                      name="collateralType"
                      value={collateralForm.collateralType}
                      onChange={handleChange}
                      disabled={true}
                    >
                      <option value="" default>
                        Select Collateral Type
                      </option>
                      {Object.keys(CollateralType).map((collateralType) => (
                        <option value={collateralType} key={collateralType}>
                          {" "}
                          {CollateralType[collateralType]}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group
                    className="mb-3 py-2"
                    controlId="formBasicOwnShare"
                  >
                    <Form.Label>
                      Own Share - {collateralForm.ownShare}
                    </Form.Label>
                    <Form.Range
                      type="range"
                      name="ownShare"
                      step={1}
                      max={100}
                      placeholder="Enter Own Share"
                      onChange={handleChange}
                      value={collateralForm.ownShare}
                    />
                  </Form.Group>
                  <Button variant="dark" type="submit">
                    Update Collateral
                  </Button>
                </Form>
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default EditUserCollateral;
