import {
    createOrderPaymentRequest,
    verifyPaymentRequest,
} from "@/services/paymentApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createPaymentOrderDispatchFunction = createAsyncThunk(
    "createPaymentOrder",
    async (postData, thunkAPI) => {
        try {
            const response = await createOrderPaymentRequest(postData);

            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(`Error! ${error.message || error}`);
        }
    }
);

export const verifyPaymentDispatchFunction = createAsyncThunk(
    "verifyPayment",
    async (
        {
            razorpay_payment_id: paymentId,
            razorpay_order_id: orderId,
            razorpay_signature: signature,
        },
        thunkAPI
    ) => {
        try {
            const response = await verifyPaymentRequest({
                razorpay_payment_id: paymentId,
                razorpay_order_id: orderId,
                razorpay_signature: signature,
            });

            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(`Error! ${error.message || error}`);
        }
    }
);

export const paymentSlice = createSlice({
    name: "paymentSlice",
    initialState: {
        loading: false,
        error: null,
        data: [],
    },

    extraReducers: (builder) => {
        builder
            .addCase(
                createPaymentOrderDispatchFunction.pending,
                (state, action) => {
                    state.loading = true;
                }
            )
            .addCase(
                createPaymentOrderDispatchFunction.fulfilled,
                (state, action) => {
                    (state.loading = false), (state.data = action.payload);
                }
            )
            .addCase(
                createPaymentOrderDispatchFunction.rejected,
                (state, action) => {
                    (state.loading = false), (state.error = action.payload);
                }
            )
            .addCase(verifyPaymentDispatchFunction.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(
                verifyPaymentDispatchFunction.fulfilled,
                (state, action) => {
                    (state.loading = false), (state.data = action.payload);
                }
            )
            .addCase(
                verifyPaymentDispatchFunction.rejected,
                (state, action) => {
                    (state.loading = false), (state.error = action.payload);
                }
            );
    },
});

export default paymentSlice.reducer;
