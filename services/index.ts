import axios, { AxiosRequestConfig } from "axios";
import { authProvider } from "../components/AuthProvider";
import { HttpError } from "react-admin";

export const getToken = () => {
  const auth = localStorage.getItem("auth");
  // console.log (JSON.parse(auth ? auth : "{}").data.token);
  // console.log("auth", auth);
  return String(JSON.parse(auth ? auth : "{}").token);
};

const onRequestSuccess = (config: AxiosRequestConfig) => {};

export const getAuthorizationHeader = () => `Bearer ${getToken()}`;

const apiURL = "http://localhost:3000";
const api = axios.create({
  baseURL: apiURL,
  // headers: {
  //   Authorization: getAuthorizationHeader(),
  // },
});
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    const status = error.response.status;
    console.log(status);
    if (status < 200 || status >= 300) {
      return Promise.reject(
        new HttpError((error && error.message) || error.statusText, status)
      );
    }

    return Promise.reject(error);
  }
);

api.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers
    ? (config.headers["Authorization"] = getAuthorizationHeader())
    : {};
  return config;
});

export default api;
