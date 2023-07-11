import { api } from "./axiosInstance";

interface IPropsGetAllProducts {
    search?: string;
    limit?: number;
    page?: number
}

export const getAllProduct = async ({
    search,
    limit = undefined,
    page
}: IPropsGetAllProducts) => {
    let res: any = {};
    if (search && search.length > 0) {
        res = await api.get(
            `/product/get-all?page=${page}&filter=name&filter=${search}&limit=${limit}`
        );
    } else {
        res = await api.get(
            `/product/get-all?page=${page}&limit=${limit}`
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

export const getAllTypeProduct = async () => {
    const res = await api.get(`/product/get-all-type`)
    return res.data
}

export const getProductType = async (type: any, page: any, limit: any) => {
    if (type) {
        const res = await api.get(`/product/get-all?filter=type&filter=${type}&limit=${limit}&page=${page}`)
        return res.data
    }
}


