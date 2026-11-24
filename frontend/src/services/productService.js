// Service layer: no component ever calls axios directly.
import apiClient from "./apiClient";

const RESOURCE = "/products/";

export const listProducts = async (categoryId) => {
  const params = categoryId ? { category: categoryId } : {};
  const { data } = await apiClient.get(RESOURCE, { params });
  return data;
};

export const getProduct = async (id) => {
  const { data } = await apiClient.get(`${RESOURCE}${id}/`);
  return data;
};

export const createProduct = async (product) => {
  const { data } = await apiClient.post(RESOURCE, product);
  return data;
};

export const updateProduct = async (id, product) => {
  const { data } = await apiClient.put(`${RESOURCE}${id}/`, product);
  return data;
};

export const deleteProduct = async (id) => {
  await apiClient.delete(`${RESOURCE}${id}/`);
  return id;
};
