import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import "./NavbarAdmin.css";

const NavbarAdmin = ({ search, setSearch }) => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [profil, setProfil] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const getUserLogin = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const decoded = jwtDecode(token);
      setUsername(decoded.username || "-");

      const res = await axiosInstance.get("/user");
      const users = res.data.data;

      const currentUser = users.find((u) => u.username === decoded.username);

      setProfil(currentUser.profil);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserLogin();
  }, []);

  return (
    <div className="NavbarAdmin">
      <ul>
        <li>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </li>

        <li className="navbar-right">
          <div className="user-info">
            <span>{username}</span>

            <img
              src={profil}
              alt="User"
              className="avatar"
              onClick={() => setOpen(!open)}
            />

            {open && (
              <div className="dropdown-menu-custom">
                <button className="dropdown-item logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default NavbarAdmin;
