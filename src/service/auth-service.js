import axiosInstance from "./axios";

export const login = async (credentials) => {
  const response = await axiosInstance.post("/auth/login", credentials);
  console.log("login res::", response);
  localStorage.setItem("access_token", response.data.token);
  return response.data;
};

export const register = async (userData) => {
  const response = await axiosInstance.post("/auth/register", userData);
  console.log("register res::", response);
  localStorage.setItem("access_token", response.data.token);
  return response.data;
};

export const authMe = async () => {
  const response = await axiosInstance.post("/auth/register", userData);
  localStorage.setItem("access_token", response.data.token);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("access_token");
};
