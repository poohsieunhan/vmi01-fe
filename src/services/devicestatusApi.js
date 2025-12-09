import axios from "axios";

const API_BASE_URL = "/api/v1"; // Sử dụng đường dẫn tương đối để proxy hoạt động

const api = axios.create({
  baseURL: API_BASE_URL,
});

const deviceStatusApi = {
  async getAll(options = {}) {
    const { page = 1, limit = 10 } = options;

    const res = await api.get("/devicestatus", {
      params: { page, limit },
    });

    return res.data.metadata; // mảng thiết bị
  },

  async add(data) {
    const res = await api.post("/devicestatus", data);
    return res.data;
  },

  async update(id, data) {
    const res = await api.put(`/devicestatus/${id}`, data);
    return res.data;
  },

  async delete(id) {
    const res = await api.delete(`/devicestatus/${id}`);
    return res.data;
  },
};

export default deviceStatusApi;
