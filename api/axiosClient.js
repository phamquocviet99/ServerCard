import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const URL = process.env.URL_SERVER_ZALO;

const axiosClient = axios.create({
  baseURL: URL,
  headers: {
    "content-type": "application/json",
  },
});
axiosClient.interceptors.request.use(async (config) => {
  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    return console.log(error);
  }
);
export default axiosClient;
