import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AjukanPinjam = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const buku = location.state; // dari card buku

  const [user, setUser] = useState(null);
  const [tanggalPinjam, setTanggalPinjam] = useState("");
  const [tanggalKembali, setTanggalKembali] = useState("");
  const [loading, setLoading] = useState(false);

  // ambil user dari token
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
    return <h3>Buku tidak ditemukan</h3>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Ajukan Peminjaman Buku</h2>

      <div>
        <h4>{buku.judul_buku}</h4>
        <img src={buku.foto} width="150" />
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label>User</label>
          <input value={user?.username || ""} disabled />
        </div>

        <div>
          <label>Tanggal Pinjam</label>
          <input
            type="date"
            onChange={(e) => setTanggalPinjam(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Tanggal Kembali</label>
          <input
            type="date"
            onChange={(e) => setTanggalKembali(e.target.value)}
            required
          />
        </div>

        <button disabled={loading}>
          {loading ? "Loading..." : "Pinjam Buku"}
        </button>
      </form>
    </div>
  );
};

export default AjukanPinjam;
