import { useEffect, useState, useMemo } from "react";
import requestFormDetailApi from "../../services/requestFormDetailApi";
import toast from "react-hot-toast";

export function useRequestFormDetail(initialPage = 1, initialLimit = 10) {
  const [requestFormDetail, setRequestFormDetail] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchText, setSearchText] = useState("");

  const fetchRequestFormDetails = async ({ page = 1, limit = 10 } = {}) => {
    try {
      setLoading(true);
      setError("");
      const res = await requestFormDetailApi.getAll({ page, limit });
      //console.log("fetchdevices res:", res); 
      //console.log("res.pagination:", res.pagination);
      setRequestFormDetail(res.data || []);
      setPagination(res.pagination || null);
    } catch (err) {
      console.error(err);
      setError("Không tải được danh sách chi tiết phiếu. Kiểm tra lại backend.");
      toast.error("Không tải được danh sách chi tiết phiếu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequestFormDetails({ page: initialPage, limit: initialLimit });
  }, [initialPage, initialLimit]);

  const handleChangePage = (page) => {
    //console.log("handleChangePage -> goto:", page);
    fetchRequestFormDetails({ page, limit: pagination?.limit || initialLimit });
  };

  const filteredRequestFormDetails = useMemo(() => {
    if (!searchText) return request;

    const keyword = searchText.toLowerCase();
    return request.filter((c) => {
      const sophieu = c.SoPhieu?.toLowerCase() || "";
      //const mst = c.MaThietBi?.toLowerCase() || "";
      return sophieu.includes(keyword);
    });
  }, [request, searchText]);

  return {
    requestFormDetail,
    filteredRequestFormDetails,
    pagination,
    loading,
    error,
    searchText,
    setSearchText,
    fetchRequestFormDetails,
    handleChangePage,
  };
}
