import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-section">
      <Container>
        <Row className="gy-4">
          <Col md="4">
            <h4 className="footer-brand">
              PeTik<span className="text-primary">Book</span>
            </h4>
            <p className="footer-desc">
              Perpustakaan digital modern untuk generasi masa kini. Akses buku
              kapan saja dan di mana saja.
            </p>
          </Col>

          <Col md="2">
            <h6 className="footer-title">Menu</h6>
            <ul className="footer-list">
              <li>Home</li>
              <li>Daftar Buku</li>
              <li>Kategori</li>
              <li>Peminjaman</li>
            </ul>
          </Col>

          <Col md="3">
            <h6 className="footer-title">Kategori</h6>
            <ul className="footer-list">
              <li>Teknologi</li>
              <li>Bisnis</li>
              <li>Fiksi</li>
              <li>Pengembangan Diri</li>
            </ul>
          </Col>

          <Col md="3">
            <h6 className="footer-title">Kontak</h6>
            <p className="footer-contact">📍 Jakarta, Indonesia</p>
            <p className="footer-contact">📧 petikbook@email.com</p>
            <p className="footer-contact">📞 +62 812-xxxx-xxxx</p>
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
