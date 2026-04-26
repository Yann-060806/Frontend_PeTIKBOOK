import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./AjukanPinjam.css";
import MyNavbar from "../../components/MyNavbar/MyNavbar";
import Footer from "../../components/Footer/Footer";

const AjukanPinjam = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const buku = location.state;

  const [user, setUser] = useState(null);
  const [tanggalPinjam, setTanggalPinjam] = useState("");
  const [tanggalKembali, setTanggalKembali] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = jwtDecode(token);

    setUser({
      id: decoded.id,
      username: decoded.username,
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !buku) {
      alert("Data belum lengkap");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        user_id: user.id,
        buku_id: buku.id,
        tgl_pinjam: tanggalPinjam,
        tgl_kembali: tanggalKembali,
      };

      await axiosInstance.post("/transaksi/create", payload);

      alert("Peminjaman berhasil!");
      navigate("/statusPeminjaman");
    } catch (err) {
      console.log(err.response?.data || err);
      alert("Gagal pinjam");
    } finally {
      setLoading(false);
    }
  };

  if (!buku) {
    return <h3 style={{ textAlign: "center" }}>Buku tidak ditemukan</h3>;
  }

  return (
    <div>
      <MyNavbar />
      <div className="pinjam-container">
        <h2 className="pinjam-title">Ajukan Peminjaman Buku</h2>

        <div className="pinjam-layout">
          <div className="book-preview">
            <h3>Detail Buku</h3>

            <div className="book-box">
              <img src={buku.foto} alt="cover" />

              <div className="book-info">
                <h4>{buku.judul_buku}</h4>
                <p>Buku yang akan kamu pinjam</p>
              </div>
            </div>
          </div>

          <form className="pinjam-form" onSubmit={handleSubmit}>
            <h3>Form Peminjaman</h3>

            <div className="form-group user-box">
              <label>User</label>
              <input value={user?.username || ""} disabled />
            </div>

            <div className="form-group">
              <label>Tanggal Pinjam</label>
              <input
                type="date"
                onChange={(e) => setTanggalPinjam(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Tanggal Kembali</label>
              <input
                type="date"
                onChange={(e) => setTanggalKembali(e.target.value)}
                required
              />
            </div>

            <button className="pinjam-btn" disabled={loading}>
              {loading ? "Loading..." : "Pinjam Buku"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AjukanPinjam;
