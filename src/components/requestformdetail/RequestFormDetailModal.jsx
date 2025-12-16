import Modal from "../common/MyModal";
import MyInputField from "../common/MyInputField";
import MyComboBox from "../common/MyComboBox";
import deviceApi from "../../services/deviceApi";
import deviceStatusApi from "../../services/devicestatusApi";
import labApi from "../../services/labApi";
import { useState, useEffect } from "react";

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

  const [devices, setDevices] = useState([]);
  const [deviceStatus, setDeviceStatus] = useState([]);
  const [lab, setLab] = useState([]);

  useEffect(() => {
    if (!open) return;

    (async () => {
      try {
        const page = 1;
        const limit = 1000;
        const [dRes, sRes, lRes] = await Promise.all([
          deviceApi.getAll({ page, limit }),
          deviceStatusApi.getAll({ page, limit }),
          labApi.getAll({ page, limit }),
        ]);

        setDevices(Array.isArray(dRes?.data) ? dRes.data : []);
        setDeviceStatus(Array.isArray(sRes?.data) ? sRes.data : []);
        setLab(Array.isArray(lRes?.data) ? lRes.data : []);
      } catch (err) {
        console.error("Failed to fetch options", err);
      }
    })();
  }, [open]);

  const deviceOptions = devices.map((d) => ({
    value: String(d.Id),
    label: d.TenThietBi,
  }));

  const labOptions = lab.map((l) => ({
    value: String(l.Id),
    label: l.TenPhongBan,
  }));

  const deviceStatusOptions = deviceStatus.map((ds) => ({
    value: String(ds.Id),
    label: ds.TenTrangThai,
  }));

  return (
    <Modal open={open} title={title} onClose={onClose}>
      {mode === "delete" && selectedRequestFormDetail ? (
        <form onSubmit={onSubmit} className="space-y-4">
          <p className="text-sm text-slate-700">
            Bạn có chắc chắn muốn xóa dòng này{" "}
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
          onSubmit={onSubmit}
          className="bg-white rounded-lg p-4 border border-slate-200"
        >
          {/* FIELDS GRID */}
          <div className="grid grid-cols-12 gap-x-4 gap-y-3 items-start">
            {/* Thiết bị */}
            <div className="col-span-12 md:col-span-8">
              <MyComboBox
                label="Thiết bị"
                name="ThietBiId"
                value={formData.ThietBiId ? String(formData.ThietBiId) : ""}
                options={deviceOptions}
                onChange={onChange}
              />
            </div>

            {/* Serial */}
            <div className="col-span-12 md:col-span-4">
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Serial
              </label>
              <input
                type="text"
                name="ThietBiSerial"
                value={formData.ThietBiSerial || ""}
                onChange={onChange}
                className="w-full h-10 border border-slate-300 rounded-md px-3 text-sm"
              />
            </div>

            {/* Tình trạng */}
            <div className="col-span-12 md:col-span-5">
              <MyComboBox
                label="Tình trạng"
                name="TrangThaiThietBiId"
                value={
                  formData.TrangThaiThietBiId
                    ? String(formData.TrangThaiThietBiId)
                    : ""
                }
                options={deviceStatusOptions}
                onChange={onChange}
              />
            </div>

            {/* SL */}
            <div className="col-span-12 md:col-span-3">
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                SL
              </label>
              <input
                type="number"
                min={1}
                name="SoLuong"
                value={formData.SoLuong ?? ""}
                onChange={onChange}
                className="w-full h-10 border border-slate-300 rounded-md px-3 text-sm text-right"
              />
            </div>

            {/* Lab */}
            <div className="col-span-12 md:col-span-3">
              <MyComboBox
                label="Lab"
                name="LabId"
                value={formData.LabId ? String(formData.LabId) : ""}
                options={labOptions}
                onChange={onChange}
              />
            </div>

            {/* Ghi chú */}
            <div className="col-span-12 md:col-span-9">
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Ghi chú
              </label>
              <input
                type="text"
                name="GhiChu"
                value={formData.GhiChu || ""}
                onChange={onChange}
                className="w-full h-10 border border-slate-300 rounded-md px-3 text-sm"
              />
            </div>
          </div>

          {/* CHECKBOX ROW */}
          <div className="mt-4 flex flex-wrap items-center gap-6">
            <label className="inline-flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                name="isHC"
                checked={!!formData.isHC}
                onChange={onChange}
                className="h-4 w-4"
              />
              HC
            </label>

            <label className="inline-flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                name="isKD"
                checked={!!formData.isKD}
                onChange={onChange}
                className="h-4 w-4"
              />
              KD
            </label>

            <label className="inline-flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                name="isDTN"
                checked={!!formData.isDTN}
                onChange={onChange}
                className="h-4 w-4"
              />
              DTN
            </label>

            <label className="inline-flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                name="isKhac"
                checked={!!formData.isKhac}
                onChange={onChange}
                className="h-4 w-4"
              />
              Khác
            </label>
          </div>

          {/* ERROR */}
          {formError && (
            <p className="mt-3 text-sm text-rose-600">{formError}</p>
          )}

          {/* BUTTONS */}
          <div className="mt-4 flex justify-end gap-2">
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
