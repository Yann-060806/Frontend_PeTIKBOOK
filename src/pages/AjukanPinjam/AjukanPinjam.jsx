import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../utils/axiosInstance";

const AjukanPinjam = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ambil buku dari halaman sebelumnya
  const selectedBuku = location.state;

  // state
  const [user, setUser] = useState(null);
  const [buku, setBuku] = useState(selectedBuku || null);
  const [tanggalPinjam, setTanggalPinjam] = useState("");
  const [tanggalKembali, setTanggalKembali] = useState("");
  const [loading, setLoading] = useState(false);

  // ambil user login dari token
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const decoded = jwtDecode(token);

        const res = await axiosInstance.get(
          "api/user"
        );

        // cari user sesuai id token
        const currentUser = res.data.data.find(
          (item) => item.id === decoded.id
        );

        setUser(currentUser);
      } catch (error) {
        console.error("Error ambil user:", error);
      }
    };

    fetchUser();
  }, []);

  // submit pinjam
  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const payload = {
  user_id: user.id,
  buku_id: buku.id,
  tgl_pinjam: tanggalPinjam,
  tgl_kembali: tanggalKembali,
};

    console.log("DATA PINJAM:", payload);

    // ✅ KIRIM KE API
    await axiosInstance.post(
      "/api/transaksi",
      payload
    );

    alert("Peminjaman berhasil!");
    navigate("/statusPeminjaman");
  } catch (error) {
    console.error(error);
    alert("Gagal pinjam");
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
      <div className="pinjaman-header-tambah">
        <h3>Ajukan Peminjaman Buku</h3>
      </div>

      <div className="add-pinjaman-layout">
        {/* GAMBAR BUKU */}
        <div className="image-side">
          {buku && (
            <img src={buku.foto} alt={buku.judul_buku} />
          )}
        </div>

        {/* FORM */}
        <div className="form-side">
          <form onSubmit={handleSubmit} className="from-wrapper">
            {/* USER LOGIN */}
            <div className="from-grid">
              <label>Usernamee</label>
              <input
                type="text"
                value={user?.username || "guest"}
                readOnly
              />
            </div>

            {/* BUKU */}
            <div className="from-grid">
              <label>Judul Buku</label>
              <input
                type="text"
                value={buku?.judul_buku || ""}
                readOnly
              />
            </div>

            <div className="from-grid">
              <label>Deskripsi</label>
              <input
                type="text"
                value={buku?.deskripsi || ""}
                readOnly
              />
            </div>

            <div className="from-grid">
              <label>Stok</label>
              <input
                type="text"
                value={buku?.stok || ""}
                readOnly
              />
            </div>

            {/* TANGGAL PINJAM */}
            <div className="from-grid">
              <label>Tanggal Pinjam</label>
              <input
                type="date"
                value={tanggalPinjam}
                onChange={(e) =>
                  setTanggalPinjam(e.target.value)
                }
                required
              />
              <label>Tanggal Kembali</label>
              <input
                type="date"
                value={tanggalKembali}
                onChange={(e) =>
                  setTanggalKembali(e.target.value)
                }
                required
              />
            </div>

            {/* BUTTON */}
            <div className="btn-group">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn-delete"
              >
                Batal
              </button>

              <button
                type="submit"
                className="btn-tambah"
                disabled={loading}
              >
                {loading ? "Menyimpan..." : "Pinjam Buku"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AjukanPinjam;