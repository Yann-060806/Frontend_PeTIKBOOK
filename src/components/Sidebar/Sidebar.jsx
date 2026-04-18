import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import logo from "../../assets/monyet.png";
import { FaBook, FaUser, FaHome, FaChevronDown } from "react-icons/fa";
import { useState } from "react";

const Sidebar = () => {
  const [openMaster, setOpenMaster] = useState(false);

  return (
    <div className="Sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="logo" />
        <h3>PeTIK Book</h3>
      </div>

      <ul>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "active-link" : "")}
            end
          >
            <FaHome /> Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/pesanan"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <FaUser /> Peminjam
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
                <NavLink to="/dashboard/buku">Buku</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/penulis">Penulis</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/penerbit">Penerbit</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/genre">Genre</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/users">User</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/history">History</NavLink>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
