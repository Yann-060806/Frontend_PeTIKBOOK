import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import logo from "../../assets/logo.png";
import {
  FaBook,
  FaPen,
  FaBuilding,
  FaUser,
  FaChevronDown,
  FaList,
  FaHistory,
  FaMoneyBillWave,
} from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import { useState } from "react";

const Sidebar = () => {
  const [openMaster, setOpenMaster] = useState(false);

  return (
    <div className="Sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="logo" />
        <h3>PeTIK Book</h3>
      </div>
      <hr />

      <ul>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "active-link" : "")}
            end
          >
            <IoStatsChartSharp /> Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/approve"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <FaUser /> Peminjam
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/denda"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <FaMoneyBillWave /> Denda
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/riwayat-denda"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <FaHistory /> Riwayat Denda
          </NavLink>
        </li>

        <li>
          <div
            className="menu-parent"
            onClick={() => setOpenMaster(!openMaster)}
          >
            <span>Master Data</span>
            <FaChevronDown className={`arrow ${openMaster ? "rotate" : ""}`} />
          </div>

          {openMaster && (
            <ul className="submenu">
              <li>
                <NavLink
                  to="/dashboard/buku"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  <FaBook /> Buku
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/penulis"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  <FaPen /> Penulis
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/penerbit"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  <FaBuilding /> Penerbit
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/genre"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  <FaList /> Genre
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/users"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  <FaUser /> User
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/mahasantri"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  <FaUser /> Mahasantri
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/history/admin"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  <FaHistory /> History
                </NavLink>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
