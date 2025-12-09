import MyDataTable from "../components/common/MyDataTable";
import DeviceFormModal from "../components/device/DeviceFormModal"
import MySearchInput from "../components/common/MySearchInput";
import { useDevices } from "../hooks/device/useDevice"
import { useDeviceForm } from "../hooks/device/useDeviceForm"
import { deviceColumns } from "../components/device/deviceColumns";

function DeviceListPage() {
  const {
    devices,
    filteredDevices,
    pagination,
    loading,
    error,
    searchText,
    setSearchText,
    fetchDevices,
    handleChangePage,
  } = useDevices(1, 10);

  const {
    open,
    mode,
    selectedDevice,
    formData,
    formError,
    submitting,
    openCreate,
    openEdit,
    openDelete,
    closeModal,
    handleChange,
    handleSubmit,
  } = useDeviceForm({ fetchDevices });

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6">
      <div className="w-full">
        <div className="bg-white shadow-sm p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">
                Danh sách Thiết bị
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Quản lý thông tin thiết bị: tên, mã thiết bị…
              </p>
            </div>
            <div className="flex items-center gap-2">
              <MySearchInput
                value={searchText}
                onChange={setSearchText}
                onClear={() => setSearchText("")}
                placeholder="Tìm theo tên thiết bị, mã thiết bị..."
              />
              <button
                onClick={openCreate}
                className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium shadow hover:bg-indigo-700 transition"
              >
                + Thêm thiết bị
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
              columns={deviceColumns}
              data={filteredDevices}
              pagination={pagination}
              onChangePage={handleChangePage}
              actionsHeader="THAO TÁC"
              renderActions={(device) => (
                <>
                  <button
                    type="button"
                    onClick={() => openEdit(device)}
                    className="px-3 py-1 text-xs font-medium rounded bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Sửa
                  </button>
                  <button
                    type="button"
                    onClick={() => openDelete(device)}
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
      <DeviceFormModal
        open={open}
        mode={mode}
        formData={formData}
        formError={formError}
        submitting={submitting}
        selectedDevice={selectedDevice}
        onChange={handleChange}
        onSubmit={(e) => handleSubmit(e, pagination)}
        onClose={closeModal}
      />
    </div>
  );
}

export default DeviceListPage;
