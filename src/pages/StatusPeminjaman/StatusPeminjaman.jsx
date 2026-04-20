import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../utils/axiosInstance";
import MyNavbar from "../../components/MyNavbar/MyNavbar";
import Footer from "../../components/Footer/Footer";
import { Badge } from "react-bootstrap";

const StatusPeminjaman = () => {
  const [transaksi, setTransaksi] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 STATUS MAP (tanpa switch case)
  const statusMap = {
    pending: { bg: "warning", label: "pending" },
    dipinjam: { bg: "success", label: "dipinjam" },
    dikembalikan: { bg: "secondary", label: "dikembalikan" },
  };

  const getStatusBadge = (status) => {
    const data = statusMap[status];

    return <Badge bg={data?.bg || "dark"}>{data?.label || status}</Badge>;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const decoded = jwtDecode(token);

      // ambil semua transaksi
      const res = await axiosInstance.get("/transaksi");

      // filter hanya milik user login
      const userTransaksi = res.data.data.filter(
        (item) => item.user_id === decoded.id,
      );

      setTransaksi(userTransaksi);
    } catch (error) {
      console.log("ERROR:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h3 style={{ textAlign: "center" }}>Loading...</h3>;
  }

  return (
    <div>
      <MyNavbar />

      <div style={{ padding: "20px" }}>
        <h2>📚 Status Peminjaman</h2>

        {transaksi.length === 0 ? (
          <p>Belum ada buku yang dipinjam</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "15px",
              marginTop: "20px",
            }}
          >
            {transaksi.map((item) => (
              <div
                key={item.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "15px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                }}
              >
                <h4>Buku ID: {item.buku_id}</h4>

                <p>
                  <b>Tanggal Pinjam:</b>{" "}
                  {new Date(item.tgl_pinjam).toLocaleDateString()}
                </p>

                <p>
                  <b>Tanggal Kembali:</b>{" "}
                  {new Date(item.tgl_kembali).toLocaleDateString()}
                </p>

                <p>
                  <b>Status:</b> {getStatusBadge(item.status)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default StatusPeminjaman;
