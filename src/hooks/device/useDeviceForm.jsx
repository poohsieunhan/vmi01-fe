// src/hooks/useCompanyForm.js
import { useState } from "react";
import deviceApi from "../../services/deviceApi";
import toast from "react-hot-toast";

function initialForm() {
  return {
    TenThietBi: "",
    MaThietBi: "",
  };
}

export function useDeviceForm({ fetchDevices }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create"); // 'create' | 'edit' | 'delete'
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [formData, setFormData] = useState(initialForm());
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // open/close modal
  const openCreate = () => {
    setMode("create");
    setSelectedDevice(null);
    setFormData(initialForm());
    setFormError("");
    setOpen(true);
  };

  const openEdit = (device) => {
    setMode("edit");
    setSelectedDevice(device);
    setFormData({
      TenThietBi: device.TenThietBi || "",
      MaThietBi: device.MaThietBi || "",
    });
    setFormError("");
    setOpen(true);
  };

  const openDelete = (device) => {
    setMode("delete");
    setSelectedDevice(device);
    setFormError("");
    setOpen(true);
  };

  const closeModal = () => {
    if (submitting) return;
    setOpen(false);
    setSelectedDevice(null);
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
        !formData.TenThietBi.trim()
      ) {
        setFormError("Tên thiết bị là bắt buộc.");
        setSubmitting(false);
        return;
      }

      if (mode === "create") {
        try {
          await deviceApi.add(formData);
          await fetchDevices({ page: 1, limit: 10 });
          setOpen(false);
          toast.success("Thêm mới thiết bị thành công.");
        } catch (error) {
          const msg =
            error.response?.data?.message ||
            "Có lỗi xảy ra khi thêm mới thiết bị.";
          setFormError(msg);
          toast.error(msg);
        }
      }

      if (mode === "edit" && selectedDevice) {
        try {
          await deviceApi.update(selectedDevice.Id, formData);
          console.log(formData)
          await fetchDevices({
            page: pagination?.page || 1,
            limit: pagination?.limit || 10,
          });
          setOpen(false);
          toast.success("Cập nhật thiết bị thành công.");
        } catch (error) {
          const msg =
            error.response?.data?.message ||
            "Có lỗi xảy ra khi cập nhật thiết bị.";
          setFormError(msg);
          toast.error(msg);
        }
      }

      if (mode === "delete" && selectedDevice) {
        try {
          await deviceApi.delete(selectedDevice.Id);
          await fetchDevices({
            page: 1,
            limit: pagination?.limit || 10,
          });
          setOpen(false);
          toast.success("Xóa thiết bị thành công.");
        } catch (error) {
          const msg =
            error.response?.data?.message || "Có lỗi xảy ra khi xóa thiết bị.";
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
    selectedDevice,
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
