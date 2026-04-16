import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import NavbarAdmin from "../../components/NavbarAdmin/NavbarAdmin";
import "./DashboardLayout.css";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <NavbarAdmin search={search} setSearch={setSearch} />

        <main className="dashboard-content">
          <Outlet context={{ search }} />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
