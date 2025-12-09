import axios from "axios";

const API_BASE_URL = "/api/v1"; // Sử dụng đường dẫn tương đối để proxy hoạt động

const api = axios.create({
  baseURL: API_BASE_URL,
});

const requestFormApi = {
  async getAll({ page = 1, limit = 10 }) {
    const res = await api.get("/requestform", {
      params: { page, limit },
    });
    console.log(res);
    return res.data.metadata; // Trả về phần metadata chứa data và pagination
  },

  async getById(id) {
    const res = await api.get(`/requestform/rfid/${id}`);
    return res.data.metadata;
  },

  async add(data) {
    const res = await api.post("/requestform", data);
    return res.data;
  },

  async update(id, data) {
    const res = await api.put(`/requestform/${id}`, data);
    return res.data;
  },

  async delete(id) {
    const res = await api.delete(`/requestform/${id}`);
    return res.data;
  },
};

export default requestFormApi;
