import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Footer from "../../components/Footer/Footer";
import MyNavbar from "../../components/MyNavbar/MyNavbar";
import axiosInstance from "../../utils/axiosInstance";

const StatusPeminjaman = () => {
  const [user, setUser] = useState(null);
  const [transaksi, setTransaksi] = useState([]);
  const [bukuList, setBukuList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const decoded = jwtDecode(token);

        // user
        const userRes = await axiosInstance.get("/api/user");
        const currentUser = userRes.data.data.find(
          (u) => u.id === decoded.id
        );
        setUser(currentUser);

        // buku
        const bukuRes = await axiosInstance.get("/api/buku");
        setBukuList(bukuRes.data.data);

        // ✅ transaksi (pengganti peminjaman)
        const trxRes = await axiosInstance.get("/api/transaksi");

        const userTransaksi = trxRes.data.data.filter(
          (item) => item.user_id === decoded.id
        );

        setTransaksi(userTransaksi);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <MyNavbar />
      <h2>Status Peminjaman</h2>

      {transaksi.length === 0 ? (
        <p>Belum ada buku yang dipinjam</p>
      ) : (
        <div className="grid">
          {transaksi.map((item) => {
            const buku = bukuList.find(
              (b) => b.id === item.buku_id
            );

            return (
              <div key={item.id} className="card">
                <img
                  src={buku?.foto}
                  alt={buku?.judul_buku}
                  width="120"
                />

                <h4>{buku?.judul_buku}</h4>
                <p>{buku?.deskripsi}</p>

                <p>
                  <b>Tanggal Pinjam:</b>{" "}
                  {new Date(item.tgl_pinjam).toLocaleDateString()}
                </p>

                <p>
                  <b>Tanggal Kembali:</b>{" "}
                  {new Date(item.tgl_kembali).toLocaleDateString()}
                </p>

                <p>
                  <b>Status:</b> {item.status}
                </p>
              </div>
            );
          })}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default StatusPeminjaman;