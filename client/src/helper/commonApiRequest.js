import axios from "axios";

export const commonApiRequest = async (
    url,
    methodType,
    payload,
    header = false,
    auth = true
) => {
    // Initialize the configuration object for Axios.
    let config = {
        url,
        method: methodType,
        headers: {},
    };

    // Set the Content-Type header based on the header flag.
    if (header) {
        config.headers["Content-Type"] = "multipart/form-data";
    } else {
        config.headers["Content-Type"] = "application/json";
    }

    // Include credentials (e.g., cookies) if auth is true.
    if (auth) {
        config.withCredentials = true;
    }

    // For GET requests, use the payload as query parameters.
    // For other requests, use the payload as the request body.
    if (methodType.toLowerCase() === "get") {
        config.params = payload;
    } else {
        config.data = payload;
    }

    try {
        // console.log("config:", config);
        const response = await axios(config);

        // console.log("response: from commonApiRequest", response);

        return response.data;
    } catch (error) {
        // console.error("Error in commonApiRequest:", error);
        const errorMessage = error?.response?.data?.message;
        console.error("errorMessage", errorMessage);
        throw new Error(errorMessage || "Error");
    }
};
