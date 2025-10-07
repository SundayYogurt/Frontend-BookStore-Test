import api from "./api";

const API_URL = import.meta.env.VITE_BOOKS_API || "https://bookshop-api-er7t.onrender.com/api/books"

const createBook = async (data) => {
  return await api.post(`${API_URL}/`, data);
};

const getAllBooks = async () => {
  return await api.get(`${API_URL}/`);
};

const updateBook = async (id, book) => {
  return await api.put(`${API_URL}/${id}`, book);
};

const getBookById = async (id) => {
  return await api.get(`${API_URL}/${id}`);
};

const deleteBook = async (id) => {
  return await api.delete(`${API_URL}/${id}`);
};

const BooksService = {
  getAllBooks,
  deleteBook,
  createBook,
  updateBook,
  getBookById,
};

export default BooksService;