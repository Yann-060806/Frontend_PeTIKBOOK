import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { Badge } from "react-bootstrap";
import Swal from "sweetalert2";
import "./ApprovePeminjaman.css";

const ApprovePeminjaman = () => {
  const [transaksi, setTransaksi] = useState([]);
  const [buku, setBuku] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransaksi = async () => {
    try {
      const res = await axiosInstance.get("/transaksi");

      const filtered = res.data.data.filter(
        (item) => item.status !== "dikembalikan" && item.status !== "ditolak",
      );

      setTransaksi(filtered);
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
    switch (status) {
      case "pending":
        return <Badge bg="warning">Pending</Badge>;
      case "dipinjam":
        return <Badge bg="success">Dipinjam</Badge>;
      case "dikembalikan":
        return <Badge bg="primary">Dikembalikan</Badge>;
      default:
        return <Badge bg="dark">{status}</Badge>;
    }
  };

  const handleApprove = async (id) => {
    const confirm = await Swal.fire({
      title: "Setujui Peminjaman?",
      text: "Status akan menjadi dipinjam",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, setujui!",
      cancelButtonText: "Batal",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosInstance.patch(`/transaksi/update/${id}`, {
        status: "dipinjam",
      });

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Status menjadi dipinjam",
        timer: 1500,
        showConfirmButton: false,
      });

      await fetchTransaksi();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Terjadi kesalahan",
      });
    }
  };

  const handleSelesai = async (id) => {
    const confirm = await Swal.fire({
      title: "Selesaikan Peminjaman?",
      text: "Status akan menjadi dikembalikan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, selesai!",
      cancelButtonText: "Batal",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosInstance.patch(`/transaksi/update/${id}`, {
        status: "dikembalikan",
      });

      Swal.fire({
        icon: "success",
        title: "Selesai!",
        text: "Buku telah dikembalikan",
        timer: 1500,
        showConfirmButton: false,
      });

      await fetchTransaksi();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Terjadi kesalahan",
      });
    }
  };

  if (loading) return <h3>Loading...</h3>;

  return (
    <div>
      <div className="approve-header">
        <h3>Approval Peminjaman</h3>
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
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {transaksi.length > 0 ? (
              transaksi.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{bukuName(item.buku_id)}</td>
                  <td>{userName(item.user_id)}</td>
                  <td>{new Date(item.tgl_pinjam).toLocaleDateString()}</td>
                  <td>{new Date(item.tgl_kembali).toLocaleDateString()}</td>
                  <td>{getBadge(item.status)}</td>

                  <td>
                    <button
                      className="btn-edit"
                      disabled={item.status !== "pending"}
                      onClick={() => handleApprove(item.id)}
                    >
                      Setujui
                    </button>

                    <button
                      className="btn-delete"
                      disabled={item.status !== "dipinjam"}
                      onClick={() => handleSelesai(item.id)}
                    >
                      Selesai
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>Tidak ada data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovePeminjaman;
