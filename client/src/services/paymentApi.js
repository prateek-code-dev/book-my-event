import { commonApiRequest } from "@/helper/commonApiRequest";

const BASE_URL = import.meta.env.VITE_BASE_SERVER_URL;

export const createOrderPaymentRequest = async (postData) => {
    return commonApiRequest(
        `${BASE_URL}/v1/payment/create-order`,
        "POST",
        postData,
        ""
    );
};

export const verifyPaymentRequest = async (postData) => {
    return commonApiRequest(
        `${BASE_URL}/v1/payment/verify-payment`,
        "POST",
        postData,
        ""
    );
};
