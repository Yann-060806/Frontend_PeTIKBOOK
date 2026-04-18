import { useEffect, useState } from "react";
import { NavLink, useNavigate, useOutletContext } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import "./Penulis.css";

const Penulis = () => {
  const [penulis, setPenulis] = useState([]);
  const [currentpage, setCurrentPage] = useState(1);
  const { search } = useOutletContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getPenulis();
  }, []);

  const getPenulis = async () => {
    setLoading(true);
    try {
      const result = await axiosInstance.get("/api/penulis");
      setPenulis(result.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filterData = penulis.filter((penulis) => {
    return penulis.nama_penulis?.toLowerCase().includes(search.toLowerCase());
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
    const msg = window.confirm("Apakah yakin ingin menghapus penulis ini?");
    if (!msg) return;
    try {
      await axiosInstance.delete(`/api/penulis/delete/${id}`);
      getPenulis();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id) => {
    navigate(`/dashboard/penulis/edit/${id}`);
  };

  return (
    <div>
      <div className="penulis-header">
        <h3>Daftar Penulis</h3>
        <NavLink to={"/dashboard/penulis/add"}>Tambah Penulis</NavLink>
      </div>

      <div className="table-wrapper">
        <table border={1}>
          <thead>
            <tr>
              <th>No</th>
              <th>Foto</th>
              <th>Nama</th>
              <th>Alamat</th>
              <th>Email</th>
              <th>Nomor Hp</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((p, index) => (
              <tr key={index}>
                <td>{(currentpage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                <td>
                  <img src={p.profil} alt="gambar" width={120} />
                </td>
                <td>{p.nama_penulis}</td>
                <td>{p.alamat}</td>
                <td>{p.email}</td>
                <td>{p.no_hp}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(p.id)}>
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
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

export default Penulis;
