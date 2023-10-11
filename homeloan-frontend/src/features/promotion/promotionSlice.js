import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import promotionService from "./promotionService";

const initialState = {
    promotion: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getPromotion = createAsyncThunk(
    "promotion/fetchPromotion",
    async (_, thunkAPI) => {
        try {
            return await promotionService.getPromotion();
        } catch (error) {
            const message = error?.response?.data?.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const createPromotion = createAsyncThunk(
    "promotion/createPromotion",
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            return await promotionService.createPromotion(data, token);
        }
        catch (error) {
            const message = error?.response?.data?.message;
            return thunkAPI.rejectWithValue(message);
        }
    });

export const promotionSlice = createSlice({
    name: "promotion",
    initialState,
    reducers: {
        reset: (state) => initialState,
        resetState: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPromotion.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPromotion.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.promotion = action.payload;
            })
            .addCase(getPromotion.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Failed to fetch promotion";
            })
            .addCase(createPromotion.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createPromotion.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
            .addCase(createPromotion.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Failed to Create promotion";
            })
    }
});

export const { reset, resetState } = promotionSlice.actions;
export default promotionSlice.reducer;