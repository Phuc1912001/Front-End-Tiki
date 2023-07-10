import axios from "axios";
import { api } from "./axiosInstance";

interface IPropUpdateUser {
    id: any,
    data: any

}


export const updateUser = async ({ id, data }: IPropUpdateUser) => {
    const res = await api.put(
        `/user/update-user/${id}`,
        data,
    );
    return res.data;
};

export const getAllUser = async () => {
    const res = await api.get(`/user/getAll`)
    return res.data
}

export const getDetailsUser = async (id: any) => {
    const res = await api.get(`/user/get-details/${id}`)
    return res.data
}

export const deleteUser = async (id: any) => {
    const res = await api.delete(`/user/delete-user/${id}`)
    return res.data
}



