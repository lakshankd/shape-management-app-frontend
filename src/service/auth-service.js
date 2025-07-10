import axiosInstance from "./axios";

export const login = async (credentials) => {
  const response = await axiosInstance.post("v1/auth/login", credentials);
  localStorage.setItem("access_token", response.data.token);
  return response.data;
};

export const register = async (userData) => {
  const response = await axiosInstance.post("v1/auth/register", userData);
  localStorage.setItem("access_token", response.data.token);
  return response.data;
};

export const authMe = async () => {
  const response = await axiosInstance.get("v1/auth/me");
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("access_token");
};
