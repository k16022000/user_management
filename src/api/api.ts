import axios, { AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://reqres.in/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'reqres-free-v1',
  },
});

export const api = {
  get<T = unknown>(url: string, config?: AxiosRequestConfig) {
    return axiosInstance.get<T>(url, config);
  },
  post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return axiosInstance.post<T>(url, data, config);
  },
  put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return axiosInstance.put<T>(url, data, config);
  },
  delete<T = unknown>(url: string, config?: AxiosRequestConfig) {
    return axiosInstance.delete<T>(url, config);
  },
};
