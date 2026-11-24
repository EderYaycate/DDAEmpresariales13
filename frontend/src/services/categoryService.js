import apiClient from "./apiClient";

const RESOURCE = "/categories/";

export const listCategories = async () => {
  const { data } = await apiClient.get(RESOURCE);
  return data;
};

export const getCategory = async (id) => {
  const { data } = await apiClient.get(`${RESOURCE}${id}/`);
  return data;
};

export const createCategory = async (category) => {
  const { data } = await apiClient.post(RESOURCE, category);
  return data;
};

export const updateCategory = async (id, category) => {
  const { data } = await apiClient.put(`${RESOURCE}${id}/`, category);
  return data;
};

export const deleteCategory = async (id) => {
  await apiClient.delete(`${RESOURCE}${id}/`);
  return id;
};
