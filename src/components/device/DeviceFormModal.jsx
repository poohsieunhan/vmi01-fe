import Modal from "../common/MyModal";
import MyInputField from "../common/MyInputField";

function DeviceFormModal({
  open,
  mode,
  formData,
  formError,
  submitting,
  selectedDevice,
  onChange,
  onSubmit,
  onClose,
}) {
  const title =
    mode === "create"
      ? "Thêm thiết bị"
      : mode === "edit"
      ? "Chỉnh sửa thiết bị"
      : "Xóa thiết bị";

  return (
    <Modal open={open} title={title} onClose={onClose}>
      {mode === "delete" && selectedDevice ? (
        <form onSubmit={onSubmit} className="space-y-4">
          <p className="text-sm text-slate-700">
            Bạn có chắc chắn muốn xóa thiết bị{" "}
            <span className="font-semibold">{selectedDevice.TenThietBi}</span>{" "}
            (ID: {selectedDevice.Id})?
          </p>
          {formError && <p className="text-sm text-rose-600">{formError}</p>}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 text-sm rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 text-sm rounded-lg bg-rose-500 text-white hover:bg-rose-600 disabled:opacity-50"
            >
              {submitting ? "Đang xóa..." : "Xóa"}
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4 text-left">
          <MyInputField
            label="Tên thiết bị: (*)"
            name="TenThietBi"
            value={formData.TenThietBi}
            onChange={onChange}
          />
          <MyInputField
            label="Mã thiết bị:"
            name="MaThietBi"
            value={formData.MaThietBi}
            onChange={onChange}
          />
          
        
          {formError && <p className="text-sm text-rose-600">{formError}</p>}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 text-sm rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {submitting
                ? "Đang lưu..."
                : mode === "create"
                ? "Tạo mới"
                : "Lưu thay đổi"}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}

export default DeviceFormModal;
