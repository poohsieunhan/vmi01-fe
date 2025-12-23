// src/hooks/dashboard/useInspectionStats.js
import { useCallback, useEffect, useMemo, useState } from "react";
import dashboardApi from "../../services/dashboardApi";

// Chuẩn hóa date cho query string
function toIsoOrNull(d) {
  if (!d) return null;

  // Nếu là "YYYY-MM-DD" thì ép về UTC đầu ngày cho ổn định
  if (typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d)) {
    return new Date(`${d}T00:00:00.000Z`).toISOString();
  }

  const dt = d instanceof Date ? d : new Date(d);
  if (Number.isNaN(dt.getTime())) return null;
  return dt.toISOString();
}

function normalizeStats(payload) {
  // Chấp nhận nhiều dạng BE trả về:
  // - { HC, KD, DTN, Khac }
  // - [{ HC, KD, DTN, Khac }] (do findAll)
  const root = payload?.metadata ?? payload; // ưu tiên metadata nếu có
  const obj = Array.isArray(root) ? root[0] : root; // nếu là mảng thì lấy phần tử 0

  return {
    HC: Number(obj?.HC ?? 0),
    KD: Number(obj?.KD ?? 0),
    DTN: Number(obj?.DTN ?? 0),
    Khac: Number(obj?.Khac ?? 0),
  };
}

function buildChartData(stats) {
  const items = [
    { key: "HC", name: "Hiệu chuẩn", value: stats.HC },
    { key: "KD", name: "Kiểm định", value: stats.KD },
    { key: "DTN", name: "Đo thử nghiệm", value: stats.DTN },
    { key: "Khac", name: "Khác", value: stats.Khac },
  ];
  const total = items.reduce((s, x) => s + x.value, 0);
  const mostUsed = items.reduce(
    (max, cur) => (cur.value > max.value ? cur : max),
    items[0]
  );

  return { items, total, mostUsed };
}

export function useInspectionStats({
  fromDate,
  toDate,
  autoFetch = true,
} = {}) {
  const [stats, setStats] = useState({ HC: 0, KD: 0, DTN: 0, Khac: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const query = useMemo(() => {
    return {
      fromDate: toIsoOrNull(fromDate),
      toDate: toIsoOrNull(toDate),
    };
  }, [fromDate, toDate]);

  const fetchInspectionStats = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      //console.log("Fetching inspection stats with query:", query);
      const data = await dashboardApi.getInspecStats(query);
      const normalized = normalizeStats(data);
      setStats(normalized);
      return normalized;
    } catch (e) {
      const msg =
        e?.response?.data?.message ||
        e?.message ||
        "Không lấy được thống kê loại kiểm định.";
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    if (!autoFetch) return;
    fetchInspectionStats();
  }, [autoFetch, fetchInspectionStats]);

  const computed = useMemo(() => buildChartData(stats), [stats]);

  return {
    stats,
    ...computed, // items, total, mostUsed
    loading,
    error,
    refetch: fetchInspectionStats,
  };
}
