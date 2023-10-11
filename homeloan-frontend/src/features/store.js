import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import countryReducer from "./country/countrySlice";
import stateReducer from "./state/stateSlice";
import cityReducer from "./city/citySlice";
import collateralReducer from "./collateral/collateralSlice";
import loanReducer from "./loan/loanSlice";
import promotionReducer from "./promotion/promotionSlice";

// eslint-disable-next-line import/no-anonymous-default-export
export const store = configureStore({
  reducer: {
    auth: authReducer,
    country: countryReducer,
    state:stateReducer,
    city:cityReducer,
    collateral:collateralReducer,
    loan:loanReducer,
    promotion:promotionReducer
  },
});