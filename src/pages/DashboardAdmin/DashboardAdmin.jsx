import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./DashboardAdmin.css";

const DashboardAdmin = () => {
  const [stats, setStats] = useState({});
  const [transaksi, setTransaksi] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [buku, setBuku] = useState([]);
  const [user, setUser] = useState([]);

  const fetchData = async () => {
    try {
      const [bukuRes, userRes, trxRes] = await Promise.all([
        axiosInstance.get("/buku"),
        axiosInstance.get("/user"),
        axiosInstance.get("/transaksi"),
      ]);

      const buku = bukuRes.data.data;
      const user = userRes.data.data;
      const trx = trxRes.data.data;

      setBuku(buku);
      setUser(user);
      setTransaksi(trx);

      const dipinjam = trx.filter((t) => t.status === "dipinjam").length;

      setStats({
        buku: buku.length,
        user: user.length,
        transaksi: trx.length,
        dipinjam,
      });

      const grouped = {};

      trx.forEach((t) => {
        const tanggal = t.createdAt?.slice(0, 10);

        if (!grouped[tanggal]) {
          grouped[tanggal] = 0;
        }

        grouped[tanggal]++;
      });

      const chart = Object.keys(grouped).map((tgl) => ({
        tanggal: tgl,
        total: grouped[tgl],
      }));

      setChartData(chart);
    } catch (err) {
      console.log(err);
    }
  };

  const bukuName = (buku_id) => {
    const book = buku.find((b) => b.id == buku_id);
    return book ? book.judul_buku : "-";
  };

  const userName = (user_id) => {
    const u = user.find((u) => u.id == user_id);
    return u ? u.username : "-";
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard Admin</h1>

      <div className="dashboard-cards">
        <Card title="Total Buku" value={stats.buku} />
        <Card title="Total User" value={stats.user} />
        <Card title="Total Transaksi" value={stats.transaksi} />
        <Card title="Sedang Dipinjam" value={stats.dipinjam} />
      </div>

      <div className="chart-section">
        <h2 className="chart-title">Grafik Peminjaman</h2>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="tanggal" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke="#38bdf8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="table-section">
        <h2>Transaksi Terbaru</h2>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Buku</th>
              <th>Status</th>
              <th>Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {transaksi.slice(0, 5).map((t, i) => (
              <tr key={i}>
                <td>{userName(t.user_id)}</td>
                <td>{bukuName(t.buku_id)}</td>
                <td>
                  <StatusBadge status={t.status} />
                </td>
                <td>{t.createdAt?.slice(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="dashboard-card">
    <h4>{title}</h4>
    <h2>{value || 0}</h2>
  </div>
);

const StatusBadge = ({ status }) => {
  return <span className={`status ${status || "lainnya"}`}>{status}</span>;
};

export default DashboardAdmin;
