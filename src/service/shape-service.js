import axiosInstance from "./axios";

export const createShape = async (shapeData) => {
  const response = await axiosInstance.post("v1/shapes", shapeData);
  return response.data;
};

export const getAllShape = async () => {
  const response = await axiosInstance.get("v1/shapes");
  return response.data;
};

export const deleteShapeById = async (id) => {
  const response = await axiosInstance.delete(`v1/shapes/${id}`);
  return response.data;
};

export const updateShapeById = async (id, shapeData) => {
  const response = await axiosInstance.put(`v1/shapes/${id}`, shapeData);
  return response.data;
};
