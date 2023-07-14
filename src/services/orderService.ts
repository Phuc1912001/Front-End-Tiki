import { api } from "./axiosInstance";

export const createOrder = async (data: any) => {
    const res = await api.post(`/order/create`, data);
    return res.data;
};

export const getOrderByUserId = async (id: any) => {
    const res = await api.get(`/order/get-all-order/${id}`);
    return res.data;
};

export const getDetailsOrder = async (id: any) => {
    const res = await api.get(`/order/get-details-order/${id}`);
    return res.data;
};

export const cancelOrder = async (id: any, orderItems: any, userId: any) => {
    const data = { orderItems, orderId: id };
    const res = await api.delete(`/order/cancel-order/${userId}`, { data });
    return res.data;
};

export const getAllOrder = async () => {
    const res = await api.get(`/order/get-all-order`);
    return res.data;
};
