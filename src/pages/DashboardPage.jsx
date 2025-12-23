// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from "react";
import { useInspectionStats } from "../hooks/dashboard/useInspecStats";
import InspectionCharts from "../components/dashboard/InspecStats.Charts";
import { toInputDate, getDate, getDayMinusDays } from "../utis/dateUltis";

export default function DashboardPage() {
  // Ví dụ chọn lọc ngày bằng input type="date"
  const [fromDate, setFromDate] = useState(""); // "2025-12-01"
  const [toDate, setToDate] = useState(""); // "2025-12-18"

  const { items, total, mostUsed, loading, error, refetch } =
    useInspectionStats({
      fromDate,
      toDate,
      autoFetch: true,
    });

  useEffect(() => {
    setToDate(toInputDate(getDate()));
    setFromDate(toInputDate(getDayMinusDays(30)));
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6">
      <div className="mx-auto max-w-6xl space-y-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-lg font-semibold text-slate-800">
                Dashboard
              </div>
              <div className="text-sm text-slate-500">
                Thống kê loại kiểm định
              </div>
            </div>

            <div className="flex flex-col gap-2 md:flex-row md:items-end">
              <div className="flex flex-col">
                <label className="text-xs text-slate-500">Từ ngày</label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs text-slate-500">Đến ngày</label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <button
                type="button"
                onClick={refetch}
                className="h-10 rounded-md bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
                disabled={loading}
              >
                Lọc
              </button>
            </div>
          </div>
        </div>

        <InspectionCharts
          items={items}
          total={total}
          mostUsed={mostUsed}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}
