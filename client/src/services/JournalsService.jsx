import api from "./api";

const API_URL = import.meta.env.VITE_JOURNALS_API || "https://bookshop-api-er7t.onrender.com/api/journals";

const createJournal = async (data) => {
  return await api.post(`${API_URL}/`, data);
};

const getAllJournals = async () => {
  return await api.get(`${API_URL}/`);
};

const updateJournal = async (id, journal) => {
  return await api.put(`${API_URL}/${id}`, journal);
};

const getJournalById = async (id) => {
  return await api.get(`${API_URL}/${id}`);
};

const deleteJournal = async (id) => {
  return await api.delete(`${API_URL}/${id}`);
};

const JournalsService = {
  getAllJournals,
  deleteJournal,
  createJournal,
  updateJournal,
  getJournalById,
};

export default JournalsService;
