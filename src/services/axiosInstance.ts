import axios from "axios";

import { store } from "../Redux/store";

export const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});
api.interceptors.request.use(
    (config) => {
        const _store = store.getState();
        const user = _store.user;
        console.log('user.access_token trong api ', user.access_token);

        config.headers.Authorization = user?.access_token
            ? `Bearer ${user.access_token}`
            : '';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

