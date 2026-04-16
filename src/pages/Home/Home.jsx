import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardImg,
  CardBody,
} from "reactstrap";

import MyNavbar from "../../components/MyNavbar/MyNavbar";
import Footer from "../../components/Footer/Footer";
import heroImg from "../../assets/figure-hero-image.webp";
import "./Home.css";
import axios from "axios";

const Home = () => {
  const [buku, setBuku] = useState([]);
  const [penulis, setPenulis] = useState([]);

  useEffect(() => {
    getBuku();
    getPenulis();
  }, []);

  const getBuku = async () => {
    try {
      const response = await axios.get("/api/buku");
      setBuku(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPenulis = async () => {
    try {
      const response = await axios.get("/api/penulis");
      setPenulis(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const namePenulis = (penulis_id) => {
    const foundPenulis = penulis.find((p) => p.id === penulis_id);
    return foundPenulis ? foundPenulis.nama_penulis : "-";
  };

  return (
    <div className="home-wrapper">
      <MyNavbar />
      <section className="hero-section text-dark">
        <Container>
          <Row style={{ marginTop: "50px" }} className="align-items-center ">
            <Col md="6">
              <h1 className="fw-bold display-5">
                Perpustakaan <span className="text-success">Modern</span> <br />
                untuk <span style={{ color: "#4E8CEA" }}>Generasi Digital</span>
              </h1>
              <p className="text-muted">
                PeTikBook by Student PeTiK adalah layanan perpustakaan
                digital...
              </p>
              <Button color="primary" className="rounded-pill px-4">
                Lihat Buku
              </Button>
            </Col>
            <Col md="6" className="text-center">
              <img
                style={{ width: "400px" }}
                src={heroImg}
                alt="Mockup"
                className="img-fluid"
              />
            </Col>
          </Row>
        </Container>
      </section>

      <br />
      <br />

      <section
        style={{
          borderRadius: "150px",
          background: "rgba(128, 128, 128, 0.479)",
        }}
        className="books-section py-5"
      >
        <Container>
          <div className="text-center mb-5">
            <small className="text-uppercase text-muted">
              <b>Some Quality Items</b>{" "}
            </small>
            <h2 className="fw-bold">
              <span className="text-success">New</span> Release
              <span className="text-primary"> Books</span>
            </h2>
          </div>
          <Row className="g-4">
            {buku
              .slice()
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 4)
              .map((item) => (
                <Col md="3" key={item.id}>
                  <div className="book-card">
                    <div className="book-img-wrapper">
                      <img src={item.foto} />

                      <div className="overlay">
                        <button className="detail-btn">DETAIL BUKU</button>
                      </div>
                    </div>

                    <div className="book-info">
                      <h6>{item.judul_buku}</h6>
                      <span>{namePenulis(item.penulis_id)}</span>
                      <button className="pinjam-btn">Pinjam</button>
                    </div>
                  </div>
                </Col>
              ))}
          </Row>
        </Container>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
