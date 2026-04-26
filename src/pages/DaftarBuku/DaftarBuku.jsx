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
import Footer from "../../components/Footer/Footer";

const DaftarBuku = () => {
  const navigate = useNavigate();

  const [kategori, setKategori] = useState([]);
  const [buku, setBuku] = useState([]);
  const [penulis, setPenulis] = useState([]);
  const [transaksi, setTransaksi] = useState([]);

  const [selectedKategori, setSelectedKategori] = useState(null);
  const [search, setSearch] = useState("");
  const [mostBorrowed, setMostBorrowed] = useState([]);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [resKategori, resBuku, resPenulis, resTransaksi] =
        await Promise.all([
          axios.get("/api/genre"),
          axios.get("/api/buku"),
          axios.get("/api/penulis"),
          axios.get("/api/transaksi"),
        ]);

      const bukuData = resBuku.data.data;
      const transaksiData = resTransaksi.data.data;

      setKategori(resKategori.data.data);
      setBuku(bukuData);
      setPenulis(resPenulis.data.data);
      setTransaksi(transaksiData);

      const countMap = {};

      transaksiData.forEach((t) => {
        countMap[t.buku_id] = (countMap[t.buku_id] || 0) + 1;
      });

      const sorted = bukuData
        .map((b) => ({
          ...b,
          totalPinjam: countMap[b.id] || 0,
        }))
        .sort((a, b) => b.totalPinjam - a.totalPinjam)
        .slice(0, 6);

      setMostBorrowed(sorted);
    } catch (error) {
      console.log(error.response);
    }
  };

  const namePenulis = (penulis_id) => {
    const foundPenulis = penulis.find((p) => p.id === penulis_id);
    return foundPenulis ? foundPenulis.nama_penulis : "-";
  };

  const filteredBuku = buku.filter((b) => {
    const matchKategori = selectedKategori
      ? b.genre_id === selectedKategori
      : true;

    const keyword = search.toLowerCase();
    const judul = b.judul_buku.toLowerCase();
    const penulisNama = namePenulis(b.penulis_id).toLowerCase();

    const matchSearch =
      judul.includes(keyword) || penulisNama.includes(keyword);

    return matchKategori && matchSearch;
  });

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
            <Input
              placeholder="Cari judul buku, pengarang..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputGroupText>
              <FiSearch />
            </InputGroupText>
          </InputGroup>
        </div>
      </Container>

      <Container>
        <Row>
          <Col md={12}>
            <Button
              className="me-2 rounded-pill mt-2"
              color="primary"
              outline={selectedKategori !== null}
              onClick={() => setSelectedKategori(null)}
            >
              Semua
            </Button>

            {kategori.map((c) => (
              <Button
                key={c.id}
                className="me-2 rounded-pill mt-2"
                color="primary"
                outline={selectedKategori !== c.id}
                onClick={() =>
                  setSelectedKategori(selectedKategori === c.id ? null : c.id)
                }
              >
                {c.nama_genre}
              </Button>
            ))}
          </Col>
        </Row>
      </Container>

      <Container className="mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold">Rekomendasi</h4>
        </div>

        <Row>
          {mostBorrowed.length > 0 ? (
            mostBorrowed.map((book) => (
              <Col key={book.id} xs="6" md="4" lg="2" className="mb-4">
                <Card className="book-card border-0 shadow-sm">
                  <CardImg top src={book.foto} alt={book.judul_buku} />
                  <CardBody className="p-2">
                    <h6 className="mb-0 text-truncate">{book.judul_buku}</h6>
                    <p className="text-muted x-small mb-1">
                      {namePenulis(book.penulis_id)}
                    </p>

                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-warning">★★★★</small>
                      <button
                        className="btn-pinjam"
                        style={{
                          borderRadius: "40px",
                          fontSize: "10px",
                        }}
                        onClick={() => navigate("/peminjaman", { state: book })}
                      >
                        pinjam
                      </button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center">Belum ada data peminjaman</p>
          )}
        </Row>
      </Container>

      <Container className="mt-4 mb-5">
        <h4 className="fw-bold mb-4">Daftar Buku</h4>

        <Row>
          {filteredBuku.map((book) => (
            <Col key={book.id} xs="6" md="4" lg="2" className="mb-4">
              <Card className="book-card border-0 shadow-sm">
                <CardImg top src={book.foto} alt={book.judul_buku} />
                <CardBody className="p-2">
                  <h6 className="mb-0 text-truncate">{book.judul_buku}</h6>
                  <p className="text-muted x-small mb-1">
                    {namePenulis(book.penulis_id)}
                  </p>

                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-warning">★★★★</small>
                    <button
                      className="btn-pinjam"
                      style={{
                        borderRadius: "40px",
                        fontSize: "10px",
                      }}
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
      <Footer />
    </div>
  );
};

export default DaftarBuku;
