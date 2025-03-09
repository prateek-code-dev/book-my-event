import { commonApiRequest } from "@/helper/commonApiRequest";

const BASE_URL = import.meta.env.VITE_BASE_SERVER_URL;

export const loginApiRequest = async (postData, header = false) => {
    return await commonApiRequest(
        `${BASE_URL}/v1/user/login`,
        "POST",
        postData,
        header
    );
};

export const registerApiRequest = async (postData, header = false) => {
    return await commonApiRequest(
        `${BASE_URL}/v1/user/register`,
        "POST",
        postData,
        header
    );
};
