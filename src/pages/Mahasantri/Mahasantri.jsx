import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import Swal from "sweetalert2";
import "./Mahasantri.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";

const Mahasantri = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchMahasantri();
  }, []);

  const fetchMahasantri = async () => {
    try {
      const res = await axiosInstance.get("/mahasantri");
      setData(res.data.data || []);
    } catch (error) {
      console.log("ERROR GET MAHASANTRI:", error.response || error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/mahasantri/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Hapus Mahasantri?",
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosInstance.delete(`/mahasantri/hapus/${id}`);

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Data berhasil dihapus",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchMahasantri();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Tidak bisa menghapus data",
      });

      console.log(error.response || error);
    }
  };

  if (loading) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <div className="mahasantri-container">
      <div className="mahasantri-header">
        <h2 className="title">Data Mahasantri</h2>

        <NavLink to={"/dashboard/mahasantri/add"}>
          <FaPlusCircle /> Tambah Mahasantri
        </NavLink>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Jurusan</th>
              <th>Alamat</th>
              <th>No HP</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.nama_mahasantri}</td>
                  <td>{item.jurusan || "-"}</td>
                  <td>{item.alamat || "-"}</td>
                  <td>{item.no_hp || "-"}</td>

                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(item.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">Tidak ada data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Mahasantri;
