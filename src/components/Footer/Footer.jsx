import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./Footer.css";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-section">
      <Container>
        <Row className="gy-4">
          <Col md="6">
            <h4 className="footer-brand">
              PeTik<span className="text-primary">Book</span>
            </h4>
            <p className="footer-desc">
              Perpustakaan digital modern untuk generasi masa kini. Akses buku
              kapan saja dan di mana saja.
            </p>
          </Col>

          <Col md="3">
            <h6 className="footer-title">Menu</h6>
            <ul className="footer-list">
              <li>
                <NavLink to={"/home"}>Home</NavLink>
              </li>
              <li>
                <NavLink to={"/daftarbuku"}>Daftar Buku</NavLink>
              </li>
              <li>
                <NavLink to={"/statuspeminjaman"}>Pinjaman Saya</NavLink>
              </li>
            </ul>
          </Col>

          <Col md="3">
            <h6 className="footer-title">Kontak</h6>
            <p className="footer-contact">
              <FaLocationDot /> Depok, Indonesia
            </p>
            <p className="footer-contact">
              <MdEmail /> petikbook@email.com
            </p>
            <p className="footer-contact">
              <FaPhone /> +62 812-xxxx-xxxx
            </p>
          </Col>
        </Row>

        <hr className="footer-divider" />

        <div className="text-center footer-bottom">
          © {new Date().getFullYear()} PeTikBook. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
