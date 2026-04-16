import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate, useOutletContext } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstance";
import "./Buku.css";

const Buku = () => {
  const [buku, setBuku] = useState([]);
  const [penulis, setPenulis] = useState([]);
  const [penerbit, setPenerbit] = useState([]);
  const [genre, setGenre] = useState([]);
  const [currentpage, setCurrentPage] = useState(1);
  const { search } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    getBuku();
    getPenulis();
    getPenerbit();
    getGenre();
  }, []);

  const getBuku = async () => {
    try {
      const result = await axiosInstance.get(`/api/buku`);

      setBuku(result.data.data);
    } catch (error) {
      console.log(error);
    }
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

  const handleDelete = async (id) => {
    const msg = window.confirm("Apakah yakin ingin menghapus buku ini?");
    if (!msg) return;

    try {
      await axiosInstance.delete(`/api/buku/delete/${id}`);
      getBuku();
    } catch (error) {
      console.log(error);
    }
  };

  const getPenulis = async () => {
    try {
      const result = await axiosInstance.get(`/api/penulis`);
      setPenulis(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPenerbit = async () => {
    try {
      const result = await axiosInstance.get(`/api/penerbit`);
      setPenerbit(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getGenre = async () => {
    try {
      const result = await axiosInstance.get(`/api/genre`);
      setGenre(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const penulisName = (penulis_id) => {
    const pen = penulis.find((p) => p.id === penulis_id);
    return pen ? pen.nama_penulis : "-";
  };

  const penerbitName = (penerbit_id) => {
    const pen = penerbit.find((p) => p.id === penerbit_id);
    return pen ? pen.nama_penerbit : "-";
  };

  const genreName = (genre_id) => {
    const gen = genre.find((g) => g.id === genre_id);
    return gen ? gen.nama_genre : "-";
  };

  const handleEdit = async (id) => {
    navigate(`/dashboard/buku/edit/${id}`);
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
        <table border={1}>
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
              paginatedData.map((buku, index) => (
                <tr key={buku.id}>
                  <td>{(currentpage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                  <td>
                    <img src={buku.foto} alt="gambar" width={100} />
                  </td>
                  <td>{buku.judul_buku}</td>
                  <td>{buku.deskripsi}</td>
                  <td>{buku.stok}</td>
                  <td>{buku.tgl_terbit}</td>
                  <td>{genreName(buku.genre_id)}</td>
                  <td>{penulisName(buku.penulis_id)}</td>
                  <td>{penerbitName(buku.penerbit_id)}</td>

                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(buku.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(buku.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>Data tidak ditemukan</td>
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
            &laquo; Prev
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
            Next &raquo;
          </button>
        </div>
      )}
    </div>
  );
};

export default Buku;
