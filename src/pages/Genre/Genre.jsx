import { useEffect, useState } from "react";
import { NavLink, useNavigate, useOutletContext } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import "./Genre.css";

const Genre = () => {
  const [genre, setGenre] = useState([]);
  const [currentpage, setCurrentPage] = useState(1);
  const { search } = useOutletContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getGenre();
  }, []);

  const getGenre = async () => {
    setLoading(true);
    try {
      const result = await axiosInstance.get("/genre");
      setGenre(result.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filterData = genre.filter((genre) => {
    return genre.nama_genre?.toLowerCase().includes(search.toLowerCase());
  });

  // Untuk Mencari Total Halaman
  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(filterData.length / ITEMS_PER_PAGE);

  // slice(mulai, selesai)
  const paginatedData = filterData.slice(
    (currentpage - 1) * ITEMS_PER_PAGE,
    currentpage * ITEMS_PER_PAGE,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handleDelete = async (id) => {
    const msg = window.confirm("Apakah yakin ingin menghapus genre ini?");
    if (!msg) return;
    try {
      await axiosInstance.delete(`/genre/hapus/${id}`);
      getGenre();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id) => {
    navigate(`/dashboard/genre/edit/${id}`);
  };

  return (
    <div>
      <div className="genre-header">
        <h3>Daftar Genre</h3>
        <NavLink to={"/dashboard/genre/add"}>Tambah Genre</NavLink>
      </div>

      <div className="table-wrapper">
        <table border={1}>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Genre</th>
              <th>Deskripsi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((g, index) => (
                <tr key={index}>
                  <td>{(currentpage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                  <td>{g.nama_genre}</td>
                  <td>{g.deskripsi}</td>
                  <td>
                    <button onClick={() => handleEdit(g.id)}>Edit</button>
                    <button onClick={() => handleDelete(g.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>Maaf, data genre tidak ditemukan</td>
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
              className="btn-page"
              disabled={currentpage === i + 1}
              key={i}
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
            &raquo; Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Genre;
