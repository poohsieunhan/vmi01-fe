export const deviceColumns = [
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
    id: "TenThietBi",
    header: "TÊN THIẾT BỊ",
    accessor: "TenThietBi",
  },
  {
    id: "MaThietBi",
    header: "Mã Thiết bị",
    accessor: "MaThietBi",
    tdClassName: "whitespace-normal break-words",
  },
];
