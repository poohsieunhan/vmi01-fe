import MyDataTable from "../components/common/MyDataTable";
import RequestFormModal from "../components/requestform/RequestFormModal";
import MySearchInput from "../components/common/MySearchInput";
import { useRequest } from "../hooks/requestform/useRequest";
import { useRequestForm } from "../hooks/requestform/useRequestForm";
import { requestFormColumns } from "../components/requestform/requestFormColumns";
import { useState, useEffect } from "react";
import companyApi from "../services/companyApi";
import { useNavigate } from "react-router-dom";
import exportApi from "../services/exportApi";
import toast from "react-hot-toast";
import { ClipboardList, Pencil, Trash2, FileDown } from "lucide-react";
import { convertSoPhieu } from "../utis/stringUltis";
import { toInputDate, getDate, getDayMinusDays } from "../utis/dateUltis";

function RequestFormPage() {
  const {
    requestForms,
    filteredRequestForms,
    pagination,
    loading,
    error,
    searchText,
    setSearchText,
    fetchRequestForms,
    handleChangePage,
    fromDate,
    toDate,
    setFromDate,
    setToDate,
  } = useRequest(1, 10);

  const {
    open,
    mode,
    selectedRequestForm,
    formData,
    formError,
    submitting,
    openCreate,
    openEdit,
    openDelete,
    closeModal,
    handleChange,
    handleSubmit,
  } = useRequestForm({ fetchRequestForms });

  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setToDate(toInputDate(getDate()));
    setFromDate(toInputDate(getDayMinusDays(30)));
  }, []);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const result = await companyApi.getAll({ page: 1, limit: 1000 });
        setCompanies(result.data || []);
        console.log(result);
      } catch (err) {
        console.error("Failed to load companies", err);
      }
    };

    fetchCompanies();
  }, []);

  const onClear = () => {
    handleChange({
      target: {
        name: "CongTySuDungId",
        value: "",
      },
    });
  };

  const handleExportWord = async (requestForm) => {
    try {
      const _id = requestForm.Id;
      console.log("Id gửi lên BE:", _id, typeof _id);
      console.log("handle export:", requestForm);
      const res = await exportApi.exportWord(_id);

      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `Phieu-tiep-nhan-v1-${convertSoPhieu(
        requestForm.SoPhieu
      )}.docx`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Lỗi khi export Word:", err);
      toast.error("Không thể xuất file Word");

      if (err.response && err.response.data instanceof Blob) {
        err.response.data.text().then((text) => {
          console.log("Server error body:", text);
          toast.error(text);
        });
      } else if (err.response && err.response.data) {
        console.log("Server error data:", err.response.data);
        toast.error(
          err.response.data.message || "Không thể xuất file Word (400)"
        );
      } else {
        toast.error("Không thể xuất file Word");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6">
      <div className="w-full">
        <div className="bg-white shadow-sm p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">
                Danh sách Phiếu
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Quản lý thông tin Phiếu: tên, mã thiết bị…
              </p>
            </div>
            <div className="flex items-center gap-2">
              <MySearchInput
                value={searchText}
                onChange={setSearchText}
                onClear={() => setSearchText("")}
                //onSubmit={handleSearch}
                showDateRange
                fromDate={fromDate}
                toDate={toDate}
                onChangeFromDate={setFromDate}
                onChangeToDate={setToDate}
                placeholder="Tìm theo số phiếu, ngày nhận..."
              />
              <button
                onClick={openCreate}
                className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium shadow hover:bg-indigo-700 transition"
              >
                + Thêm Phiếu
              </button>
            </div>
          </div>

          {/* Body */}
          {loading && (
            <div className="py-10 text-center text-slate-500">
              Đang tải dữ liệu...
            </div>
          )}

          {!loading && error && (
            <div className="py-4 text-sm text-rose-600">{error}</div>
          )}

          {!loading && !error && (
            <MyDataTable
              columns={requestFormColumns}
              data={filteredRequestForms}
              pagination={pagination}
              onChangePage={handleChangePage}
              actionsHeader="THAO TÁC"
              renderActions={(requestForm) => (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/requestformdetail/${requestForm.Id}`)
                    }
                    title="Thêm chi tiết phiếu"
                    className="px-3 py-1 text-xs font-medium rounded bg-blue-500 text-white hover:bg-blue-600"
                  >
                    <ClipboardList size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => openEdit(requestForm)}
                    title="Sửa phiếu"
                    className="px-3 py-1 text-xs font-medium rounded bg-blue-500 text-white hover:bg-blue-600"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    type="button"
                    title="Xóa phiếu"
                    onClick={() => openDelete(requestForm)}
                    className="px-3 py-1 text-xs font-medium rounded bg-red-500 text-white hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleExportWord(requestForm)}
                    title="Xuất phiếu"
                    className="px-3 py-1 text-xs font-medium rounded bg-red-500 text-white hover:bg-red-600"
                  >
                    <FileDown size={16} />
                  </button>
                </>
              )}
            />
          )}
        </div>
      </div>

      {/* Modal form */}
      <RequestFormModal
        open={open}
        mode={mode}
        formData={formData}
        formError={formError}
        submitting={submitting}
        selectedRequestForm={selectedRequestForm}
        companies={companies}
        onChange={handleChange}
        onSubmit={(e) => handleSubmit(e, pagination)}
        onClose={closeModal}
        onClear={onClear}
      />
    </div>
  );
}

export default RequestFormPage;
