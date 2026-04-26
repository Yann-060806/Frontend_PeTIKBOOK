import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import MyNavbar from "../../components/MyNavbar/MyNavbar";
import Footer from "../../components/Footer/Footer";
import "./DetailBuku.css";
import { FaArrowLeft, FaBook, FaBuilding, FaPen } from "react-icons/fa6";

const DetailBuku = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [buku, setBuku] = useState(null);
  const [penulis, setPenulis] = useState([]);
  const [penerbit, setPenerbit] = useState([]);

  useEffect(() => {
    fetchDetail();
  }, []);

  const fetchDetail = async () => {
    try {
      const [resBuku, resPenulis, resPenerbit] = await Promise.all([
        axios.get(`/api/buku/cari/${id}`),
        axios.get(`/api/penulis`),
        axios.get(`/api/penerbit`),
      ]);

      setBuku(resBuku.data.data);
      setPenulis(resPenulis.data.data);
      setPenerbit(resPenerbit.data.data);
    } catch (error) {
      console.log("ERROR:", error.response || error);
    }
  };

  const namePenulis = (penulis_id) => {
    const found = penulis.find((p) => p.id === penulis_id);
    return found ? found.nama_penulis : "-";
  };

  const namePenerbit = (penerbit_id) => {
    const found = penerbit.find((p) => p.id === penerbit_id);
    return found ? found.nama_penerbit : "-";
  };

  if (!buku) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  return (
    <div className="detail-page">
      <MyNavbar />

      <div className="detail-container">
        <div className="detail-card">
          <div className="detail-left">
            <img src={buku.foto} alt="cover" className="detail-img" />
          </div>

          <div className="detail-right">
            <h2 className="detail-title">{buku.judul_buku}</h2>

            <div className="meta">
              <span>
                <FaPen /> {namePenulis(buku.penulis_id)}
              </span>
              <span>
                <FaBuilding /> {namePenerbit(buku.penerbit_id)}
              </span>
            </div>

            <p className="deskripsi">
              {buku.deskripsi || "Tidak ada deskripsi buku."}
            </p>

            <div className="action">
              <button
                className="btn-pinjam"
                onClick={() => navigate("/peminjaman", { state: buku })}
              >
                <FaBook /> Pinjam Buku
              </button>

              <button className="btn-back" onClick={() => navigate(-1)}>
                <FaArrowLeft /> Kembali
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DetailBuku;
