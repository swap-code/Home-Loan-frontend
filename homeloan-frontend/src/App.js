import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Header from './components/Header';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import "./App.css";
import UserDashboard from './components/UserDashboard';
import AdvisorDashboard from './components/AdvisorDashboard';
import Signup from './components/Signup';
import UserCollaterals from './components/UserCollaterals';

import AddUserCollateral from './components/AddUserCollateral';
import EditUserCollateral from './components/EditUserCollateral';
import UserAddNewLoan from './components/UserAddNewLoan';
import UserEditLoan from './components/UserEditLoan';
import ChangePassword from './components/ChangePassword';
import NotFound from './components/NotFound';
import AdvisorBankPromotion from "./components/AdvisorBankPromotion";
import AdvisorCountry from "./components/AdvisorCountry";
import AdvisorEditCountry from "./components/AdvisorEditCountry";
import AdvisorAddCountry from "./components/AdvisorAddCountry";
import AdvisorState from "./components/AdvisorState";
import AdvisorAddState from "./components/AdvisorAddState";
import AdvisorEditState from "./components/AdvisorEditState";
import AdvisorCity from "./components/AdvisorCity";
import AdvisorAddCity from "./components/AdvisorAddCity";
import AdvisorEditCity from "./components/AdvisorEditCity";
import { ContactUs } from "./components/ContactUs";

function App() {
  const { role } = useSelector(state => state.auth);
  return (

      <Router>
        <Header />
        <ToastContainer />
        <Routes>
          <Route element={<HomePage />} path="" />
          <Route element={<Login />} path="/login" />
          <Route element={<Signup />} path="/signup" />
          <Route element={<ChangePassword />} path="/changePassword" />
          <Route element={<ContactUs />} path="/contactus" exact />
          {
            role === "User" &&
            (
              <>
                <Route element={<UserDashboard />} path="/UserDashboard" />
                <Route element={<UserAddNewLoan />} path="/UserDashboard/addNewLoan" />
                <Route element={<UserEditLoan />} path="/UserDashboard/editLoan/:id" />
                <Route element={<UserCollaterals />} path="/UserDashboard/collaterals" exact />
                <Route element={<AddUserCollateral />} path="/UserDashboard/collaterals/add" exact />
                <Route element={<EditUserCollateral />} path="/UserDashboard/collaterals/edit/:id" exact />
                
              </>
            )
          }
          {
            role === "Advisor" &&
            (
              <>
                <Route element={<AdvisorDashboard />} path="/AdvisorDashboard" />
                <Route element={<AdvisorBankPromotion />} path="/AdvisorDashboard/AddBankPromotion" />
                <Route element={<AdvisorCountry />} path="/AdvisorDashboard/Country" />
                <Route element={<AdvisorAddCountry />} path="/AdvisorDashboard/Country/add" />
                <Route element={<AdvisorEditCountry />} path="/AdvisorDashboard/Country/edit/:id" />
                <Route element={<AdvisorState />} path="/AdvisorDashboard/State" />
                <Route element={<AdvisorAddState />} path="/AdvisorDashboard/State/add" />
                <Route element={<AdvisorEditState />} path="/AdvisorDashboard/State/edit/:id" />
                <Route element={<AdvisorCity />} path="/AdvisorDashboard/City" />
                <Route element={<AdvisorAddCity />} path="/AdvisorDashboard/City/add" />
                <Route element={<AdvisorEditCity />} path="/AdvisorDashboard/City/edit/:id" />
              </>
            )
          }
          <Route element={<NotFound />} path="*" />
        </Routes>
      </Router>

  );
}

export default App;
