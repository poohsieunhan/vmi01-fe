import {formatDateDDMMYYYY}  from "../../utis/dateUltis";

export const requestFormDetailColumns = [
  // {
  //   id: "Id",
  //   header: "ID",
  //   accessor: "Id",
  //   thClassName: "whitespace-nowrap text-center",
  //   tdClassName: "whitespace-nowrap text-center",
  // },
  {
    id: "stt",
    header: "STT",
    thClassName: "w-12 text-center",
    tdClassName: "text-center",
    cell: (_row, _value, _rowIndex, displayIndex) => displayIndex,
  },
  //  {
  //   id: "RequestFormText",
  //   header: "SỐ PHIẾU",
  //   accessor: (row)=>row.RequestFormText?.SoPhieu || "",
  //   thClassName: "whitespace-nowrap",
  //   tdClassName: "whitespace-nowrap",
  // },
    {
    id: "ThietBiText",
    header: "THIẾT BỊ",
    accessor: (row)=>row.ThietBiText?.TenThietBi || "",
    thClassName: "whitespace-nowrap",
    tdClassName: "whitespace-nowrap",
  },
          {
    id: "ThietBiSerial",
    header: "Serial",
    accessor:"ThietBiSerial",
    thClassName: "whitespace-nowrap",
    tdClassName: "whitespace-nowrap",
  },
  {
    id: "TrangThaiThietBiText",
    header: "THIẾT BỊ",
    accessor: (row)=>row.TrangThaiThietBiText?.TenTrangThai || "",
    thClassName: "whitespace-nowrap",
    tdClassName: "whitespace-nowrap",
  },
  {
    id: "SoLuong",
    header: "SỐ LƯỢNG",
    accessor: "SoLuong",
    thClassName: "whitespace-nowrap",
    tdClassName: "whitespace-nowrap",
  },
  {
    id: "isHC",
    header: "HC",
    accessor: "isHC",
    tdClassName: "break-all",
      cell: (_row, value) => (
    value ? (
      <span className="inline-flex items-center justify-center text-green-600 text-xl">
        ✓
      </span>
    ) : (
      <span className="inline-flex items-center justify-center text-slate-600 text-xl">
        ✕
      </span>
    )
  ),
  },
  {
    id: "isKD",
    header: "KD",
    accessor: "isKD",
    thClassName: "whitespace-nowrap",
    tdClassName: "whitespace-nowrap",
    cell: (_row, value) => (
    value ? (
      <span className="inline-flex items-center justify-center text-green-600 text-xl">
        ✓
      </span>
    ) : (
      <span className="inline-flex items-center justify-center text-slate-600 text-xl">
        ✕
      </span>
    )
  ),
  },
  {
    id: "isDTN",
    header: "DTN",
    accessor: "isDTN",
    thClassName: "whitespace-nowrap",
    tdClassName: "whitespace-nowrap",
      cell: (_row, value) => (
    value ? (
      <span className="inline-flex items-center justify-center text-green-600 text-xl">
        ✓
      </span>
    ) : (
      <span className="inline-flex items-center justify-center text-slate-600 text-xl">
        ✕
      </span>
    )
  ),
  },
  {
    id: "isKhac",
    header: "KHÁC",
    accessor: "isKhac",
    thClassName: "whitespace-nowrap",
    tdClassName: "whitespace-nowrap",
      cell: (_row, value) => (
    value ? (
      <span className="inline-flex items-center justify-center text-green-600 text-xl">
        ✓
      </span>
    ) : (
      <span className="inline-flex items-center justify-center text-slate-600 text-xl">
        ✕
      </span>
    )
  ),
  },
    {
    id: "LabText",
    header: "LAB",
    accessor: (row)=>row.LabText?.TenPhongBan || "",
    thClassName: "whitespace-nowrap",
    tdClassName: "whitespace-nowrap",
  },
        {
    id: "GhiChu",
    header: "GHI CHÚ",
    accessor:"GhiChu",
    thClassName: "whitespace-nowrap",
    tdClassName: "whitespace-nowrap",
  },
];
