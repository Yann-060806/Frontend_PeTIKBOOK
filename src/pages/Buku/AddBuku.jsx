import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import addImg from "../../assets/addBuku.svg";
import axiosInstance from "../../utils/axiosInstance";
import "./AddBuku.css";

const AddBuku = () => {
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

  useEffect(() => {
    getGenre();
    getPenulis();
    getPenerbit();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await axiosInstance.post(
        `/buku/create`,
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

  const handlechangeImage = (e) => {
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
      <div className="buku-header-add">
        <h3>Tambah Buku</h3>
      </div>

      <div className="buku-layout">
        <div className="buku-image">
          <img src={addImg} alt="produk" />
        </div>

        <div className="buku-form-side">
          <form onSubmit={handleSubmit} className="buku-form">
            <div className="buku-field">
              <label>Foto</label>
              <input
                type="file"
                accept="image/*"
                onChange={handlechangeImage}
              />
              {preview && (
                <img src={preview} alt="preview" className="buku-preview" />
              )}
            </div>

            <div className="buku-field">
              <label>Judul Buku</label>
              <input
                type="text"
                placeholder="Contoh: Atomic Habits"
                onChange={(e) => setNamaBuku(e.target.value)}
                required
              />
            </div>

            <div className="buku-field">
              <label>Deskripsi</label>
              <input
                type="text"
                placeholder="Masukan Deskripsi..."
                onChange={(e) => setDeskripsi(e.target.value)}
                required
              />
            </div>

            <div className="buku-field">
              <label>Stok</label>
              <input
                type="number"
                onChange={(e) => setStok(e.target.value)}
                required
              />
            </div>

            <div className="buku-field">
              <label>Tanggal Terbit</label>
              <input
                type="date"
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
      </div>
    </div>
  );
};

export default AddBuku;
