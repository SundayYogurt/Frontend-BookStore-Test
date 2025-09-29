import api from "./api";
const API_URL = import.meta.env.VITE_BOOKS_API;

const createBooks = async (data) => {
  return await api.post(API_URL + "/", data);
};

const updateBook = async (id, data) => {
  return await api.put(`${API_URL}/${id}`, data);
};

const getAllBooks = async () => {
  return await api.get(API_URL + "/");
};


const deleteBook = async (id) => {
  return await api.delete(`${API_URL}/${id}`);
};

const getBookById = async (id) => {
  return await api.get(`${API_URL}/${id}`);
};

const BooksService = {
  createBooks,
  updateBook,
  getAllBooks,
  deleteBook,
  getBookById,
};

export default BooksService;
