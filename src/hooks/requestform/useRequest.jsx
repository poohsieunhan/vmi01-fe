import { useEffect, useState, useMemo } from "react";
import requestFormApi from "../../services/requestFormApi";
import toast from "react-hot-toast";

export function useRequest(initialPage = 1, initialLimit = 10) {
  const [request, setRequest] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchText, setSearchText] = useState("");

  const fetchRequestForms = async ({ page = 1, limit = 10 } = {}) => {
    try {
      setLoading(true);
      setError("");
      const res = await requestFormApi.getAll({ page, limit });
      //console.log("fetchdevices res:", res); 
      //console.log("res.pagination:", res.pagination);
      setRequest(res.data || []);
      setPagination(res.pagination || null);
    } catch (err) {
      console.error(err);
      setError("Không tải được danh sách phiếu. Kiểm tra lại backend.");
      toast.error("Không tải được danh sách phiếu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequestForms({ page: initialPage, limit: initialLimit });
  }, [initialPage, initialLimit]);

  const handleChangePage = (page) => {
    //console.log("handleChangePage -> goto:", page);
    fetchRequestForms({ page, limit: pagination?.limit || initialLimit });
  };

  const filteredRequestForms = useMemo(() => {
    if (!searchText) return request;

    const keyword = searchText.toLowerCase();
    return request.filter((c) => {
      const sophieu = c.SoPhieu?.toLowerCase() || "";
      //const mst = c.MaThietBi?.toLowerCase() || "";
      return sophieu.includes(keyword);
    });
  }, [request, searchText]);

  return {
    request,
    filteredRequestForms,
    pagination,
    loading,
    error,
    searchText,
    setSearchText,
    fetchRequestForms,
    handleChangePage,
  };
}
