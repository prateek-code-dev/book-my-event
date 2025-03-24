import { commonApiRequest } from "@/helper/commonApiRequest";

const BASE_URL = import.meta.env.VITE_BASE_SERVER_URL;

export const createBookingRequest = async (postData, header = false) => {
  return commonApiRequest(
    `${BASE_URL}/v1/booking/create-booking`,
    "POST",
    postData,
    header,
  );
};

export const getBookingDetailsRequest = async () => {
  return commonApiRequest(`${BASE_URL}/v1/booking/booking-details`, "GET");
};

export const cancelBookingTicketRequest = async (postData) => {
  return commonApiRequest(
    `${BASE_URL}/v1/booking/cancel-booking`,
    "POST",
    postData,
  );
};
