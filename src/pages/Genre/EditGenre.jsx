import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import editPelanggan from "../../assets/monyet.png";
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
    <div>
      <div className="pelanggan-header-tambah">
        <h3>Edit Penerbit</h3>
      </div>

      <div className="add-pelanggan-layout">
        <div className="image-side">
          <img src={editPelanggan} alt="preview" />
        </div>

        <div className="form-side">
          <form onSubmit={handleSubmit} className="from-wrapper">
            <div className="from-grid">
              <label htmlFor="nama_genre">Nama Genre</label>
              <input
                type="text"
                id="nama_genre"
                value={namaGenre}
                placeholder="Contoh: Masukan Nama Genre...."
                onChange={(e) => setNamaGenre(e.target.value)}
                required
              />
            </div>

            <div className="from-grid">
              <label>Deskripsi</label>
              <input
                type="deskripsi"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                required
              />
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
      </div>
    </div>
  );
};

export default EditGenre;
