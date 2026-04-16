import { useEffect, useState } from "react";
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
    navigate("/");
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
                <button className="dropdown-item">Profile</button>
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
