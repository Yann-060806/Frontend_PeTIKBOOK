import React, { useState, useEffect } from "react";
import { NavLink as RRNavLink, Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  NavbarToggler,
  Collapse,
} from "reactstrap";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../utils/axiosInstance";

import "./MyNavbar.css";
import logo from "../../assets/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";

const MyNavbar = () => {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userFoto, setUserFoto] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const decoded = jwtDecode(token);
      const userId = decoded.id;

      const res = await axiosInstance.get("/mahasantri");
      const data = res.data.data;

      const myData = data.find(
        (item) => Number(item.user_id) === Number(userId),
      );

      console.log("NAVBAR USER:", myData);

      if (myData?.user?.profil) {
        setUserFoto(myData.user.profil);
      }
    } catch (error) {
      console.log("ERROR NAVBAR:", error);
    }
  };

  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? "#adff2f" : "#ffffff",
    fontWeight: "500",
    textDecoration: "none",
    paddingBottom: "1px",
    transition: "0.3s ease",
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Container className="pt-4 d-flex justify-content-center">
      <div style={{ width: "100%", maxWidth: "900px" }}>
        <Navbar
          expand="md"
          className="navbar-pill px-4 py-2 shadow-sm d-flex align-items-center flex-wrap"
        >
          <NavbarBrand tag={Link} to="/home" className="text-white me-auto">
            <img
              src={logo}
              alt=""
              style={{ width: "25px", height: "25px", marginRight: "10px" }}
            />
            <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
              PeTIkBook
            </span>
          </NavbarBrand>

          <NavbarToggler onClick={() => setMenuOpen(!menuOpen)} />

          <Collapse isOpen={menuOpen} navbar>
            <Nav className="mx-auto d-flex flex-column flex-md-row" navbar>
              <NavItem>
                <NavLink tag={RRNavLink} to="/home" style={navLinkStyle}>
                  Home
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  tag={RRNavLink}
                  to="/statuspeminjaman"
                  style={navLinkStyle}
                >
                  Pinjaman Saya
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  tag={RRNavLink}
                  to="/history-peminjaman"
                  style={navLinkStyle}
                >
                  Riwayat Peminjaman
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink tag={RRNavLink} to="/daftarbuku" style={navLinkStyle}>
                  Daftar Buku
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>

          <div className="ms-auto d-flex align-items-center position-relative">
            <img
              src={userFoto}
              alt="User"
              className="rounded-circle avatar"
              onClick={() => setOpen(!open)}
            />

            {open && (
              <div className="dropdown-menu-custom">
                <button
                  className="dropdown-item text-center"
                  onClick={() => navigate("/profil-mahasantri")}
                >
                  Profile
                </button>

                <button
                  className="dropdown-item text-danger text-center logout"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </Navbar>
      </div>
    </Container>
  );
};

export default MyNavbar;
