import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import stateService from "./stateService";


const initialState = {
    states: [],
    state: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

export const getStates = createAsyncThunk("state/getAllStates", async (countryId, thunkAPI) => {
    try {
        console.log(countryId);
        return await stateService.getStates(countryId);
    } catch (error) {
        const message = error?.response?.data?.title;

        return thunkAPI.rejectWithValue(message);
    }
});

export const getState = createAsyncThunk("state/get", async (countryId, thunkAPI) => {
    try {
        return await stateService.getState(countryId);

    } catch (error) {
        const message = error?.response?.data?.title;
        return thunkAPI.rejectWithValue(message);
    }
});

export const createState = createAsyncThunk("state/create", async (data, thunkAPI) => {
    var countryId = data.countryId;
    var state = data.state;
    try {
        const token = thunkAPI.getState().auth.token;
        return await stateService.createState(countryId, state, token);
    }
    catch (error) {
        const message = error?.response?.data?.title;
        return thunkAPI.rejectWithValue(message);
    }
});

export const updateState = createAsyncThunk("state/update", async (data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.token;
        return await stateService.editState(data.stateId, data, token);
    }
    catch (err) {
        const message = err?.response?.data?.title;
        return thunkAPI.rejectWithValue(message);
    }

});

export const deleteState = createAsyncThunk("state/delete", async (stateId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.token;
        return await stateService.deleteState(stateId, token);
    }
    catch (error) {
            const message = error?.response?.data?.title;
            return thunkAPI.rejectWithValue(message);
        }   
});



export const stateSlice = createSlice({
    name: "state",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        },
        resetState: (state) => initialState
    },
    extraReducers: (builder) =>
        builder
            .addCase(getStates.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getStates.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.states = action.payload;
                state.message = "States fetched successfully"
            })
            .addCase(getStates.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.states = [];
            })
            .addCase(createState.pending, (state) => {
                state.isLoading = true;
              })
              .addCase(createState.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.states.push(action.payload.data);
              })
              .addCase(createState.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Failed to create state";
              })
              .addCase(deleteState.pending, (state) => {
                state.isLoading = true;
              })
              .addCase(deleteState.fulfilled, (state, action) => {
                console.log(action.payload);
                
                state.isLoading = false;
                state.isSuccess = true;
                state.states = state.states.filter((b) => b.id !== action.payload.id);
              })
              .addCase(deleteState.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Failed to delete state";
              })
              .addCase(updateState.pending, (state) => {
                state.isLoading = true;
              })
              .addCase(updateState.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const index = state.states.findIndex(
                  (state) => state.stateId === action.payload.id
                );
                state.states[index] = {
                  ...state.states[index],
                  ...action.payload,
                };
              })
              .addCase(updateState.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Failed to update state";
              })
});
export const { reset ,resetState} = stateSlice.actions;
export default stateSlice.reducer;