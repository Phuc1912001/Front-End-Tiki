import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as productService from "../../services/productSevice";

// Action thực hiện gọi API để tạo sản phẩm mới
export const getTypeProducts = createAsyncThunk(
    "typeProducts/getTypeProduct",
    async () => {
        try {
            const response = await productService.getAllTypeProduct();
            return response.data;
        } catch (error: any) {
            return error;
        }
    }
);

const initialState = {
    typeProduct: [],
    loading: false,
    error: null as string | null,
};

const typeProductSlice = createSlice({
    name: "typeProduct",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTypeProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getTypeProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.typeProduct = action.payload;
        });
        builder.addCase(getTypeProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
    },
});



export default typeProductSlice.reducer;

