import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div style={{ fontFamily: "system-ui, Arial", minHeight: "100vh" }}>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          borderBottom: "1px solid #e5e5e5",
        }}
      >
        <Link to="/cases" style={{ textDecoration: "none", color: "inherit" }}>
          <strong>Case Workbench</strong>
        </Link>
        <span style={{ color: "#666", fontSize: 14 }}>Frontend MVP</span>
      </header>

      <main style={{ padding: 16 }}>
        <Outlet />
      </main>
    </div>
  );
}