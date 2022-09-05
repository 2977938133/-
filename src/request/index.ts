import axios, { AxiosInstance } from "axios";
import { ElMessage } from 'element-plus'
const request: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
  withCredentials: true,
});

request.interceptors.request.use(
  (config) => {
    return config;
  },
  function (error) {
    ElMessage.error('error',error)
    return Promise.reject(error);
  }
);

request.interceptors.response.use((response) => {
  if (response.status == 200) {
    return response;
  }
},(error) => {
  ElMessage.error('error',error)
  return Promise.reject(error)
});

export default request