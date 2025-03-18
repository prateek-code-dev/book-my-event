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

export const getAllEventsRequest = async (postData, header = false) => {
    return commonApiRequest(
        `${BASE_URL}/v1/event/all-events`,
        "GET",
        "",
        header
    );
};

export const getEventDetailsRequest = async (id, header) => {
    return commonApiRequest(
        `${BASE_URL}/v1/event/event-details/${id}`,
        "GET",
        "",
        (header = false)
    );
};

export const updateEventRequest = async (postData, id, header = false) => {
    return commonApiRequest(
        `${BASE_URL}/v1/event/update-event/${id}`,
        "PUT",
        postData,
        (header = false)
    );
};
