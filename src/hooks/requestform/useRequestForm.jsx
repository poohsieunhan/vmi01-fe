import { useState } from "react";
import requestFormApi from "../../services/requestFormApi";
import toast from "react-hot-toast";
import { toInputDate } from "../../utis/dateUltis";

function initialForm() {
  return {
    SoPhieu: "",
    NgayNhan: "",
    NgayTraDuKien:"",
    CongTyId: "",
    CongTySuDungId: "",
    ThucHienTai:false,
    YeuCauGiay:false,
    YeuCauHieuChinh:false,
    CoSo:false,
    YeuCauPhuongPhap:false,
    HinhThucGiaoNhan:false,
    SoBG: "",
    NgayTraThucTe:"",
  };
}

export function useRequestForm({ fetchRequestForms }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create"); // 'create' | 'edit' | 'delete'
  const [selectedRequestForm, setSelectedRequestForm] = useState(null);
  const [formData, setFormData] = useState(initialForm());
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // open/close modal
  const openCreate = () => {
    setMode("create");
    setSelectedRequestForm(null);
    setFormData(initialForm());
    setFormError("");
    setOpen(true);
  };

  const openEdit = (requestForm) => {
    setMode("edit");
    setSelectedRequestForm(requestForm);
    setFormData({
      SoPhieu: requestForm.SoPhieu || "",
      NgayNhan: toInputDate(requestForm.NgayNhan) || "",
      CongTyId: requestForm.CongTy?.Id || "",
      CongTySuDungId: requestForm.CongTySuDung?.Id || "",
      NgayTraDuKien: toInputDate(requestForm.NgayTraDuKien) ||requestForm.NgayTraDuKien || "",
      ThucHienTai: !!requestForm.ThucHienTai || "",
      YeuCauGiay: !!requestForm.YeuCauGiay || "",
      YeuCauHieuChinh: !!requestForm.YeuCauHieuChinh || "",
      CoSo: !!requestForm.CoSo || "",
      YeuCauPhuongPhap: !!requestForm.YeuCauPhuongPhap || "",
      HinhThucGiaoNhan: !!requestForm.HinhThucGiaoNhan || "",
      SoBG: requestForm.SoBG || "",
      NgayTraThucTe: toInputDate(requestForm.NgayTraThucTe) || "",
    });
    setFormError("");
    setOpen(true);
  };

  const openDelete = (requestForm) => {
    setMode("delete");
    setSelectedRequestForm(requestForm);
    setFormError("");
    setOpen(true);
  };

  const closeModal = () => {
    if (submitting) return;
    setOpen(false);
    setSelectedRequestForm(null);
  };

const handleChange = (e) => {
  const { name, type, value, checked } = e.target;

  let newValue;

  if (type === "checkbox") {
    newValue = checked;
  } else if (type === "number") {
    newValue = value === "" ? "" : Number(value);
  } else {
    newValue = value;
  }

  setFormData((prev) => ({
    ...prev,
    [name]: newValue,
  }));
};


  const handleSubmit = async (e, pagination) => {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);

    try {
      if (
        (mode === "create" || mode === "edit") &&
        !formData.SoPhieu.trim()
      ) {
        setFormError("Số phiếu là bắt buộc.");
        setSubmitting(false);
        return;
      }

      const buildPayload = (data) => ({
  ...data,
  ThucHienTai: data.ThucHienTai ? 1 : 0,
  YeuCauGiay: data.YeuCauGiay ? 1 : 0,
  YeuCauHieuChinh: data.YeuCauHieuChinh ? 1 : 0,
  CoSo: data.CoSo ? 1 : 0,
  YeuCauPhuongPhap: data.YeuCauPhuongPhap ? 1 : 0,
});

      if (mode === "create") {
        try {
          await requestFormApi.add(buildPayload(formData));
          await fetchRequestForms({ page: 1, limit: 10 });
          setOpen(false);
          toast.success("Thêm mới phiếu thành công.");
        } catch (error) {
          const msg =
            error.response?.data?.message ||
            "Có lỗi xảy ra khi thêm mới phiếu.";
          setFormError(msg);
          toast.error(msg);
        }
      }

      if (mode === "edit" && selectedRequestForm) {
        try {
          await requestFormApi.update(selectedRequestForm.Id, buildPayload(formData));
          console.log(formData)
          await fetchRequestForms({
            page: pagination?.page || 1,
            limit: pagination?.limit || 10,
          });
          setOpen(false);
          toast.success("Cập nhật phiếu thành công.");
        } catch (error) {
          const msg =
            error.response?.data?.message ||
            "Có lỗi xảy ra khi cập nhật phiếu.";
          setFormError(msg);
          toast.error(msg);
        }
      }

      if (mode === "delete" && selectedRequestForm) {
        try {
          await requestFormApi.delete(selectedRequestForm.Id);
          await fetchRequestForms({
            page: 1,
            limit: pagination?.limit || 10,
          });
          setOpen(false);
          toast.success("Xóa phiếu thành công.");
        } catch (error) {
          const msg =
            error.response?.data?.message || "Có lỗi xảy ra khi xóa phiếu.";
          setFormError(msg);
          toast.error(msg);
        }
      }
    } catch (err) {
      console.error(err);
      setFormError("Có lỗi xảy ra khi lưu dữ liệu. Kiểm tra lại backend.");
      toast.error("Có lỗi xảy ra khi lưu dữ liệu.");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    // state
    open,
    mode,
    selectedRequestForm,
    formData,
    formError,
    submitting,
    // handlers
    openCreate,
    openEdit,
    openDelete,
    closeModal,
    handleChange,
    handleSubmit,
  };
}
