import {formatDateDDMMYYYY}  from "../../utis/dateUltis";

export const requestFormColumns = [
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
  {
    id: "SoPhieu",
    header: "SỐ PHIẾU",
    accessor: "SoPhieu",
  },
  {
    id: "NgayNhan",
    header: "NGÀY NHẬN",
    accessor: (row)=>formatDateDDMMYYYY(row.NgayNhan),
    thClassName: "whitespace-nowrap",
    tdClassName: "whitespace-nowrap",
  },
  {
    id: "NgayTraDuKien",
    header: "NGÀY TRẢ DỰ KIẾN",
    accessor: (row)=>formatDateDDMMYYYY(row.NgayTraDuKien),
    thClassName: "whitespace-nowrap",
    tdClassName: "whitespace-nowrap",
  },
  {
    id: "ThucHienTai",
    header: "THỰC HIỆN TẠI VMI",
    accessor: "ThucHienTai",
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
    id: "YeuCauGiay",
    header: "YC GIẤY",
    accessor: "YeuCauGiay",
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
    id: "YeuCauHieuChinh",
    header: "YC HIỆU CHỈNH",
    accessor: "YeuCauHieuChinh",
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
    id: "CoSo",
    header: "CƠ SỞ",
    accessor: "CoSo",
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
    id: "YeuCauPhuongPhap",
    header: "YC PHƯƠNG PHÁP",
    accessor: "YeuCauPhuongPhap",
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
    id: "HinhThucGiaoNhan",
    header: "GIAO NHẬN",
    accessor: "HinhThucGiaoNhan",
    thClassName: "whitespace-nowrap",
    tdClassName: "whitespace-nowrap",
    cell: (_row, value) => (
    value ? (
      <span className="inline-flex items-center justify-center text-green-600 text-sm">
        Trực tiếp
      </span>
    ) : (
      <span className="inline-flex items-center justify-center text-slate-600 text-sm">
        Gián tiếp
      </span>
    )
  ),
  },
    {
    id: "SoBG",
    header: "SỐ BG",
    accessor: "SoBG",
    thClassName: "whitespace-nowrap",
    tdClassName: "whitespace-nowrap",
  },
      {
    id: "NgayTraThucTe",
    header: "NGÀY TRẢ THỰC TẾ",
    accessor: (row)=>formatDateDDMMYYYY(row.NgayTraThucTe),
    //accessor: "NgayTraThucTe",
    thClassName: "whitespace-nowrap",
    tdClassName: "whitespace-nowrap",
  },
  {
    id: "CongTy",
    header: "KHÁCH HÀNG",
    accessor: (row)=>row.CongTy?.TenCongTy || "",
    //accessor: CongTyId",
    thClassName: "whitespace-nowrap",
    tdClassName: "whitespace-nowrap",
  },
        {
    id: "CongTySuDung",
    header: "CS SỬ DỤNG",
    accessor: (row)=>row.CongTySuDung?.TenCongTy || "",
    //accessor:"CongTySuDungId",
    thClassName: "whitespace-nowrap",
    tdClassName: "whitespace-nowrap",
  },
];
