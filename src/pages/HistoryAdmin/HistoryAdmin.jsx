import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { Badge } from "react-bootstrap";
// import "./HistoryAdmin.css";

const HistoryAdmin = () => {
  const [transaksi, setTransaksi] = useState([]);
  const [buku, setBuku] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransaksi = async () => {
    try {
      const res = await axiosInstance.get("/transaksi");
      setTransaksi(res.data.data);
    } catch (error) {
      console.log(error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  const getBuku = async () => {
    try {
      const result = await axiosInstance.get("/buku");
      setBuku(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const result = await axiosInstance.get("/user");
      setUser(result.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchTransaksi();
    getBuku();
    getUser();
  }, []);

  const bukuName = (buku_id) => {
    const book = buku.find((b) => b.id === buku_id);
    return book ? book.judul_buku : "-";
  };

  const userName = (user_id) => {
    const users = user.find((u) => u.id === user_id);
    return users ? users.username : "-";
  };

  const getBadge = (status) => {
    if (status === "dikembalikan")
      return <Badge bg="primary">Dikembalikan</Badge>;
    if (status === "ditolak") return <Badge bg="success">Disetujui</Badge>;
    return <Badge bg="dark">{status}</Badge>;
  };

  const historyData = transaksi.filter(
    (item) => item.status === "dikembalikan" || item.status === "disetujui",
  );

  if (loading) return <h3>Loading...</h3>;

  return (
    <div>
      <div className="penulis-header">
        <h3>History Peminjaman</h3>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Buku</th>
              <th>Peminjam</th>
              <th>Tanggal Pinjam</th>
              <th>Tanggal Kembali</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {historyData.length > 0 ? (
              historyData.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{bukuName(item.buku_id)}</td>
                  <td>{userName(item.user_id)}</td>
                  <td>{new Date(item.tgl_pinjam).toLocaleDateString()}</td>
                  <td>{new Date(item.tgl_kembali).toLocaleDateString()}</td>
                  <td>{getBadge(item.status)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>Tidak ada data history</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryAdmin;
