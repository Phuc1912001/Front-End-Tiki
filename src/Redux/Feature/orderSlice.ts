import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderItem {
    name: string;
    product: string;
    amount: number;
    image: string;
    price: number;
    discount: number;
    countInstock: number;
    // Add other properties of the order item
}


interface ShippingAddress {
    // Define the properties of the shipping address
}

interface OrderState {
    orderItems: OrderItem[];
    orderItemsSelected: OrderItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
    user: string;
    isPaid: boolean;
    paidAt: string;
    isDelivered: boolean;
    deliveredAt: string;
    isSuccessOrder: boolean;
}

const initialState: OrderState = {
    orderItems: [],
    orderItemsSelected: [],
    shippingAddress: {},
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: '',
    isSuccessOrder: false,
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderProduct: (state, action: PayloadAction<{ orderItem: OrderItem }>) => {
            const { orderItem } = action.payload;
            const itemOrder = state.orderItems.find((item) => item.product === orderItem.product);
            if (itemOrder) {
                if (itemOrder.amount <= itemOrder.countInstock) {
                    itemOrder.amount += orderItem.amount;
                    state.isSuccessOrder = true;
                }
            } else {
                state.orderItems.push(orderItem);
            }
        },
        resetOrder: (state) => {
            state.isSuccessOrder = false;
        },
        increaseAmount: (state, action: PayloadAction<{ idProduct: string }>) => {
            console.log("idProduct", action.payload.idProduct);
            const { idProduct } = action.payload;
            const itemOrder = state.orderItems.find((item) => item.product === idProduct);
            const itemOrderSelected = state.orderItemsSelected.find((item) => item.product === idProduct);
            if (itemOrder) {
                itemOrder.amount++;
                if (itemOrderSelected) {
                    itemOrderSelected.amount++;
                }
            }
        },
        decreaseAmount: (state, action: PayloadAction<{ idProduct: string }>) => {
            const { idProduct } = action.payload;
            const itemOrder = state.orderItems.find((item) => item.product === idProduct);
            const itemOrderSelected = state.orderItemsSelected.find((item) => item.product === idProduct);
            if (itemOrder) {
                itemOrder.amount--;
                if (itemOrderSelected) {
                    itemOrderSelected.amount--;
                }
            }
        },
        removeOrderProduct: (state, action: PayloadAction<{ idProduct: string }>) => {
            const { idProduct } = action.payload;
            state.orderItems = state.orderItems.filter((item) => item.product !== idProduct);
            state.orderItemsSelected = state.orderItemsSelected.filter((item) => item.product !== idProduct);
        },
        removeAllOrderProduct: (state, action: PayloadAction<{ listChecked: string[] }>) => {
            const { listChecked } = action.payload;
            state.orderItems = state.orderItems.filter((item) => !listChecked.includes(item.product));
            state.orderItemsSelected = state.orderItemsSelected.filter((item) => !listChecked.includes(item.product));
        },
        selectedOrder: (state, action: PayloadAction<{ listChecked: string[] }>) => {
            const { listChecked } = action.payload;
            const orderSelected = state.orderItems.filter((order) => listChecked.includes(order.product));
            state.orderItemsSelected = orderSelected;
        },
    },
});

export const {
    addOrderProduct,
    increaseAmount,
    decreaseAmount,
    removeOrderProduct,
    removeAllOrderProduct,
    selectedOrder,
    resetOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
