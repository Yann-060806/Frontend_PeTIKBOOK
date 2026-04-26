import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../utils/axiosInstance";
import MyNavbar from "../../components/MyNavbar/MyNavbar";
import Footer from "../../components/Footer/Footer";
import { Spinner } from "react-bootstrap";
import { RiHistoryLine } from "react-icons/ri";
import "./HistoryUser.css";

const HistoryUser = () => {
  const [transaksi, setTransaksi] = useState([]);
  const [bukuList, setBukuList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const decoded = jwtDecode(token);

      const [transaksiRes, bukuRes] = await Promise.all([
        axiosInstance.get("/transaksi"),
        axiosInstance.get("/buku"),
      ]);

      const historyTransaksi = transaksiRes.data.data.filter(
        (item) => item.user_id === decoded.id && item.status === "dikembalikan",
      );

      setTransaksi(historyTransaksi);
      setBukuList(bukuRes.data.data);
    } catch (error) {
      console.log("ERROR:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  const bukuMap = Object.fromEntries(bukuList.map((b) => [b.id, b]));

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" />
        <p>Loading data...</p>
      </div>
    );
  }

  return (
    <div>
      <MyNavbar />

      <div className="status-container" style={{ minHeight: "50vh" }}>
        <h2 className="status-title">
          <RiHistoryLine /> Riwayat Peminjaman
        </h2>

        {transaksi.length === 0 ? (
          <p className="empty-text">Belum ada riwayat peminjaman</p>
        ) : (
          <div className="card-grid mt-5">
            {transaksi.map((item) => {
              const buku = bukuMap[item.buku_id];

              return (
                <div key={item.id} className="card-buku">
                  <img src={buku?.foto} alt="cover" className="book-img" />
                  <div className="card-content">
                    <h4 className="book-title">{buku?.judul_buku}</h4>

                    <div className="meta-row">
                      <span className="meta-label">Tgl. Pinjam</span>
                      <span>
                        {new Date(item.tgl_pinjam).toLocaleDateString("id-ID")}
                      </span>
                    </div>

                    <div className="meta-row">
                      <span className="meta-label">Tgl. Kembali</span>
                      <span>
                        {new Date(item.tgl_kembali).toLocaleDateString("id-ID")}
                      </span>
                    </div>

                    <div className="status-badge">
                      <span className="custom-badge badge-dikembalikan">
                        Dikembalikan
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default HistoryUser;
