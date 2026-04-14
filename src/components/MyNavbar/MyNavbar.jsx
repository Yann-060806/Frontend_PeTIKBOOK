import React, { useState } from "react";
import { NavLink as RRNavLink, Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Badge,
} from "reactstrap";
import "./MyNavbar.css";
import monyet from "../../assets/monyet.png";
import "bootstrap/dist/css/bootstrap.min.css";

const MyNavbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

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
          className="navbar-pill px-4 py-2 shadow-sm d-flex align-items-center"
        >
          <NavbarBrand tag={Link} to="/home" className="text-white me-auto">
            <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
              PeTikBook.com
            </span>
          </NavbarBrand>

          <Nav className="mx-auto d-flex flex-row" navbar>
            <NavItem>
              <NavLink
                tag={RRNavLink}
                to="/home"
                style={navLinkStyle}
                className="px-3"
              >
                Home
              </NavLink>
            </NavItem>

            <NavItem className="position-relative">
              <NavLink
                tag={RRNavLink}
                to="/statuspeminjaman"
                style={navLinkStyle}
                className="px-3 d-flex align-items-center"
              >
                Status Peminjaman
                <Badge
                  color="danger"
                  pill
                  style={{
                    fontSize: "0.6rem",
                    marginLeft: "5px",
                    padding: "2px 5px",
                  }}
                >
                  15+
                </Badge>
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                tag={RRNavLink}
                to="/daftarbuku"
                style={navLinkStyle}
                className="px-3"
              >
                Daftar Buku
              </NavLink>
            </NavItem>
          </Nav>

          <div className="ms-auto d-flex align-items-center position-relative">
            <img
              src={monyet}
              alt="User"
              className="rounded-circle avatar"
              onClick={() => setOpen(!open)}
            />

            {open && (
              <div className="dropdown-menu-custom">
                <button className="dropdown-item text-center">Profile</button>
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
