import { useState, useEffect } from "react";
import profil from "../../assets/monyet.png";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./NavbarAdmin.css";

const NavbarAdmin = ({ search, setSearch }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getUserLogin = () => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      setUsername(decoded.username);
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
          <div
            className="avatar-wrapper"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((prev) => !prev);
            }}
          >
            <img src={profil} alt="profile" className="avatar" />

            {open && (
              <div className="dropdown-menu">
                <div className="dropdown-item">{username}</div>
                <div className="dropdown-item">Profile</div>
                <div
                  className="dropdown-item logout-item"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default NavbarAdmin;
