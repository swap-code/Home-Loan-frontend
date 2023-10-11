import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import  {parseJwt } from "../utils";
import authService from "./authService";

//Get user from localStorage
const usr = localStorage.getItem("token");
const tokenEmail = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";
const tokenRole = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

const initialState = {
    token: usr ? usr : null,
    email: usr ? parseJwt(usr)[tokenEmail] : null,
    role: usr ? parseJwt(usr)[tokenRole] : null,
    exp: usr ? parseJwt(usr).exp : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const login = createAsyncThunk("auth/signin", async (user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error) {
        const message = error?.response?.data?.title;

        return thunkAPI.rejectWithValue(message);
    }
});
export const logout = createAsyncThunk("auth/signout", async () => {
    return await authService.logout();
});

export const signup = createAsyncThunk(
    "auth/signup",
    async (user, thunkAPI) => {
        try {
            return await authService.signup(user);
        } catch (error) {
            const message = error?.response?.data;
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async (user, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            return await authService.resetPassword(user,token);
        } catch (error) {
            const message = error?.response?.data;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.token = action.payload.token;
                state.email = parseJwt(action.payload.token)[tokenEmail];
                state.role = parseJwt(action.payload.token)[tokenRole];
                state.exp = parseJwt(action.payload.token).exp;
                state.message="Login successful"
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.token = null;
                state.email = null;
                state.role = null;
            })
            .addCase(signup.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.msg;
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.msg;
            })
            .addCase(resetPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.msg;
            })
            .addCase(logout.fulfilled, (state) => {
                state.token = null;
                state.email = null;
                state.role= null;
                state.exp= null;
            });
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;