import { commonApiRequest } from "@/helper/commonApiRequest";

const BASE_URL = import.meta.env.VITE_BASE_SERVER_URL;

export const createEventRequest = async (postData, header = false) => {
    return commonApiRequest(
        `${BASE_URL}/v1/event/create-event`,
        "POST",
        postData,
        header
    );
};
