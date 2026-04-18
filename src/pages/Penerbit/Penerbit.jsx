import { useEffect, useState } from "react";
import { NavLink, useNavigate, useOutletContext } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const Penerbit = () => {
  const [penerbit, setPenerbit] = useState([]);
  const [currentpage, setCurrentPage] = useState(1);
  const { search } = useOutletContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getPenerbit();
  }, []);

  const getPenerbit = async () => {
    setLoading(true);
    try {
      const result = await axiosInstance.get("/api/penerbit");
      setPenerbit(result.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filterData = penerbit.filter((penerbit) => {
    return penerbit.nama_penerbit?.toLowerCase().includes(search.toLowerCase());
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
    const msg = window.confirm("Apakah yakin ingin menghapus penerbit ini?");
    if (!msg) return;
    try {
      await axiosInstance.delete(`/api/penerbit/delete/${id}`);
      getPenerbit();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id) => {
    navigate(`/dashboard/penerbit/edit/${id}`);
  };

  return (
    <div>
      <div className="penerbit-header">
        <h3>Daftar Penerbit</h3>
        <NavLink to={"/dashboard/penerbit/add"}>Tambah Penerbit</NavLink>
      </div>

      <div className="table-wrapper">
        <table border={1}>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Nomor Hp</th>
              <th>Gambar</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((p, index) => (
              <tr key={index}>
                <td>{(currentpage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                <td>{p.nama_penerbit}</td>
                <td>{p.email}</td>
                <td>{p.no_hp}</td>
                <td>
                  <img src={p.profil} alt="gambar" width={120} />
                </td>
                <td>
                  <button onClick={() => handleEdit(p.id)}>Edit</button>
                  <button onClick={() => handleDelete(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
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

export default Penerbit;
