import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

import { createStateSyncMiddleware, initMessageListener } from 'redux-state-sync';
import userSlice from "./Feature/userSlice";
import productSlice from "./Feature/productSlice";
import typeProductSlice from "./Feature/typeProductSlice";
import orderSlice from "./Feature/orderSlice";
const reduxStateSyncConfig = {
    predicate: (action: any) => {
        const blacklist = [PERSIST, PURGE, REHYDRATE];
        if (typeof action !== "function") {
            if (Array.isArray(blacklist)) {
                return blacklist.indexOf(action.type) < 0;
            }
        }
        return false;
    },
};

const stateSyncMiddleware = [createStateSyncMiddleware(reduxStateSyncConfig)]

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
        user: userSlice,
        product: productSlice,
        typeProduct: typeProductSlice,
        order: orderSlice,
    })
);

const middleware = (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }).concat(stateSyncMiddleware);

export const store = configureStore({
    reducer: persistedReducer,
    middleware,
});
initMessageListener(store);
export const persistor = persistStore(store);
