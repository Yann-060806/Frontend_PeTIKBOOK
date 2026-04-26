import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import editImg from "../../assets/editGenre.svg";
import axiosInstance from "../../utils/axiosInstance";
import "./EditGenre.css";

const EditGenre = () => {
  const navigate = useNavigate();
  const [namaGenre, setNamaGenre] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getGenreById();
  }, []);

  const getGenreById = async () => {
    setLoading(true);
    try {
      const genre = await axiosInstance.get(`/genre/cari/${id}`);
      console.log(genre.data.data);

      setNamaGenre(genre.data.data.nama_genre);
      setDeskripsi(genre.data.data.deskripsi);
    } catch (error) {
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      await axiosInstance.patch(`/genre/ubah/${id}`, {
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
    <div className="edit-genre-container">
      <div className="edit-genre-header">
        <h3>Edit Genre</h3>
      </div>

      <div className="edit-genre-layout">
        <div className="edit-genre-form-side">
          <form onSubmit={handleSubmit} className="edit-genre-form">
            <div className="edit-genre-field">
              <label>Nama Genre</label>
              <input
                type="text"
                value={namaGenre}
                placeholder="Masukan nama genre..."
                onChange={(e) => setNamaGenre(e.target.value)}
                required
              />
            </div>

            <div className="edit-genre-field">
              <label>Deskripsi</label>
              <input
                type="text"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                required
              />
            </div>

            <div className="edit-genre-actions">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="edit-genre-btn-cancel"
              >
                Batal
              </button>

              <button
                type="submit"
                className="edit-genre-btn-submit"
                disabled={loading}
              >
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </div>

        <div className="edit-genre-image">
          <img src={editImg} alt="preview" />
        </div>
      </div>
    </div>
  );
};

export default EditGenre;
