import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import "./AddGenre.css";
import addImg from "../../assets/addGenre.svg";

const AddGenre = () => {
  const navigate = useNavigate();

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
      await axiosInstance.post("/genre/tambah", {
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
    <div className="genre-container">
      <div className="genre-header-add">
        <h3>Tambah Genre</h3>
      </div>

      <div className="genre-layout">
        <div className="genre-image">
          <img src={addImg} alt="genre" />
        </div>

        <div className="genre-form-side">
          <form onSubmit={handleSubmit} className="genre-form">
            <div className="genre-field">
              <label>Nama Genre</label>
              <input
                type="text"
                placeholder="Masukan nama genre..."
                onChange={(e) => setNamaGenre(e.target.value)}
                required
              />
            </div>

            <div className="genre-field">
              <label>Deskripsi</label>
              <input
                type="text"
                placeholder="Masukan deskripsi..."
                onChange={(e) => setDeskripsi(e.target.value)}
                required
              />
            </div>

            <div className="genre-actions">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="genre-btn-cancel"
              >
                Batal
              </button>

              <button
                type="submit"
                className="genre-btn-submit"
                disabled={loading}
              >
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddGenre;
