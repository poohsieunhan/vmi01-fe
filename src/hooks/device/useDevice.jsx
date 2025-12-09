import { useEffect, useState, useMemo } from "react";
import deviceApi from "../../services/deviceApi";
import toast from "react-hot-toast";

export function useDevices(initialPage = 1, initialLimit = 10) {
  const [devices, setDevices] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchText, setSearchText] = useState("");

  const fetchDevices = async ({ page = 1, limit = 10 } = {}) => {
    try {
      setLoading(true);
      setError("");
      const res = await deviceApi.getAll({ page, limit });
      //console.log("fetchdevices res:", res); 
      //console.log("res.pagination:", res.pagination);
      setDevices(res.data || []);
      setPagination(res.pagination || null);
    } catch (err) {
      console.error(err);
      setError("Không tải được danh sách thiết bị. Kiểm tra lại backend.");
      toast.error("Không tải được danh sách thiết bị.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices({ page: initialPage, limit: initialLimit });
  }, [initialPage, initialLimit]);

  const handleChangePage = (page) => {
    //console.log("handleChangePage -> goto:", page);
    fetchDevices({ page, limit: pagination?.limit || initialLimit });
  };

  const filteredDevices = useMemo(() => {
    if (!searchText) return devices;

    const keyword = searchText.toLowerCase();
    return devices.filter((c) => {
      const ten = c.TenThietBi?.toLowerCase() || "";
      const mst = c.MaThietBi?.toLowerCase() || "";
      return ten.includes(keyword) || mst.includes(keyword);
    });
  }, [devices, searchText]);

  return {
    devices,
    filteredDevices,
    pagination,
    loading,
    error,
    searchText,
    setSearchText,
    fetchDevices,
    handleChangePage,
  };
}
