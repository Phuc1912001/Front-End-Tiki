import { api } from "./axiosInstance";

interface IPropsGetAllProducts {
    search?: any;
    limit?: number;
}

export const getAllProduct = async ({
    search,
    limit,
}: IPropsGetAllProducts = { limit: undefined }) => {
    let res: any = {};
    if (search?.length > 0) {
        res = await api.get(
            `/product/get-all?filter=name&filter=${search}&limit=${limit}`
        );
    } else {
        res = await api.get(
            `/product/get-all?limit=${limit}`
        );
    }
    return res.data;
};

export const createProduct = async (data: any) => {
    const res = await api.post(`/product/create`, data);
    return res.data;
};

export const getDetailsProduct = async (id: any) => {
    const res = await api.get(
        `/product/get-details/${id}`
    );
    return res.data;
};

export const updateProduct = async (id: any, data: any) => {
    const res = await api.put(`/product/update/${id}`, data,)
    return res.data
}

export const deleteProduct = async (id: any) => {
    const res = await api.delete(`/product/delete/${id}`)
    return res.data
}


