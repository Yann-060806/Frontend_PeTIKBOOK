import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const AddGenre = () => {
  const navigate = useNavigate();

  // State data User
  const [namaGenre, setNamaGenre] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      await axiosInstance.post("/api/genre/tambah", {
        nama_genre: namaGenre,
        deskripsi,
      });

      navigate(-1);
    } catch (error) {
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="penulis-page">
      <div className="users-header">
        <h3>Tambah Genre</h3>
      </div>
      <form onSubmit={handleSubmit} className="from-wrapper">
        <div className="from-grid">
          <label htmlFor="namaGenre">Nama Genre</label>
          <input
            type="text"
            id="namaGenre"
            placeholder="Masukan nama genre......"
            onChange={(e) => setNamaGenre(e.target.value)}
            required
          />
          {errors.namaGenre && (
            <span className="error" style={{ color: "red" }}>
              {errors.namaGenre}
            </span>
          )}
        </div>

        <div className="from-grid">
          <label htmlFor="deskripsi">Deskripsi</label>
          <input
            type="text"
            id="deskripsi"
            placeholder="Masukan Deskripsi...."
            onChange={(e) => setDeskripsi(e.target.value)}
            required
          />
          {errors.deskripsi && (
            <span className="error" style={{ color: "red" }}>
              {errors.deskripsi}
            </span>
          )}
        </div>

        <div className="btn-group">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-delete"
          >
            Batal
          </button>
          <button type="submit" className="btn-tambah" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGenre;
