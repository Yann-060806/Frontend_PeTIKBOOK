import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  Button,
  Input,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import "./DaftarBuku.css";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import MyNavbar from "../../components/MyNavbar/MyNavbar";
import iklan from "../../assets/iklann.png";
import { useNavigate } from "react-router-dom";

const DaftarBuku = () => {
  const navigate = useNavigate();
  const [kategori, setKategori] = useState([]);
  const [buku, setBuku] = useState([]);
  const [penulis, setPenulis] = useState([]);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [resKategori, resBuku, resPenulis] = await Promise.all([
        axios.get("/api/genre"),
        axios.get("/api/buku"),
        axios.get("/api/penulis"),
      ]);

      setKategori(resKategori.data.data);
      setBuku(resBuku.data.data);
      setPenulis(resPenulis.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const namePenulis = (penulis_id) => {
    const foundPenulis = penulis.find((p) => p.id === penulis_id);
    return foundPenulis ? foundPenulis.nama_penulis : "-";
  };

  return (
    <div className="daftar-buku-wrapper">
      <MyNavbar />

      <div className="banner-section">
        <div className="banner-content">
          <img src={iklan} alt="Banner" className="banner-img" />
          <p className="banner-text">
            Ciptakan <span className="text-warning fw-bold">Idemu</span> yang
            baru dengan membaca melalui Perpustakaan digital{" "}
            <span className="fw-bold">PeTIKBook</span>
          </p>
        </div>
      </div>
      <Container className="search-filter-section">
        <div className="search-box-container">
          <InputGroup className="search-input-group">
            <Input placeholder="Cari judul buku, pengarang..." />
            <InputGroupText>
              <FiSearch />
            </InputGroupText>
          </InputGroup>
        </div>

        <div className="filter-scroll mt-4"></div>
      </Container>

      <Container className="mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold">Rekomendasi</h4>
          <a href="/" className="text-primary text-decoration-none">
            Lihat Semua &gt;
          </a>
        </div>
        <Row>
          {buku.map((book) => (
            <Col key={book.id} xs="6" md="4" lg="2" className="mb-4">
              <Card className="book-card border-0 shadow-sm">
                <CardImg top src={book.foto} alt={book.judul} />
                <CardBody className="p-2">
                  <h6 className="mb-0 text-truncate">{book.judul_buku}</h6>
                  <p className="text-muted x-small mb-1">
                    {namePenulis(book.penulis_id)}
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-warning">★★★★</small>
                    <button
                      className="btn-pinjam"
                      style={{ borderRadius: "40px", fontSize: "10px" }}
                      onClick={() => navigate("/peminjaman", { state: book })}
                    >
                      pinjam
                    </button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="mt-4 mb-5">
        <h4 className="fw-bold mb-4">Daftar Buku</h4>
        <Row>
          {buku.map((book) => (
            <Col key={book.id} xs="6" md="4" lg="2" className="mb-4">
              <Card className="book-card border-0 shadow-sm">
                <CardImg top src={book.foto} alt={book.judul} />
                <CardBody className="p-2">
                  <h6 className="mb-0 text-truncate">{book.judul_buku}</h6>
                  <p className="text-muted x-small mb-1">
                    {namePenulis(book.penulis_id)}
                  </p>{" "}
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-warning">★★★★</small>
                    <button
                      className="btn-pinjam"
                      style={{ borderRadius: "40px", fontSize: "10px" }}
                      onClick={() => navigate("/peminjaman", { state: book })}
                    >
                      pinjam
                    </button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default DaftarBuku;
