import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import addProductt from "../../assets/monyet.png";
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
    <div>
      <div className="produk-header-tambah">
        <h3>Tambah Buku</h3>
      </div>

      <div className="add-kategori-layout">
        <div className="form-side">
          <form onSubmit={handleSubmit} className="from-wrapper">
            <div className="from-grid">
              <label htmlFor="foto">Foto</label>
              <input
                type="file"
                id="foto"
                accept="image/*"
                onChange={handlechangeImage}
              />
              {preview && <img src={preview} alt="image-preview" width={220} />}
            </div>

            <div className="from-grid">
              <label htmlFor="judul_buku">Judul Buku</label>
              <input
                type="text"
                id="judul_buku"
                placeholder="Contoh: Atomic Habits"
                onChange={(e) => setNamaBuku(e.target.value)}
                required
              />
            </div>

            <div className="from-grid">
              <label htmlFor="deskripsi">Deskripsi</label>
              <input
                type="text"
                id="deskripsi"
                placeholder="Masukan Deskripsi......."
                onChange={(e) => setDeskripsi(e.target.value)}
                required
              />
            </div>

            <div className="from-grid">
              <label htmlFor="stok">Stok</label>
              <input
                type="number"
                id="stok"
                onChange={(e) => setStok(e.target.value)}
                required
              />
            </div>

            <div className="from-grid">
              <label htmlFor="tgl_terbit">Tanggal Terbit</label>
              <input
                type="date"
                id="tgl_terbit"
                onChange={(e) => setTanggalTerbit(e.target.value)}
                required
              />
            </div>

            <div className="from-grid">
              <label htmlFor="nama_genre">Nama Genre</label>
              <select
                id="nama_genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
              >
                <option value="" hidden>
                  Pilih Kategori
                </option>
                {genreList.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nama_genre}
                  </option>
                ))}
              </select>
            </div>

            <div className="from-grid">
              <label htmlFor="nama_penulis">Nama Penulis</label>
              <select
                id="nama_penulis"
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

            <div className="from-grid">
              <label htmlFor="nama_penerbit">Nama Penerbit</label>
              <select
                id="nama_penerbit"
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

        <div className="image-side">
          <img src={addProductt} alt="produk" />
        </div>
      </div>
    </div>
  );
};

export default AddBuku;
