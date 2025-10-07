import api from "./api";

const API_URL = import.meta.env.VITE_COMICS_API || "https://bookshop-api-er7t.onrender.com/api/comics";

const createComic = async (data) => {
  return await api.post(`${API_URL}/`, data);
};

const getAllComics = async () => {
  return await api.get(`${API_URL}/`);
};

const updateComic = async (id, comic) => {
  return await api.put(`${API_URL}/${id}`, comic);
};

const getComicById = async (id) => {
  return await api.get(`${API_URL}/${id}`);
};

const deleteComic = async (id) => {
  return await api.delete(`${API_URL}/${id}`);
};

const ComicsService = {
  getAllComics,
  deleteComic,
  createComic,
  updateComic,
  getComicById,
};

export default ComicsService;