import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    search: '',
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        searchProductGlobal: (state, action) => {
            state.search = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { searchProductGlobal } = productSlice.actions

export default productSlice.reducer