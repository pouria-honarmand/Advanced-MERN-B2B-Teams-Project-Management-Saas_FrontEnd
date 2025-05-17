import { CustomError } from "@/types/custom-error.type"; 
import axios from "axios";

// Set baseURL from environment variables
const baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

const options = {
  baseURL,
  withCredentials: true,
  timeout: 10000,
};

const API = axios.create(options);

API.interceptors.response.use(
  (response) => {
    // Successfully return the response if no errors
    return response;
  },
  async (error) => {
    // Check if error.response exists and handle cases where it doesn't
    if (!error.response) {
      const networkError: CustomError = new Error("Network error or server not reachable.") as CustomError;
      networkError.errorCode = "NETWORK_ERROR";
      return Promise.reject(networkError);
    }

    const { data, status } = error.response;

    // Handle specific unauthorized case
    if (data === "Unauthorized" && status === 401) {
      window.location.href = "/";
    }

    // Create a custom error and assign additional details
    const customError: CustomError = new Error(data?.message || "An unexpected error occurred.") as CustomError;
    customError.errorCode = data?.errorCode || "UNKNOWN_ERROR";

    // Return the custom error as a rejected promise
    return Promise.reject(customError);
  }
);

export default API;
