// src/components/dashboard/InspectionCharts.jsx
import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Loader2 } from "lucide-react";

// Không set màu cố định theo yêu cầu trước của bạn? Ở đây chart cần màu.
// Tôi dùng palette nhẹ; nếu bạn muốn “theo theme Tailwind” tôi sẽ map theo CSS variables.
const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

function Card({ title, children, right }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div className="text-sm font-semibold text-slate-700">{title}</div>
        {right}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function StatLine({ label, value, sub }) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-lg border border-slate-100 bg-slate-50 px-4 py-3">
      <div>
        <div className="text-xs text-slate-500">{label}</div>
        {sub ? (
          <div className="mt-0.5 text-xs text-slate-400">{sub}</div>
        ) : null}
      </div>
      <div className="text-lg font-semibold tabular-nums text-slate-800">
        {value}
      </div>
    </div>
  );
}

export default function InspectionCharts({
  title = "Thống kê loại kiểm định",
  items = [],
  total = 0,
  mostUsed,
  loading = false,
  error = "",
}) {
  // Chỉ lấy item có value > 0 để pie chart sạch hơn
  const pieData = (items || []).filter((x) => x.value > 0);

  return (
    <div className="space-y-4">
      <Card
        title={title}
        right={
          loading ? (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              Đang tải
            </div>
          ) : null
        }
      >
        {error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-3">
          <StatLine label="Tổng lượt kiểm định" value={total} />
          <StatLine
            label="Loại dùng nhiều nhất"
            value={mostUsed?.name || "-"}
            sub={mostUsed ? `Số lượt: ${mostUsed.value}` : ""}
          />
          <StatLine label="Số loại có phát sinh" value={pieData.length} />
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* BAR */}
        <Card title="Bar chart">
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart fill="#3b82f6" data={items}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* PIE */}
        <Card title="Pie chart">
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData.length ? pieData : items}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={105}
                  innerRadius={60}
                  paddingAngle={2}
                >
                  {(pieData.length ? pieData : items).map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
