import Modal from "../common/MyModal";
import MyInputField from "../common/MyInputField";
import MyComboBox from "../common/MyComboBox";

function RequestFormModal({
  open,
  mode,
  formData,
  formError,
  submitting,
  selectedRequestForm,
  companies = [], 
  onChange,
  onSubmit,
  onClose,
}) {

  const companyOptions = (companies || []).map((c) => ({
  value: c.Id,
  label: c.TenCongTy,
}));
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
            Bạn có chắc chắn muốn xóa phiếu{" "}
            <span className="font-semibold">{selectedRequestForm.SoPhieu}</span>{" "}
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
            label="Số phiếu: (*)"
            name="SoPhieu"
            value={formData.SoPhieu}
            onChange={onChange}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MyInputField
            label="Ngày nhận:"
            as="input"
            type="date"
            name="NgayNhan"
            value={formData.NgayNhan}
            onChange={onChange}
          />
           <MyInputField
            label="Ngày trả dự kiến:"
            as="input"
            type="date"
            name="NgayTraDuKien"
            value={formData.NgayTraDuKien}
            onChange={onChange}
          />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <MyComboBox
            label="Tên Khách hàng:"
            name="CongTyId"
            value={formData.CongTyId}
            options={companyOptions}
            onChange={onChange}
            />
         <MyComboBox
            label="CS Sử dụng:"
            name="CongTySuDungId"
            value={formData.CongTySuDungId}
            options={companyOptions}
            onChange={onChange}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
               <MyInputField
            label="Thực hiện tại VMI"
            name="ThucHienTai"
            type="checkbox"
            value={formData.ThucHienTai}
            onChange={onChange}
          />
              <MyInputField
            label="YC Giấy"
            name="YeuCauGiay"
            type="checkbox"
            value={formData.YeuCauGiay}
            onChange={onChange}
          />
             <MyInputField
            label="YC Hiệu chỉnh:"
            name="YeuCauHieuChinh"
            type="checkbox"
            value={formData.YeuCauHieuChinh}
            onChange={onChange}
          />
             <MyInputField
            label="Cơ sở:"
            name="CoSo"
            type="checkbox"
            value={formData.CoSo}
            onChange={onChange}
          />
          <MyInputField
            label="YC phương pháp:"
            name="YeuCauPhuongPhap"
            type="checkbox"
            value={formData.YeuCauPhuongPhap}
            onChange={onChange}
          />
          <MyInputField
            label="Hình thức giao nhận:"
            name="HinhThucGiaoNhan"
            type="checkbox"
            value={formData.HinhThucGiaoNhan}
            onChange={onChange}
          />
           <MyInputField
            label="Ngày trả TT:"
            name="NgayTraThucTe"
            value={formData.NgayTraThucTe}
            onChange={onChange}
          />
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

export default RequestFormModal;
