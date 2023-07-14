import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    email: '',
    phone: '',
    address: '',
    avatar: '',
    access_token: '',
    id: '',
    isAdmin: false,
    city: '',
    refreshToken: ''
}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { name = '', email = '', access_token = '', address = '', phone = '', avatar = '', _id = '', isAdmin, city = '' } = action.payload
            state.name = name;
            state.email = email;
            state.address = address ? address : state.address;
            state.phone = phone ? phone : state.phone;
            state.avatar = avatar ? avatar : state.avatar;
            state.id = _id ? _id : state.id
            state.isAdmin = isAdmin;
            state.access_token = access_token;
            state.city = city;
        },
        resetUser: (state) => {
            state.name = '';
            state.id = '';
            state.email = '';
            state.address = '';
            state.phone = '';
            state.avatar = '';
            state.access_token = '';
            state.isAdmin = false;
            state.city = "";


        },
    },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer

