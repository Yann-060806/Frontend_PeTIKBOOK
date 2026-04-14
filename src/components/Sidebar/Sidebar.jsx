import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import logo from "../../assets/monyet.png";

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="logo" />
        <h3>PeTIK Book</h3>
      </div>
      <ul>
        <li>
          <NavLink to={"/dashboard"} end>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to={"/dashboard/pesanan"}>Peminjam</NavLink>
        </li>
        <li>
          <NavLink to={"/dashboard/buku"}>Buku</NavLink>
        </li>
        <li>
          <NavLink to={"/dashboard/kategori"}>Kategori</NavLink>
        </li>
        <li>
          <NavLink to={"/dashboard/penulis"}>Penulis</NavLink>
        </li>
        <li>
          <NavLink to={"/dashboard/users"}>User</NavLink>
        </li>
        <li>
          <NavLink to={"/dashboard/history"}>History</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
