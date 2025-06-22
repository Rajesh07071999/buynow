
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../api/apiHandler";
import { ErrorAlert, SuccessAlert } from "../../components/Alert/alert.js"; 

export const orderPlace = createAsyncThunk(
  "OrderPlace",
  async (data) => {
    try {
      const response = await API.orderPlace({ ...data });
      const res=JSON.parse(response)
      if (res?.code == 200) {
        SuccessAlert(res.message);
      } else {
        ErrorAlert(res.message);
      }
      return res;
    } catch (error) {
      ErrorAlert(error);
    }
  }
);
export const orderListing = createAsyncThunk(
  "OrderListing",
  async (data) => {
    try {
      const response = await API.orderListing({ ...data });
      const res=JSON.parse(response)
      if (res?.code == 200) {
        // SuccessAlert(res.message);
      } else {
        // ErrorAlert(res.message);
      }
      return res;
    } catch (error) {
      ErrorAlert(error);
    }
  }
);
export const cancelOrder = createAsyncThunk(
  "CancelOrder",
  async (data) => {
    try {
      const response = await API.cancelOrder({ ...data });
      const res=JSON.parse(response)
      if (res?.code == 200) {
        SuccessAlert(res.message);
      } else {
        ErrorAlert(res.message);
      }
      return res;
    } catch (error) {
      ErrorAlert(error);
    }
  }
);
const initialState = {
   OrderPlace: {
    data: [],
    error: null,
  },
    OrderListing: {
    data: [],
    error: null,
  },
  CancelOrder:{
    data:[],
    error:null
  }

};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
     setOrderId: (state) => {
      state.leadByIDGet.data = [];
    },

  },
   extraReducers: (builder) => {
    builder
      .addCase(orderPlace.fulfilled, (state, action) => {
        state.OrderListing.data = action.payload;
      })
      .addCase(orderPlace.rejected, (state, action) => {
        state.OrderPlace.error = action.error.message;
      })
       .addCase(orderListing.fulfilled, (state, action) => {
        state.OrderListing.data = action.payload;
      })
      .addCase(orderListing.rejected, (state, action) => {
        state.OrderListing.error = action.error.message;
      })
         .addCase(cancelOrder.fulfilled, (state, action) => {
        state.CancelOrder.data = action.payload;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.CancelOrder.error = action.error.message;
      })
    }
});

export const {  setOrderId } = orderSlice.actions;
export default orderSlice.reducer;
