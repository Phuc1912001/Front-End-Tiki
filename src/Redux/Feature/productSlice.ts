import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { api } from "../../services/axiosInstance";

export interface IProducts {
    isLoading: boolean;
    products: [];
}

const initialState: IProducts = {
    isLoading: false,
    products: [],
};

// ... imports

export const getAllProduct = createAsyncThunk(
    'products/fetchAllProduct',
    async (search: any, { getState }) => {
        const { limit }: any = getState(); // Get the limit value from the state
        let res: any = {};
        if (search?.length > 0) {
            res = await api.get(
                `/product/get-all?filter=name&filter=${search}&limit=${limit}`
            );
        } else {
            res = await axios.get(`/product/get-all?limit=${limit}`);
        }
        return res.data;
    }
);

// ... rest of the code

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProduct.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getAllProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload
        });
        builder.addCase(getAllProduct.rejected, (state, action) => {
            state.isLoading = false;
        });
    },
});

export default productSlice.reducer