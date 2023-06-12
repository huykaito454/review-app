import axios, { AxiosInstance } from "axios";

function instance(): AxiosInstance {
  const instance = axios.create();

  instance.interceptors.request.use(
    (config: any) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
}

export default instance;
