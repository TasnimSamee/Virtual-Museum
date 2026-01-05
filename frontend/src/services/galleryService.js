import axios from "axios";

import API_BASE_URL from "../config/apiConfig";

export const getAllGalleries = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/galleries`);
  return response.data;
};

export const getFeaturedGalleries = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/galleries/featured`);
  return response.data;
};