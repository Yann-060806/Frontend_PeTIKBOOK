import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import editBuku from "../../assets/editBuku.svg";
import axiosInstance from "../../utils/axiosInstance";
import "./EditBuku.css";

const EditBuku = () => {
  const navigate = useNavigate();
  const [namaBuku, setNamaBuku] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [stok, setStok] = useState(0);
  const [tanggalTerbit, setTanggalTerbit] = useState("");
  const [penulis, setPenulis] = useState([]);
  const [penerbit, setPenerbit] = useState([]);
  const [genre, setGenre] = useState([]);
  const [gambar, setGambar] = useState(null);
  const [preview, setPreview] = useState(null);

  const [genreList, setGenreList] = useState([]);
  const [penulisList, setPenulisList] = useState([]);
  const [penerbitList, setPenerbitList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getBukuById();
    getGenre();
    getPenulis();
    getPenerbit();
  }, []);

  const getBukuById = async () => {
    setLoading(true);
    try {
      const buku = await axiosInstance.get(`/buku/cari/${id}`);
      setNamaBuku(buku.data.data.judul_buku);
      setDeskripsi(buku.data.data.deskripsi);
      setStok(buku.data.data.stok);
      setTanggalTerbit(buku.data.data.tgl_terbit);
      setGenre(buku.data.data.genre_id);
      setPenulis(buku.data.data.penulis_id);
      setPenerbit(buku.data.data.penerbit_id);
      setPreview(buku.data.data.foto);
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
      await axiosInstance.patch(
        `/buku/update/${id}`,
        {
          judul_buku: namaBuku,
          deskripsi,
          stok,
          tgl_terbit: tanggalTerbit,
          genre_id: genre,
          penulis_id: penulis,
          penerbit_id: penerbit,
          foto: gambar,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      navigate(-1);
    } catch (error) {
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    setGambar(file);
    setPreview(URL.createObjectURL(file));
  };

  const getGenre = async () => {
    try {
      const result = await axiosInstance.get(`/genre`);
      setGenreList(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPenulis = async () => {
    try {
      const result = await axiosInstance.get(`/penulis`);
      setPenulisList(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPenerbit = async () => {
    try {
      const result = await axiosInstance.get(`/penerbit`);
      setPenerbitList(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="buku-container">
      <div className="buku-header-edit">
        <h3>Edit Buku</h3>
      </div>

      <div className="buku-layout">
        <div className="buku-form-side">
          <form onSubmit={handleSubmit} className="buku-form">
            <div className="buku-field">
              <label>Foto</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleChangeImage}
              />
              {preview && (
                <img src={preview} alt="preview" className="buku-preview" />
              )}
            </div>

            <div className="buku-field">
              <label>Judul Buku</label>
              <input
                type="text"
                value={namaBuku}
                onChange={(e) => setNamaBuku(e.target.value)}
                required
              />
            </div>

            <div className="buku-field">
              <label>Deskripsi</label>
              <input
                type="text"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                required
              />
            </div>

            <div className="buku-field">
              <label>Stok</label>
              <input
                type="number"
                value={stok}
                onChange={(e) => setStok(e.target.value)}
                required
              />
            </div>

            <div className="buku-field">
              <label>Tanggal Terbit</label>
              <input
                type="date"
                value={tanggalTerbit}
                onChange={(e) => setTanggalTerbit(e.target.value)}
                required
              />
            </div>

            <div className="buku-field">
              <label>Genre</label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
              >
                <option value="" hidden>
                  Pilih Genre
                </option>
                {genreList.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nama_genre}
                  </option>
                ))}
              </select>
            </div>

            <div className="buku-field">
              <label>Penulis</label>
              <select
                value={penulis}
                onChange={(e) => setPenulis(e.target.value)}
                required
              >
                <option value="" hidden>
                  Pilih Penulis
                </option>
                {penulisList.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nama_penulis}
                  </option>
                ))}
              </select>
            </div>

            <div className="buku-field">
              <label>Penerbit</label>
              <select
                value={penerbit}
                onChange={(e) => setPenerbit(e.target.value)}
                required
              >
                <option value="" hidden>
                  Pilih Penerbit
                </option>
                {penerbitList.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nama_penerbit}
                  </option>
                ))}
              </select>
            </div>

            <div className="buku-actions">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="buku-btn-cancel"
              >
                Batal
              </button>

              <button
                type="submit"
                className="buku-btn-submit"
                disabled={loading}
              >
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </div>

        <div className="buku-image">
          <img src={editBuku} alt="preview" />
        </div>
      </div>
    </div>
  );
};

export default EditBuku;
