import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import countryService from "./countryService";


const initialState = {
    countries: [],
    country: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

export const getCountries = createAsyncThunk("country/get", async (thunkAPI) => {
    try {
        return await countryService.getCountries();
    } catch (error) {
        const message = error?.response?.data?.title;

        return thunkAPI.rejectWithValue(message);
    }
});

//createCountry
export const createCountry = createAsyncThunk(
    "country/createCountry",
    async (country, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.token;
        return await countryService.createCountry(country, token);
      } catch (error) {
        const message = error?.response?.data?.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  
  //deleteCountry
  export const deleteCountry = createAsyncThunk(
    "country/deleteCountry",
    async (id, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.token;
        await countryService.deleteCountry(id, token);
        return { id };
      } catch (error) {
        const message = error?.response?.data?.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  
  //updateBlog
  export const editCountry = createAsyncThunk(
    "country/editCountry",
    async (country, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.token;
        return await countryService.editCountry(country.countryId, country, token);
      } catch (error) {
        const message = error?.response?.data?.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  );


export const countrySlice = createSlice({
    name: "country",
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
    extraReducers: (builder)=>
    builder
    .addCase(getCountries.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(getCountries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.countries = action.payload;
        state.message="Countries fetched successfully"
    })
    .addCase(getCountries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.countries = [];
    })
    .addCase(createCountry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCountry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.countries.push(action.payload.data);
      })
      .addCase(createCountry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to create country";
      })
      .addCase(deleteCountry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCountry.fulfilled, (state, action) => {
        console.log(action.payload);
        
        state.isLoading = false;
        state.isSuccess = true;
        state.countries = state.countries.filter((b) => b.id !== action.payload.id);
      })
      .addCase(deleteCountry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to delete country";
      })
      .addCase(editCountry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCountry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.countries.findIndex(
          (country) => country.id === action.payload.id
        );
        state.countries[index] = {
          ...state.country[index],
          ...action.payload,
        };
      })
      .addCase(editCountry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to update country";
      })
});
export const { reset , resetState } = countrySlice.actions;
export default countrySlice.reducer;