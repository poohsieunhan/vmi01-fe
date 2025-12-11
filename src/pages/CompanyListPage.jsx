// src/pages/CompanyListPage.jsx
import MyDataTable from "../components/common/MyDataTable";
import CompanyFormModal from "../components/company/CompanyFormModal";
import MySearchInput from "../components/common/MySearchInput";
import { useCompanies } from "../hooks/company/useCompany";
import { useCompanyForm } from "../hooks/company/userCompanyForm";
import { companyColumns } from "../components/company/companyColumns";
import exportTempApi from "../services/exporttempApi";
import toast from "react-hot-toast";
import { useState } from "react";
//import companyApi from "../services/companyApi";
import importCompanyApi from "../services/importCompanyApi";

function CompanyListPage() {
  const {
    companies,
    filteredCompanies,
    pagination,
    loading,
    error,
    searchText,
    setSearchText,
    fetchCompanies,
    handleChangePage,
  } = useCompanies(1, 10);

  const {
    open,
    mode,
    selectedCompany,
    formData,
    formError,
    submitting,
    openCreate,
    openEdit,
    openDelete,
    closeModal,
    handleChange,
    handleSubmit,
  } = useCompanyForm({ fetchCompanies });
  const [file, setFile] = useState(null);
  const handleImport = async () => {
    if (!file) return toast.error("Chọn file Excel trước");

    const formData = new FormData();
    formData.append("file", file);
    console.log("formData:", formData);
    try {
      const res = await importCompanyApi.importExcel(formData);
      toast.success("Import thành công");

      console.log("Result:", res.data);
    } catch (err) {
      toast.error("Import thất bại");
      console.log("handle import:", err);
    }
  };
  const handleDownloadTemplate = async () => {
    try {
      const res = await exportTempApi.downloadTemplate();
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "company_template.xlsx");
      document.body.appendChild(link);
      link.click();
      toast.success("Đã tải template Excel");
    } catch (err) {
      toast.error("Không thể tải template");
      console.log("handle template download:", err);
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
                Danh sách Công ty
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Quản lý thông tin công ty: tên, địa chỉ, mã số thuế, liên hệ…
              </p>
            </div>
            <div className="flex items-center gap-2">
              <MySearchInput
                value={searchText}
                onChange={setSearchText}
                onClear={() => setSearchText("")}
                placeholder="Tìm theo tên công ty, mã số thuế..."
              />
              <button
                onClick={openCreate}
                className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium shadow hover:bg-indigo-700 transition"
              >
                + Thêm công ty
              </button>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={(e) => setFile(e.target.files[0])}
                />

                <button
                  onClick={handleImport}
                  className="px-3 py-1 bg-green-600 text-white rounded"
                >
                  Import Excel
                </button>
              </div>
              <button
                onClick={handleDownloadTemplate}
                className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium shadow hover:bg-indigo-700 transition"
              >
                Download Temp
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
              columns={companyColumns}
              data={filteredCompanies}
              pagination={pagination}
              onChangePage={handleChangePage}
              actionsHeader="THAO TÁC"
              renderActions={(company) => (
                <>
                  <button
                    type="button"
                    onClick={() => openEdit(company)}
                    className="px-3 py-1 text-xs font-medium rounded bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Sửa
                  </button>
                  <button
                    type="button"
                    onClick={() => openDelete(company)}
                    className="px-3 py-1 text-xs font-medium rounded bg-red-500 text-white hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </>
              )}
            />
          )}
        </div>
      </div>

      {/* Modal form */}
      <CompanyFormModal
        open={open}
        mode={mode}
        formData={formData}
        formError={formError}
        submitting={submitting}
        selectedCompany={selectedCompany}
        onChange={handleChange}
        onSubmit={(e) => handleSubmit(e, pagination)}
        onClose={closeModal}
      />
    </div>
  );
}

export default CompanyListPage;
