import { useState } from "react";
import requestFormDetailApi from "../../services/requestFormDetailApi";
import toast from "react-hot-toast";
import { toInputDate } from "../../utis/dateUltis";

function initialForm() {
  return {
    RequestFormId: "",
    ThietBiId: "",
    ThietBiSerial: "",
    SoLuong: "",
    TrangThaiThietBiId: "",
    isHC: false,
    isKD: false,
    isDTN: false,
    isKhac: false,
    LabId: "",
    GhiChu: "",
  };
}

export function useRequestFormDetailForm({ fetchRequestFormDetails }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create"); // 'create' | 'edit' | 'delete'
  const [selectedRequestFormDetail, setSelectedRequestFormDetail] =
    useState(null);
  const [formData, setFormData] = useState(initialForm());
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  //const [requestFormDetail, setRequestFormDetail] = useState([]);
  //const [pagination, setPagination] = useState(null);

  // open/close modal
  const openCreate = () => {
    setMode("create");
    setSelectedRequestFormDetail(null);
    setFormData(initialForm());
    setFormError("");
    setOpen(true);
  };

  const openEdit = (rfd) => {
    setMode("edit");
    setSelectedRequestFormDetail(rfd);
    setFormData({
      RequestFormId: rfd.RequestFormId ?? "",
      ThietBiId: rfd.ThietBiId ?? "",
      ThietBiSerial: rfd.ThietBiSerial ?? "",
      SoLuong: rfd.SoLuong ?? 1,
      TrangThaiThietBiId: rfd.TrangThaiThietBiId ?? "",
      isHC: !!rfd.isHC,
      isKD: !!rfd.isKD,
      isDTN: !!rfd.isDTN,
      isKhac: !!rfd.isKhac,
      LabId: rfd.LabId ?? "",
      GhiChu: rfd.GhiChu ?? "",
    });
    setFormError("");
    setOpen(true);
  };

  const openDelete = (rfd) => {
    setMode("delete");
    setSelectedRequestFormDetail(rfd);
    setFormError("");
    setOpen(true);
  };

  const closeModal = () => {
    if (submitting) return;
    setOpen(false);
    setSelectedRequestFormDetail(null);
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

  // const fetchRequestFormDetails = async (rfId) => {
  //   try {
  //     //setLoading(true);
  //     //setError("");
  //     const res = await requestFormDetailApi.getAllByRFId(rfId);
  //     //console.log("fetchdevices res:", res);
  //     //console.log("res.pagination:", res.pagination);
  //     setRequestFormDetail(res.data || []);
  //     setPagination(res.pagination || null);
  //   } catch (err) {
  //     console.error(err);
  //     // setError(
  //     //   "Không tải được danh sách chi tiết phiếu. Kiểm tra lại backend."
  //     // );
  //     toast.error("Không tải được danh sách chi tiết phiếu.");
  //   } finally {
  //     //setLoading(false);
  //   }
  // };

  const handleSubmit = async (e, pagination) => {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);

    try {
      if (mode === "create" || mode === "edit") {
        //setFormError("Số phiếu là bắt buộc.");
        //setSubmitting(false);
        //return;
      }

      const buildPayload = (data) => ({
        ...data,
        isHC: data.isHC ? 1 : 0,
        isKD: data.isKD ? 1 : 0,
        isDTN: data.isDTN ? 1 : 0,
        isKhac: data.isKhac ? 1 : 0,
      });

      if (mode === "create") {
        try {
          await requestFormDetailApi.add(buildPayload(formData));
          await fetchRequestFormDetails(formData.RequestFormId);
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

      if (mode === "edit" && selectedRequestFormDetail) {
        try {
          await requestFormDetailApi.update(
            selectedRequestFormDetail.Id,
            buildPayload(formData)
          );
          console.log("edit rfd:", formData);
          await fetchRequestFormDetails?.();
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

      if (mode === "delete" && selectedRequestFormDetail) {
        try {
          await requestFormDetailApi.delete(selectedRequestFormDetail.Id);
          await fetchRequestFormDetails?.();
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
    selectedRequestFormDetail,
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
