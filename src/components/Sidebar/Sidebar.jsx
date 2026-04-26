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
            <FaUser /> Denda
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
                <NavLink to="/dashboard/buku">
                  <FaBook /> Buku
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/penulis">
                  <FaPen /> Penulis
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/penerbit">
                  <FaBuilding /> Penerbit
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/genre">
                  <FaList /> Genre
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/users">
                  <FaUser /> User
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/history/admin">
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
