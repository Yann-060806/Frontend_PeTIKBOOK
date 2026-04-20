import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import "./AddPenulis.css";

const AddPenulis = () => {
  const navigate = useNavigate();

  // State data User
  const [namaPenulis, setNamaPenulis] = useState("");
  const [alamat, setAlamat] = useState("");
  const [email, setEmail] = useState("");
  const [noHp, setNoHp] = useState("");

  const [profil, setProfil] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      await axiosInstance.post(
        "/penulis/create",
        {
          nama_penulis: namaPenulis,
          alamat,
          email,
          no_hp: noHp,
          profil,
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
    setProfil(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="penulis-page">
      <div className="users-header">
        <h3>Tambah Penulis</h3>
      </div>
      <form onSubmit={handleSubmit} className="from-wrapper">
        <div className="from-grid">
          <label htmlFor="namaPenulis">Nama Penulis</label>
          <input
            type="text"
            id="namaPenulis"
            placeholder="Contoh: Andrea Hirata"
            onChange={(e) => setNamaPenulis(e.target.value)}
            required
          />
          {errors.namaPenulis && (
            <span className="error" style={{ color: "red" }}>
              {errors.namaPenulis}
            </span>
          )}
        </div>

        <div className="from-grid">
          <label htmlFor="alamat">Alamat</label>
          <input
            type="alamat"
            id="alamat"
            placeholder="Masukan Alamat...."
            onChange={(e) => setAlamat(e.target.value)}
            required
          />
          {errors.alamat && (
            <span className="error" style={{ color: "red" }}>
              {errors.alamat}
            </span>
          )}
        </div>

        <div className="from-grid">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Masukan Email...."
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && (
            <span className="error" style={{ color: "red" }}>
              {errors.email}
            </span>
          )}
        </div>

        <div className="from-grid">
          <label htmlFor="noHp">Nomor Hp</label>
          <input
            type="noHp"
            id="noHp"
            placeholder="Contoh: 08123456789"
            onChange={(e) => setNoHp(e.target.value)}
            required
          />
          {errors.noHp && (
            <span className="error" style={{ color: "red" }}>
              {errors.noHp}
            </span>
          )}
        </div>

        <div className="from-grid">
          <label htmlFor="profil">Gambar</label>
          <input
            type="file"
            id="profil"
            accept="image/*"
            onChange={handlechangeImage}
          />
          {preview && <img src={preview} alt="image-preview" width={220} />}
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

export default AddPenulis;
