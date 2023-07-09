export interface IProduct {
    name: string;
    image: string;
    type: string;
    price: number;
    countInStock: number;
    rating: number;
    description?: string;
    discount?: number;
    selled?: number;
    _id: string;
}

export type IProductArray = IProduct[];
