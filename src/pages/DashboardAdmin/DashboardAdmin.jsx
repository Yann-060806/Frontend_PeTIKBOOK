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

      const last7Days = {};
      const today = new Date();

      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        const key = d.toISOString().slice(0, 10);
        last7Days[key] = 0;
      }

      trx.forEach((t) => {
        const tgl = t.createdAt?.slice(0, 10);
        if (last7Days.hasOwnProperty(tgl)) {
          last7Days[tgl]++;
        }
      });

      const chart = Object.keys(last7Days).map((tgl) => {
        const dateObj = new Date(tgl);

        return {
          tanggal: dateObj.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          total: last7Days[tgl],
        };
      });

      setChartData(chart);
    } catch (err) {
      console.log(err);
    }
  };

  const bukuName = (id) => {
    const b = buku.find((x) => x.id == id);
    return b ? b.judul_buku : "-";
  };

  const userName = (id) => {
    const u = user.find((x) => x.id == id);
    return u ? u.username : "-";
  };

  useEffect(() => {
    fetchData();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p>{label}</p>
          <p>Total: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

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
        <h2 className="chart-title">Grafik Peminjaman </h2>

        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tanggal" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="total" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="table-section">
        <h2>Transaksi Terbaru</h2>

        <table className="dashboard-table">
          <thead>
            <tr>
              <th>No</th>
              <th>User</th>
              <th>Buku</th>
              <th>Status</th>
              <th>Tanggal</th>
            </tr>
          </thead>

          <tbody>
            {transaksi
              .slice()
              .sort(
                (a, b) =>
                  new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
              )
              .slice(0, 5)
              .map((t, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{userName(t.user_id)}</td>
                  <td>{bukuName(t.buku_id)}</td>
                  <td>
                    <StatusBadge status={t.status} />
                  </td>
                  <td>
                    {new Date(t.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
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
  const statusMap = {
    pending: "pending",
    dipinjam: "dipinjam",
    dikembalikan: "dikembalikan",
  };

  return (
    <span className={`status ${statusMap[status] || "lainnya"}`}>{status}</span>
  );
};

export default DashboardAdmin;
