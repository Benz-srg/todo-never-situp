import axios from "axios";
import Swal from "sweetalert2";

axios.defaults.headers.post["Content-Type"] = "application/json";
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: false,
});

axiosInstance.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  if (config.headers.Authorization) {}
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status || 0;
    if ([401, 403, 0].includes(status) && !originalRequest._retry) {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
          localStorage.removeItem("token");
          await Swal.fire({
            icon: "error",
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonText: "ล็อคอินเข้าสู่ระบบ",
          }).then((result) => {
            window.location.href = "/login";
          });
          return;
        }else{
            window.location.href = "/login";
        }
      }
    }
    return Promise.reject(
      (error.response && error.response.data) || "Wrong Services"
    );
  }
);


export default axiosInstance;
