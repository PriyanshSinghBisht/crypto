import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


const localStorage = window.localStorage.getItem("user-stared-crypto")
const initialState = localStorage ? JSON.parse(localStorage) : [];

const localStorageSlice = createSlice({
    name: "localStorage",
    initialState: {
        data: initialState,
    },
    reducers: {
        addData: (state, action) => {
            const newData = [...state.data,action.payload];
            window.localStorage.setItem("user-stared-crypto", JSON.stringify(newData));
            state.data = newData;
            toast.success(`Crypto ${action.payload} ADDED to LocalStorage`, {
                duration: 2000,
            });
        }, 
        clearData: (state) => {
            window.localStorage.removeItem("user-stared-crypto");
            state.data = [];
        },
        removeData: (state, action) => {
            console.log(state.data, action)
            const newData = state.data.filter((item : any) => item !== action.payload);
            window.localStorage.setItem("user-stared-crypto", JSON.stringify(newData));
            state.data = newData;
            toast.success(`Crypto ${action.payload} REMOVED from LocalStorage`, {
                duration: 2000,
            });
        }
    }
})

export const { addData, clearData, removeData } = localStorageSlice.actions;
export const localStorageReducer = localStorageSlice.reducer;

