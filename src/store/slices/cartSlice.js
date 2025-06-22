
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../api/apiHandler";
import { ErrorAlert } from "../../components/Alert/alert.js"; 

export const addToCart = createAsyncThunk(
  "AddToCart",
  async (data) => {
    try {
      const response = await API.addToCart({ ...data });
      const res=JSON.parse(response)
      if (res?.code == 200) {
        // SuccessAlert(res.message);
      } else {
        ErrorAlert(res.message);
      }
      return res;
    } catch (error) {
      ErrorAlert(error);
    }
  }
);
export const cartListing = createAsyncThunk(
  "CartListing",
  async (data) => {
    try {
      const response = await API.cartListing({ ...data });
      const res=JSON.parse(response)
      if (res?.code == 200) {
        // SuccessAlert(res.message);
      } else {
        ErrorAlert(res.message);
      }
      return res;
    } catch (error) {
      ErrorAlert(error);
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "RemoveCart",
  async (data) => {
    try {
      const response = await API.removeCart({ ...data });
      const res=JSON.parse(response)
      if (res?.code == 200) {
        // SuccessAlert(res.message);
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
   AddToCart: {
    data: [],
    error: null,
  },
   CartListing: {
    data: [],
    error: null,
  },
    RemoveCart: {
    data: [],
    error: null,
  },

};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
     setCartId: (state) => {
      state.leadByIDGet.data = [];
    },

  },
   extraReducers: (builder) => {
    builder
      .addCase(addToCart.fulfilled, (state, action) => {
        state.AddToCart.data = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.AddToCart.error = action.error.message;
      })
       .addCase(cartListing.fulfilled, (state, action) => {
        state.CartListing.data = action.payload;
      })
      .addCase(cartListing.rejected, (state, action) => {
        state.CartListing.error = action.error.message;
      })
       .addCase(removeCartItem.fulfilled, (state, action) => {
        state.RemoveCart.data = action.payload;
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.RemoveCart.error = action.error.message;
      })
    }
});

export const {  setCartId } = cartSlice.actions;
export default cartSlice.reducer;
