import React, { useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { createLoan, editLoan, getLoan, reset } from '../features/loan/loanSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Loader from './Loader';
import UserSidebar from './UserSidebar';

const UserEditLoan = () => {
  const { email, role } = useSelector((state) => state.auth);
  const { isSuccess, isLoading, isError, message } = useSelector((state) => state.loan);
  const nav = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      propertyAddress: '',
      propertySize: '',
      propertyCost: '',
      propertyRegistrationCost: '',
      monthlyFamilyIncome: '',
      otherIncome: '',
      loanAmount: '',
      loanDuration: '',
    },
    validationSchema: Yup.object({
        propertyAddress: Yup.string().required('Property Address is required!').max(100, 'Property Address cannot exceed 100 characters'),
        propertySize: Yup.number().required('Property Size is required!').min(0, 'Property size must be greater than 0').max(100000000, 'Property size must be less than 100000000'),
        propertyCost: Yup.number().required('Property Cost is required!').min(1000, 'Property cost should be at least 1000').max(10000000, 'Property cost should be at most 10000000'),
        propertyRegistrationCost: Yup.number().required('Property Registration Cost is required!').min(1000, 'Property Registration cost should be at least 1000').max(100000000, 'Property Registration cost should be at most 100000000'),
        monthlyFamilyIncome: Yup.number().required('Monthly Income is required!').min(1000, 'Monthly Income should be at least 1000').max(100000000, 'Monthly Income should be at most 100000000'),
        otherIncome: Yup.number().required('Other Income is required!').min(0, 'Please enter a valid income value').max(100000000, 'Please enter a valid income value'),
        loanAmount: Yup.number().required('Loan Amount is required!').min(100000, 'Loan amount should be at least 100000').max(100000000, 'Loan amount should be at most 100000000'),
        loanDuration: Yup.number().required('Loan Duration is required!').min(12, 'Loan Duration should be at least 12').max(240, 'Loan Duration should be at most 240'),
      }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    if (!email || role !== 'User') {
      nav('/login');
    }
    if (isError) {
      toast.error(message);
    }
  }, [email, role, isError]);

  useEffect(() => {
    if (isSuccess && message) {
      toast.success(message);
      nav('/UserDashboard');
    }
    return () => {
      dispatch(reset());
    };
  }, [isSuccess, message]);

  useEffect(() => {
    dispatch(getLoan(params.id)).then((action) => {
      if (action.payload?.state !== 0) {
        nav('/UserDashboard');
      }
      formik.setValues(action.payload);
    });
  }, [params.id]);

  const handleSubmit = (values) => {
    dispatch(editLoan(values));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container fluid>
      <Row className="flex-nowrap">
        <UserSidebar />
        <Col className="py-3 m-auto col overflow-scroll" sm={12} md={5}>
          <h3 className="text-center">Update Loan</h3>
          <Form onSubmit={formik.handleSubmit} className="border rounded-2 p-3  py-4 shadow">
            <Form.Group className="mb-3 py-2" controlId="formBasicPropertyAddress">
              <Form.Label>Property Address</Form.Label>
              <Form.Control
                type="text"
                name="propertyAddress"
                placeholder="Enter Property Address"
                value={formik.values.propertyAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.propertyAddress && formik.errors.propertyAddress}
                required
              />
              {formik.touched.propertyAddress && formik.errors.propertyAddress && (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.propertyAddress}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3 py-2" controlId="formBasicPropertySize">
              <Form.Label>Property Size</Form.Label>
              <Form.Control
                type="number"
                name="propertySize"
                placeholder="Enter Property Size"
                value={formik.values.propertySize}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.propertySize && formik.errors.propertySize}
                required
              />
              {formik.touched.propertySize && formik.errors.propertySize && (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.propertySize}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3 py-2" controlId="formBasicPropertyCost">
  <Form.Label>Property Cost</Form.Label>
  <Form.Control
    type="number"
    name="propertyCost"
    placeholder="Enter Property Cost"
    value={formik.values.propertyCost}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    isInvalid={formik.touched.propertyCost && formik.errors.propertyCost}
    required
  />
  {formik.touched.propertyCost && formik.errors.propertyCost && (
    <Form.Control.Feedback type="invalid">
      {formik.errors.propertyCost}
    </Form.Control.Feedback>
  )}
</Form.Group>
<Form.Group className="mb-3 py-2" controlId="formBasicPropertyRegistrationCost">
  <Form.Label>Property Registration Cost</Form.Label>
  <Form.Control
    type="number"
    name="propertyRegistrationCost"
    placeholder="Enter Property Registration Cost"
    value={formik.values.propertyRegistrationCost}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    isInvalid={formik.touched.propertyRegistrationCost && formik.errors.propertyRegistrationCost}
    required
  />
  {formik.touched.propertyRegistrationCost && formik.errors.propertyRegistrationCost && (
    <Form.Control.Feedback type="invalid">
      {formik.errors.propertyRegistrationCost}
    </Form.Control.Feedback>
  )}
</Form.Group>
<Form.Group className="mb-3 py-2" controlId="formBasicMonthlyFamilyIncome">
  <Form.Label>Monthly Family Income</Form.Label>
  <Form.Control
    type="number"
    name="monthlyFamilyIncome"
    placeholder="Enter Monthly Family Income"
    value={formik.values.monthlyFamilyIncome}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    isInvalid={formik.touched.monthlyFamilyIncome && formik.errors.monthlyFamilyIncome}
    required
  />
  {formik.touched.monthlyFamilyIncome && formik.errors.monthlyFamilyIncome && (
    <Form.Control.Feedback type="invalid">
      {formik.errors.monthlyFamilyIncome}
    </Form.Control.Feedback>
  )}
</Form.Group>
<Form.Group className="mb-3 py-2" controlId="formBasicOtherIncome">
  <Form.Label>Other Income</Form.Label>
  <Form.Control
    type="number"
    name="otherIncome"
    placeholder="Enter Other Income"
    value={formik.values.otherIncome}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    isInvalid={formik.touched.otherIncome && formik.errors.otherIncome}
    required
  />
  {formik.touched.otherIncome && formik.errors.otherIncome && (
    <Form.Control.Feedback type="invalid">
      {formik.errors.otherIncome}
    </Form.Control.Feedback>
  )}
</Form.Group>
<Form.Group className="mb-3 py-2" controlId="formBasicLoanAmount">
  <Form.Label>Loan Amount</Form.Label>
  <Form.Control
    type="number"
    name="loanAmount"
    placeholder="Enter Loan Amount"
    value={formik.values.loanAmount}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    isInvalid={formik.touched.loanAmount && formik.errors.loanAmount}
    required
  />
  {formik.touched.loanAmount && formik.errors.loanAmount && (
    <Form.Control.Feedback type="invalid">
      {formik.errors.loanAmount}
    </Form.Control.Feedback>
  )}
</Form.Group>
<Form.Group className="mb-3 py-2" controlId="formBasicLoanDuration">
  <Form.Label>Loan Duration</Form.Label>
  <Form.Control
    type="number"
    name="loanDuration"
    placeholder="Enter Loan Duration (mos.)"
    value={formik.values.loanDuration}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    isInvalid={formik.touched.loanDuration && formik.errors.loanDuration}
    required
  />
  {formik.touched.loanDuration && formik.errors.loanDuration && (
    <Form.Control.Feedback type="invalid">
      {formik.errors.loanDuration}
    </Form.Control.Feedback>
  )}
</Form.Group>

            <Button variant="dark" type="submit">
              Update Loan
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserEditLoan;
