import axios from "axios";

const authApiClint = axios.create({
  baseURL: "https://phi-mart-ten.vercel.app/api/v1",
  // baseURL: "http://127.0.0.1:8000/api/v1/",
});

export default authApiClint;

authApiClint.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `JWT ${JSON.parse(token).access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
