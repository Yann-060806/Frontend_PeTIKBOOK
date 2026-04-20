import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import "./AddPenerbit.css";

const AddPenerbit = () => {
  const navigate = useNavigate();

  // State data User
  const [namaPenerbit, setNamaPenerbit] = useState("");
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
        "/penerbit/create",
        {
          nama_penerbit: namaPenerbit,
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
        <h3>Tambah Penerbit</h3>
      </div>
      <form onSubmit={handleSubmit} className="from-wrapper">
        <div className="from-grid">
          <label htmlFor="namaPenerbit">Nama Penerbit</label>
          <input
            type="text"
            id="namaPenerbit"
            placeholder="Masukan nama penerbit......"
            onChange={(e) => setNamaPenerbit(e.target.value)}
            required
          />
          {errors.namaPenerbit && (
            <span className="error" style={{ color: "red" }}>
              {errors.namaPenerbit}
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

export default AddPenerbit;
