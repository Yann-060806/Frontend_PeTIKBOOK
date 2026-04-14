import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import MyNavbar from "../../components/MyNavbar/MyNavbar";
import "./DashboardLayout.css";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [search, setSearch] = useState("");

  return (
    <div>
      <div className="dashboard-layout">
        <Sidebar />
        <div className="dashboard-main">
          <main className="dashboard-content">
            <MyNavbar search={search} setSearch={setSearch} />
            <Outlet context={{ search }} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
