import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate, useOutletContext } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstance";
import Swal from "sweetalert2";
import "./Buku.css";

const Buku = () => {
  const [buku, setBuku] = useState([]);
  const [penulis, setPenulis] = useState([]);
  const [penerbit, setPenerbit] = useState([]);
  const [genre, setGenre] = useState([]);
  const [transaksi, setTransaksi] = useState([]); // 🔥 penting
  const [currentpage, setCurrentPage] = useState(1);
  const { search } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    getBuku();
    getPenulis();
    getPenerbit();
    getGenre();
    getTransaksi();
  }, []);

  const getBuku = async () => {
    try {
      const result = await axiosInstance.get(`/buku`);
      setBuku(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPenulis = async () => {
    try {
      const result = await axiosInstance.get(`/penulis`);
      setPenulis(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPenerbit = async () => {
    try {
      const result = await axiosInstance.get(`/penerbit`);
      setPenerbit(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getGenre = async () => {
    try {
      const result = await axiosInstance.get(`/genre`);
      setGenre(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTransaksi = async () => {
    try {
      const result = await axiosInstance.get(`/transaksi`);
      setTransaksi(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Yakin hapus buku?",
      text: "Data tidak bisa dikembalikan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    });

    if (!confirm.isConfirmed) return;

    const isDipakai = transaksi.some((t) => t.buku_id === id);

    if (isDipakai) {
      return Swal.fire({
        icon: "error",
        title: "Tidak Bisa Dihapus",
        text: "Buku masih digunakan di transaksi!",
      });
    }

    try {
      await axiosInstance.delete(`/buku/delete/${id}`);

      await Swal.fire({
        icon: "success",
        title: "Berhasil dihapus",
        timer: 1500,
        showConfirmButton: false,
      });

      getBuku();
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error?.response?.data?.message || "Terjadi kesalahan",
      });
    }
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/buku/edit/${id}`);
  };

  const filterData = buku.filter((item) =>
    item.judul_buku?.toLowerCase().includes(search.toLowerCase()),
  );

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(filterData.length / ITEMS_PER_PAGE);

  const paginatedData = filterData.slice(
    (currentpage - 1) * ITEMS_PER_PAGE,
    currentpage * ITEMS_PER_PAGE,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const penulisName = (id) => {
    const data = penulis.find((p) => p.id === id);
    return data ? data.nama_penulis : "-";
  };

  const penerbitName = (id) => {
    const data = penerbit.find((p) => p.id === id);
    return data ? data.nama_penerbit : "-";
  };

  const genreName = (id) => {
    const data = genre.find((g) => g.id === id);
    return data ? data.nama_genre : "-";
  };

  return (
    <div>
      <div className="buku-header">
        <h3>Daftar Buku</h3>
        <NavLink to={"/dashboard/buku/add"}>
          <FaPlusCircle /> Tambah Buku
        </NavLink>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Foto</th>
              <th>Judul Buku</th>
              <th>Deskripsi</th>
              <th>Stok</th>
              <th>Tanggal Terbit</th>
              <th>Genre</th>
              <th>Penulis</th>
              <th>Penerbit</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((b, index) => (
                <tr key={b.id}>
                  <td>{(currentpage - 1) * ITEMS_PER_PAGE + index + 1}</td>

                  <td>
                    <img src={b.foto} alt="gambar" width={100} />
                  </td>

                  <td>{b.judul_buku}</td>
                  <td>{b.deskripsi}</td>
                  <td>{b.stok}</td>
                  <td>{b.tgl_terbit}</td>
                  <td>{genreName(b.genre_id)}</td>
                  <td>{penulisName(b.penulis_id)}</td>
                  <td>{penerbitName(b.penerbit_id)}</td>

                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(b.id)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(b.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10}>Maaf, data buku tidak ditemukan</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="btn-page"
            disabled={currentpage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            « Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className="btn-page"
              disabled={currentpage === i + 1}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="btn-page"
            disabled={currentpage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next »
          </button>
        </div>
      )}
    </div>
  );
};

export default Buku;
