import Modal from "../common/MyModal";
import MyInputField from "../common/MyInputField";
import MyComboBox from "../common/MyComboBox";

function RequestFormDetailModal({
  open,
  mode,
  formData,
  formError,
  submitting,
  selectedRequestFormDetail,
  onChange,
  onSubmit,
  onClose,
}) {
  //   const companyOptions = (companies || []).map((c) => ({
  //   value: c.Id,
  //   label: c.TenCongTy,
  // }));
  const title =
    mode === "create"
      ? "Thêm phiếu"
      : mode === "edit"
      ? "Chỉnh sửa phiếu"
      : "Xóa phiếu";

  return (
    <Modal open={open} title={title} onClose={onClose}>
      {mode === "delete" && selectedRequestForm ? (
        <form onSubmit={onSubmit} className="space-y-4">
          <p className="text-sm text-slate-700">
            Bạn có chắc chắn muốn xóa dòng này{" "}
            <span className="font-semibold">{selectedRequestForm.SoPhieu}</span>{" "}
            (ID: {selectedRequestFormDetail.Id})?
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
        <form
          onSubmit={handleAddDetail}
          className="grid grid-cols-12 gap-4 items-end bg-white rounded-lg p-4 border border-slate-200"
        >
          {/* Row 1: Thiết bị / Serial / Tình trạng / SL */}
          <div className="col-span-12 md:col-span-5">
            <MyComboBox
              label="Thiết bị"
              name="ThietBiId"
              value={detailForm.ThietBiId}
              options={deviceOptions}
              onChange={handleDeviceChange}
            />
          </div>

          <div className="col-span-12 md:col-span-3">
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Serial
            </label>
            <input
              type="text"
              name="ThietBiSerial"
              value={detailForm.ThietBiSerial}
              onChange={handleDetailChange}
              className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div className="col-span-12 md:col-span-3">
            <MyComboBox
              label="Tình trạng"
              name="TrangThaiThietBiId"
              value={detailForm.TrangThaiThietBiId}
              options={deviceStatusOptions}
              onChange={handleDeviceStatusChange}
            />
          </div>

          <div className="col-span-12 md:col-span-1">
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              SL
            </label>
            <input
              type="number"
              min={1}
              name="SoLuong"
              value={detailForm.SoLuong}
              onChange={handleDetailChange}
              className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm text-right"
            />
          </div>

          {/* Row 2: Lab / Ghi chú */}
          <div className="col-span-12 md:col-span-3">
            <MyComboBox
              label="Lab"
              name="LabId"
              value={detailForm.LabId}
              options={labOptions}
              onChange={handleLabChange}
            />
          </div>

          <div className="col-span-12 md:col-span-9">
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Ghi chú
            </label>
            <input
              type="text"
              name="GhiChu"
              value={detailForm.GhiChu}
              onChange={handleDetailChange}
              className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm"
            />
          </div>

          {/* Row 3: Checkbox / Button */}
          <div className="col-span-12 md:col-span-8 flex flex-wrap items-center gap-6 pt-1">
            <label className="inline-flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                name="isHC"
                checked={detailForm.isHC}
                onChange={handleDetailChange}
                className="h-4 w-4"
              />
              HC
            </label>

            <label className="inline-flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                name="isKD"
                checked={detailForm.isKD}
                onChange={handleDetailChange}
                className="h-4 w-4"
              />
              KD
            </label>

            <label className="inline-flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                name="isDTN"
                checked={detailForm.isDTN}
                onChange={handleDetailChange}
                className="h-4 w-4"
              />
              DTN
            </label>

            <label className="inline-flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                name="isKhac"
                checked={detailForm.isKhac}
                onChange={handleDetailChange}
                className="h-4 w-4"
              />
              Khác
            </label>
          </div>

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

export default RequestFormDetailModal;
