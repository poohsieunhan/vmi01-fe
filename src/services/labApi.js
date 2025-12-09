import axios from "axios";

const API_BASE_URL = "/api/v1"; // Sử dụng đường dẫn tương đối để proxy hoạt động

const api = axios.create({
  baseURL: API_BASE_URL,
});

const labApi = {
  async getAll(options = {}) {
    const { page = 1, limit = 10 } = options;

    const res = await api.get("/lab", {
      params: { page, limit },
    });

    return res.data.metadata; // mảng thiết bị
  },

  async add(data) {
    const res = await api.post("/lab", data);
    return res.data;
  },

  async update(id, data) {
    const res = await api.put(`/lab/${id}`, data);
    return res.data;
  },

  async delete(id) {
    const res = await api.delete(`/lab/${id}`);
    return res.data;
  },
};

export default labApi;
