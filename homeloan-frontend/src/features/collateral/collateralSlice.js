import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import collateralService from "./collateralService";

const initialState = {
  collaterals: [],
  collateral: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//getAllBlogs
export const getCollaterals = createAsyncThunk(
  "collateral/getCollaterals",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await collateralService.getCollaterals(token);
    } catch (error) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//getSingleBlog
export const getCollateral = createAsyncThunk(
  "collateral/getCollateral",
  async (id, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.token;
      // return await collateralService.getCollateral(id, token);
      return {id};
    } catch (error) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//createCollateral
export const createCollateral = createAsyncThunk(
  "collateral/createCollateral",
  async (collateral, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await collateralService.createCollateral(collateral, token);
    } catch (error) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//deleteCollateral
export const deleteCollateral = createAsyncThunk(
  "collateral/deleteCollateral",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      await collateralService.deleteCollateral(id, token);
      return { id };
    } catch (error) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//updateBlog
export const editCollateral = createAsyncThunk(
  "collateral/editCollateral",
  async (collateral, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      collateral.time = new Date().toISOString();
      return await collateralService.editCollateral(collateral.id, collateral, token);
    } catch (error) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);


const collateralSlice = createSlice({
  name: "collateral",
  initialState,
  reducers: {
    reset: (state) => initialState,
    resetState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.collateral = {};
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCollaterals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCollaterals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.collaterals = action.payload;
      })
      .addCase(getCollaterals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch collaterals";
      })
      .addCase(getCollateral.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCollateral.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.collateral = state.collaterals.filter(col => col.id == action.payload.id)[0];
        console.log(state.collateral);
      })
      .addCase(getCollateral.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch collaterals";
      })
      .addCase(createCollateral.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCollateral.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.collaterals.push(action.payload.data);
      })
      .addCase(createCollateral.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to create collateral";
      })
      .addCase(deleteCollateral.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCollateral.fulfilled, (state, action) => {
        console.log(action.payload);
        
        state.isLoading = false;
        state.isSuccess = true;
        state.collaterals = state.collaterals.filter((b) => b.id !== action.payload.id);
      })
      .addCase(deleteCollateral.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to delete collateral";
      })
      .addCase(editCollateral.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCollateral.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.collaterals.findIndex(
          (collateral) => collateral.id === action.payload.id
        );
        state.collaterals[index] = {
          ...state.collateral[index],
          ...action.payload,
        };
      })
      .addCase(editCollateral.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to update collateral";
      })
  },
});

export const { reset, resetState } = collateralSlice.actions;
export default collateralSlice.reducer;