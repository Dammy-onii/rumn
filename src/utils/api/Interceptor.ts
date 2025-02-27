import axios from "axios";
import { getUserToken } from "./userDetails";

const baseUrl = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: baseUrl,
});

api.interceptors.request.use(
  (config) => {
    const token = getUserToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
      console.log(config, "Figggggggggggggggg");
      console.log("Urlllllllllllllll", config.url);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (config) => config,
  (error) => {
    // console.error("Error in request interceptor:", error);
    // console.log(error.response);

    // if (error.response.status) {
    //   window.location.href = "/";
    // }

    return Promise.reject(error);
  }
);

export default api;
