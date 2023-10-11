import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cityService from "./cityService";

const initialState = {
    cities: [],
    city: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

export const getCities = createAsyncThunk("city/get", async (stateId,thunkAPI) => {
    try {
        return await cityService.getCities(stateId);
    } catch (error) {
        const message = error?.response?.data?.title;
        return thunkAPI.rejectWithValue(message);
    }
});


export const getCity = createAsyncThunk("city/get", async (cityId, thunkAPI) => {
    try {
      console.log(cityId);
        return await cityService.getCity(cityId);

    } catch (error) {
        const message = error?.response?.data?.title;
        return thunkAPI.rejectWithValue(message);
    }
});

export const createCity = createAsyncThunk("city/create", async (data, thunkAPI) => {
    var stateId = data.stateId;
    var city = data.city;
    try {
        const token = thunkAPI.getState().auth.token;
        return await cityService.createCity(stateId, city, token);
    }
    catch (error) {
        const message = error?.response?.data?.title;
        return thunkAPI.rejectWithValue(message);
    }
});

export const updateCity = createAsyncThunk("city/update", async (data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.token;
        await cityService.editCity(data.cityId, data, token);
        return { id:data?.cityId};
    }
    catch (err) {
        const message = err?.response?.data?.title;
        return thunkAPI.rejectWithValue(message);
    }

});

export const deleteCity = createAsyncThunk("city/delete", async (cityId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.token;
        return await cityService.deleteCity(cityId, token);
    }
    catch (error) {
            const message = error?.response?.data?.title;
            return thunkAPI.rejectWithValue(message);
        }   
});



export const citySlice = createSlice({
    name: "city",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        },
        resetState:(state) => initialState
    },
    extraReducers: (builder)=>
    builder
    .addCase(getCities.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(getCities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cities = action.payload;
        state.message="City fetched successfully"
    })
    .addCase(getCities.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.cities = [];
    })
    .addCase(createCity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cities.push(action.payload.data);
      })
      .addCase(createCity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to create City";
      })
      .addCase(deleteCity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCity.fulfilled, (state, action) => {
        console.log(action.payload);
        
        state.isLoading = false;
        state.isSuccess = true;
        state.cities = state.cities.filter((b) => b.cityId !== action.payload.id);
      })
      .addCase(deleteCity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to delete City";
      })
      .addCase(updateCity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload);
        // const index = state.cities?.findIndex(
        //   (state) => state.cityId === action.payload.id
        // );
        // state.cities[index] = {
        //   ...state.cities[index],
        //   ...action.payload,
        // };
      })
      .addCase(updateCity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to update city";
      })
});

export const { reset ,resetState} = citySlice.actions;
export default citySlice.reducer;