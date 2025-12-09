import { Link, NavLink, Outlet } from "react-router-dom";

const sidebarStyle = {
  width: "220px",
  borderRight: "1px solid #ddd",
  padding: "16px",
  boxSizing: "border-box",
};

const layoutStyle = {
  display: "flex",
  height: "100vh",
    with:"100vw",
  overflowX: "hidden",
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
};

const contentStyle = {
  flex: 1,
  minWidth:0,
  padding: "16px",
  overflowY: "auto",
};

const activeLinkStyle = {
  fontWeight: "bold",
  color: "#1976d2",
};

function MainLayout() {
  return (
    <div style={layoutStyle}>
      {/* SIDEBAR */}
      <aside style={sidebarStyle}>
        <h2>Quản lý</h2>
        <nav style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <NavLink
            to="/requestform"
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
          >
            Phiếu yêu cầu
          </NavLink>
          <NavLink
            to="/company"
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
          >
            Công ty
          </NavLink>
          <NavLink
            to="/device"
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
          >
            Thiết bị
          </NavLink>
        </nav>

        <div style={{ marginTop: "24px", fontSize: "14px" }}>
          <Link to="/">Về trang chính</Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={contentStyle}>
        {/* Outlet là nơi render các page con: CompanyListPage, DeviceListPage */}
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
