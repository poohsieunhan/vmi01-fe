import MyDataTable from "../components/common/MyDataTable";
import RequestFormDetailModal from "../components/requestformdetail/RequestFormDetailModal";
import MySearchInput from "../components/common/MySearchInput";
import { useRequestFormDetail } from "../hooks/requestformdetail/useRequestFormDetail";
import { useRequestFormDetailForm } from "../hooks/requestformdetail/useRequestFormDetailForm";
import { requestFormDetailColumns } from "../components/requestformdetail/requestFormDetailColumns";
import { useState, useEffect, use } from "react";
//import companyApi from "../services/companyApi";
import requestFormApi from "../services/requestFormApi";
import requestFormDetailApi from "../services/requestFormDetailApi";
import { useParams } from "react-router-dom";
import deviceApi from "../services/deviceApi";
import deviceStatusApi from "../services/devicestatusApi";
import labApi from "../services/labApi";
import MyComboBox from "../components/common/MyComboBox";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function RequestFormDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [requestForm, setRequestForm] = useState(null);
  const [details, setDetails] = useState([]);
  //const [selectdRF, setSelectdRF] = useState(Id);

  const initialDetailForm = {
    ThietBiId: null,
    TrangThaiThietBiId: 2,
    SoLuong: 1,
    isHC: false,
    isKD: false,
    isDTN: false,
    isKhac: false,
    LabId: 1,
    GhiChu: "",
    ThietBiSerial: "",
  };

  const [detailForm, setDetailForm] = useState(initialDetailForm);
  const [submittingDetail, setSubmittingDetail] = useState(false);
  const [devices, setDevices] = useState([]);
  const [deviceStatus, setDeviceStatus] = useState([]);
  const [lab, setLab] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const { data } = await deviceApi.getAll({ page: 1, limit: 1000 });
        setDevices(data || []);
      } catch (err) {
        console.error("Failed to fetch devices", err);
      }
    };

    fetchDevices();
  }, []);

  useEffect(() => {
    const fetchDeviceStatus = async () => {
      try {
        const { data } = await deviceStatusApi.getAll({ page: 1, limit: 1000 });
        setDeviceStatus(data || []);
      } catch (err) {
        console.error("Failed to fetch devices status", err);
      }
    };

    fetchDeviceStatus();
  }, []);

  useEffect(() => {
    const fetchLab = async () => {
      try {
        const { data } = await labApi.getAll({ page: 1, limit: 1000 });
        setLab(data || []);
      } catch (err) {
        console.error("Failed to fetch lab", err);
      }
    };

    fetchLab();
  }, []);

  const deviceOptions = devices.map((d) => ({
    value: d.Id,
    label: d.TenThietBi,
  }));

  const labOptions = lab.map((l) => ({
    value: l.Id,
    label: l.TenPhongBan,
  }));

  const deviceStatusOptions = deviceStatus.map((d) => ({
    value: d.Id,
    label: d.TenTrangThai,
  }));

  //console.log("Devices from API:", devices);
  //console.log("deviceOptions:", deviceOptions);

  //Đổi dữ liệu trong các ô
  const handleDetailChange = (e) => {
    const { name, value, type, checked } = e.target;

    setDetailForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // handle cho thiết bị
  const handleDeviceChange = (valOrEvent) => {
    const value =
      typeof valOrEvent === "object" && "target" in valOrEvent
        ? valOrEvent.target.value // event
        : valOrEvent; // value

    setDetailForm((prev) => ({
      ...prev,
      ThietBiId: value,
    }));
  };

  const handleDeviceStatusChange = (valOrEvent) => {
    const value =
      typeof valOrEvent === "object" && "target" in valOrEvent
        ? valOrEvent.target.value // event
        : valOrEvent; // value

    setDetailForm((prev) => ({
      ...prev,
      TrangThaiThietBiId: value,
    }));
  };

  const handleLabChange = (valOrEvent) => {
    const value =
      typeof valOrEvent === "object" && "target" in valOrEvent
        ? valOrEvent.target.value // event
        : valOrEvent; // value

    setDetailForm((prev) => ({
      ...prev,
      LabId: value,
    }));
  };

  const selectedDeviceOption =
    deviceOptions.find((o) => o.value === detailForm.ThietBiId) || null;

  const selectedLabOption =
    labOptions.find((o) => o.value === detailForm.LabId) || null;

  const selectedDeviceStatusOption =
    deviceStatusOptions.find(
      (o) => o.value === detailForm.TrangThaiThietBiId
    ) || null;

  // Thêm chi tiết phiếu
  const handleAddDetail = async (e) => {
    e.preventDefault();
    if (!id) return;

    try {
      setSubmittingDetail(true);
      const rfId = Number(id);

      const payload = {
        ...detailForm,
        RequestFormId: rfId,
      };
      const newDetail = await requestFormDetailApi.add(payload);

      const reloadRFD = await fetchRequestFormDetails(rfId);

      setDetails((prev) => [newDetail, ...prev]);
      //setDetails(reloadRFD);

      // Reset form để nhập thiết bị khác
      setDetailForm(initialDetailForm);
    } catch (err) {
      console.error("Failed to add request form detail", err);
      // có thể dùng toast ở đây
    } finally {
      setSubmittingDetail(false);
    }
  };

  const fetchRequestFormById = async (rfId) => {
    try {
      console.log("Fetching request form with ID:", rfId);
      const result = await requestFormApi.getById(rfId);
      console.log("Fetching data request form with ID", result);
      setRequestForm(result);
    } catch (err) {
      console.error("Failed to load request form", err);
    }
  };

  const fetchRequestFormDetails = async (rfId) => {
    try {
      //console.log("Fetching request form details with ID:", rfId);
      const result = await requestFormDetailApi.getAllByRFId(rfId);
      //console.log("Fetching data request form details with ID", result);
      setDetails(result);
    } catch (err) {
      console.error("Failed to load request form details", err);
    }
  };

  useEffect(() => {
    if (!id) return;
    const rfId = parseInt(id);
    // gọi API lấy header phiếu
    fetchRequestFormById(rfId);
    // gọi API lấy danh sách chi tiết
    fetchRequestFormDetails(rfId);
  }, [id]);

  const rfId = Number(id);

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
  } = useRequestFormDetailForm({
    fetchRequestFormDetails: () =>
      rfId ? fetchRequestFormDetails(rfId) : null,
  });

  return (
    <div className="p-6 space-y-6">
      {/* HEADER PHIẾU */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="font-semibold text-lg">
          Chi tiết phiếu: {requestForm?.SoPhieu}
        </h2>
      </div>

      {/* FORM NHẬP CHI TIẾT */}
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

        <div className="col-span-12 md:col-span-4 flex md:justify-end">
          <button
            type="submit"
            disabled={submittingDetail}
            className="w-full md:w-auto px-5 py-2 bg-indigo-600 text-white rounded-md text-sm
                 hover:bg-indigo-700 disabled:opacity-60"
          >
            {submittingDetail ? "Đang lưu..." : "Thêm vào danh sách"}
          </button>
        </div>
      </form>

      {/* GRID CHI TIẾT */}
      <div className="bg-white rounded shadow p-4">
        <MyDataTable
          columns={requestFormDetailColumns}
          data={details}
          renderActions={(detailForm) => (
            <>
              <button
                type="button"
                onClick={() => openEdit(detailForm)}
                className="px-3 py-1 text-xs font-medium rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                Sửa
              </button>
              <button
                type="button"
                onClick={() => openDelete(detailForm)}
                className="px-3 py-1 text-xs font-medium rounded bg-red-500 text-white hover:bg-red-600"
              >
                Xóa
              </button>
            </>
          )}
        />
      </div>
      <RequestFormDetailModal
        open={open}
        mode={mode}
        formData={formData}
        formError={formError}
        submitting={submitting}
        selectedRequestFormDetail={selectedRequestFormDetail}
        onClose={closeModal}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      {/* NÚT SAVE CUỐI CÙNG */}
      <div className="flex justify-end gap-2">
        <button
          onClick={() => navigate("/requestform")}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Quay lại danh sách phiếu
        </button>
      </div>
    </div>
  );
}

export default RequestFormDetailPage;
