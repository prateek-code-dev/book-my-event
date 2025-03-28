import { commonApiRequest } from "@/helper/commonApiRequest";

const BASE_URL = import.meta.env.VITE_BASE_SERVER_URL;

export const getAllUserDetailsRequest = async () => {
    return commonApiRequest(`${BASE_URL}/v1/user/admin/all-users`, "GET");
};

export const switchUserToAdmin = async (postData) => {
    return commonApiRequest(
        `${BASE_URL}/v1/user/admin/switch-admin-status`,
        "POST",
        postData
    );
};
