import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL + "api/v1"; // Sử dụng đường dẫn tương đối để proxy hoạt động

const api = axios.create({
  baseURL: API_BASE_URL,
});

const deviceApi = {
  async getAll(options = {}) {
    const { page = 1, limit = 10 } = options;

    const res = await api.get("/device", {
      params: { page, limit },
    });

    return res.data.metadata; // mảng thiết bị
  },

  async getById(id) {
    const res = await api.get(`/device/${id}`);
    return res.data.metadata;
  },

  async add(data) {
    const res = await api.post("/device", data);
    return res.data;
  },

  async update(id, data) {
    const res = await api.put(`/device/${id}`, data);
    return res.data;
  },

  async delete(id) {
    const res = await api.delete(`/device/${id}`);
    return res.data;
  },
};

export default deviceApi;
