import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import loanService from "./loanService";

const initialState = {
    loans: [],
    loan: {},
    collateral: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

//getAllBlogs
export const getLoans = createAsyncThunk(
    "loan/getLoans",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            return await loanService.getLoans(token);
        } catch (error) {
            const message = error?.response?.data?.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

//getSingleBlog
export const getLoan = createAsyncThunk(
    "loan/getLoan",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            return await loanService.getLoan(id, token);
        } catch (error) {
            const message = error?.response?.data?.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

//createLoan
export const createLoan = createAsyncThunk(
    "loan/createLoan",
    async (loan, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            return await loanService.createLoan(loan, token);
        } catch (error) {
            const message = error?.response?.data?.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);
//Add Collateral
export const addCollateralToLoanId = createAsyncThunk(
    "loan/addCollateral",
    async (data, thunkAPI) => {
        var loanId=data.loanId;
        var collateralId=data.collateralId;
        try {
            const token = thunkAPI.getState().auth.token;
            return await loanService.addCollateral(loanId, { collateralId }, token);
        } catch (error) {
            const message = error?.response?.data?.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getAdminLoans = createAsyncThunk(
    "loan/getAdminLoans",
    async (_, thunkAPI) => {
        try{
            const token = thunkAPI.getState().auth.token;
            return await loanService.getAdminLoans(token);
        }
        catch(error){
            const message = error?.response?.data?.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const removeCollateralFromLoanId = createAsyncThunk(
    "loan/removeCollateral",
    async (data, thunkAPI) => {
        var loanId=data.loanId;
        var collateralId=data.collateralId;
        try {
            const token = thunkAPI.getState().auth.token;
            return await loanService.removeCollateral(loanId, collateralId, token);
        } catch (error) {
            const message = error?.response?.data?.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getCollateralByLoanId = createAsyncThunk(
    "loan/getCollateral",
    async (loanId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            return await loanService.getCollaterals(loanId, token);
        } catch (error) {
            const message = error?.response?.data?.message;
            return thunkAPI.rejectWithValue(message);
        }
    });

//deleteLoan
export const deleteLoan = createAsyncThunk(
    "loan/deleteLoan",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            await loanService.deleteLoan(id, token);
            return { id };
        } catch (error) {
            const message = error?.response?.data?.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const applyLoan = createAsyncThunk(
    "loan/applyLoan",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            await loanService.applyLoan(id, token);
            return { id };
        } catch (error) {
            const message = error?.response?.data?.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const updateLoanState = createAsyncThunk(
    "loan/updateLoanState",
    async (state, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            var loanId=state.loanId;
            delete state.loanId;
            await loanService.updateLoanState(loanId,state, token);
            return { id: state?.loanId };
        } catch (error) {
            const message = error?.response?.data?.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

//updateBlog
export const editLoan = createAsyncThunk(
    "loan/editLoan",
    async (loan, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            loan.time = new Date().toISOString();
            return await loanService.editLoan(loan.loanId, loan, token);
        } catch (error) {
            const message = error?.response?.data?.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);


const loanSlice = createSlice({
    name: "loan",
    initialState,
    reducers: {
        reset: (state) => initialState,
        resetState: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.loan = {};
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getLoans.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getLoans.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.loans = action.payload;
            })
            .addCase(getLoans.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Failed to fetch loans";
            })
            .addCase(getLoan.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getLoan.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.loan = action.payload;
           
            })
            .addCase(getLoan.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Failed to fetch loans";
            })
            .addCase(getAdminLoans.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAdminLoans.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.loans = action.payload;
            })
            .addCase(getAdminLoans.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Failed to fetch loans";
            })
            .addCase(updateLoanState.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateLoanState.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "Loan State Updated successfully";
            })
            .addCase(updateLoanState.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Failed to fetch loans";
            })
            .addCase(createLoan.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createLoan.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.loans.push(action.payload.data);
                state.message = "Loan Created successfully";
            })
            .addCase(createLoan.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Failed to create loan";
            })
            .addCase(applyLoan.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(applyLoan.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "Loan Applied successfully";
            })
            .addCase(applyLoan.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Failed to create loan";
            })
            .addCase(getCollateralByLoanId.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCollateralByLoanId.fulfilled, (state, action) => {
                console.log(action.payload)
                state.isLoading = false;
                state.isSuccess = true;
                state.collateral = action.payload;
            })
            .addCase(getCollateralByLoanId.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Failed to get Collaterals of Loan";
            })
            .addCase(addCollateralToLoanId.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addCollateralToLoanId.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(addCollateralToLoanId.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Failed to Add Collateral to Loan";
            })
            .addCase(removeCollateralFromLoanId.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeCollateralFromLoanId.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(removeCollateralFromLoanId.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Failed to Remove Collateral from Loan";
            })
            .addCase(deleteLoan.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteLoan.fulfilled, (state, action) => {
                console.log(action.payload);

                state.isLoading = false;
                state.isSuccess = true;
                state.loans = state.loans.filter((b) => b.id !== action.payload.id);
            })
            .addCase(deleteLoan.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Failed to delete loan";
            })
            .addCase(editLoan.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editLoan.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "Updated Successfully";
                const index = state.loans.findIndex(
                    (loan) => loan.id === action.payload.id
                );
                state.loans[index] = {
                    ...state.loan[index],
                    ...action.payload,
                };
            })
            .addCase(editLoan.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Failed to update loan";
            })
    },
});

export const { reset, resetState } = loanSlice.actions;
export default loanSlice.reducer;