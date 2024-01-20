import Axios from "axios";

export const axiosInstance = Axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 1000,
    headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        switch (error.response.status) {
            case 400:
                throw error;
            case 401:
                throw error;
            case 403:
                throw error;
            case 404:
                throw error;
            case 500:
                break;
                throw error;
            default:
                throw error;
        }
    },
);

export const authAxios = Axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 1000,
    headers: { "Content-Type": "application/json" },
});
authAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        switch (error.response?.status) {
            case 400:
                throw error;
            case 401:
                throw error;
            case 403:
                throw error;
            case 404:
                throw error;
            case 500:
                throw error;
            default:
                throw error;
        }
    },
);
