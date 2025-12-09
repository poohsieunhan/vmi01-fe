import axios from "axios";

const API_BASE_URL = "/api/v1"; // Sử dụng đường dẫn tương đối để proxy hoạt động

const api = axios.create({
  baseURL: API_BASE_URL,
});

const requestFormDetailApi = {
  async getAll({ page = 1, limit = 10 }) {
    const res = await api.get("/requestformdetail", {
      params: { page, limit },
    });
    console.log(res);
    return res.data.metadata; // Trả về phần metadata chứa data và pagination
  },

  async getAllByRFId(id) {
    const res = await api.get(`/requestformdetail/rfd/${id}`);
    return res.data.metadata;
  },

  async add(data) {
    const res = await api.post("/requestformdetail", data);
    return res.data;
  },

  async update(id, data) {
    const res = await api.put(`/requestformdetail/${id}`, data);
    return res.data;
  },

  async delete(id) {
    const res = await api.delete(`/requestformdetail/${id}`);
    return res.data;
  },
};

export default requestFormDetailApi;
