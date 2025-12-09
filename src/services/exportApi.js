import axios from "axios";

const API_BASE_URL = "/api/v1"; // Sử dụng đường dẫn tương đối để proxy hoạt động

const api = axios.create({
  baseURL: API_BASE_URL,
});

const exportApi = {
  async exportWord(id) {
    console.log("export API:", id);
    return api.get(`/export/rf/${id}`, {
      responseType: "blob",
    });
  },
};

export default exportApi;
