import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL + "api/v1"; // Sử dụng đường dẫn tương đối để proxy hoạt động

const api = axios.create({
  baseURL: API_BASE_URL,
});

const dashboardApi = {
  async getInspecStats({ fromDate, toDate }) {
    const params = {};
    if (fromDate) params.fromDate = fromDate;
    if (toDate) params.toDate = toDate;
    const res = await api.post("/dashboard/inspec-stats", {
      params,
    });
    console.log(params);
    return res.data;
  },
};

export default dashboardApi;
