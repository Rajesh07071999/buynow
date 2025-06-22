
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../api/apiHandler";
import { ErrorAlert, SuccessAlert } from "../../components/Alert/alert.js";

export const productListing = createAsyncThunk(
    "ProductListing",
    async (data) => {
        try {
            const response = await API.productListing({ ...data });
            const res = JSON.parse(response)
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

export const addProductRating = createAsyncThunk(
    "AddProductRating",
    async (data) => {
        try {
            const response = await API.addProductRating({ ...data });
            const res = JSON.parse(response)
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
    ProductListing: {
        data: [],
        error: null,
    },
    AddProductRating: {
        data: [],
        error: null,
    },
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProductId: (state) => {
            state.leadByIDGet.data = [];
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(productListing.fulfilled, (state, action) => {
                state.ProductListing.data = action.payload;
            })
            .addCase(productListing.rejected, (state, action) => {
                state.ProductListing.error = action.error.message;
            })
              .addCase(addProductRating.fulfilled, (state, action) => {
                state.AddProductRating.data = action.payload;
            })
            .addCase(addProductRating.rejected, (state, action) => {
                state.AddProductRating.error = action.error.message;
            })
    }
});

export const { setProductId } = productSlice.actions;
export default productSlice.reducer;
