import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import "./AddPenulis.css";
import addImg from "../../assets/addPenulis.svg";

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
    <div className="penulis-container">
      <div className="penulis-header-add">
        <h3>Tambah Penulis</h3>
      </div>

      <div className="penulis-layout">
        <div className="penulis-image">
          <img src={addImg} alt="preview" />
        </div>

        <div className="penulis-form-side">
          <form onSubmit={handleSubmit} className="penulis-form">
            <div className="penulis-field">
              <label>Nama Penulis</label>
              <input
                type="text"
                placeholder="Contoh: Andrea Hirata"
                onChange={(e) => setNamaPenulis(e.target.value)}
                required
              />
            </div>

            <div className="penulis-field">
              <label>Alamat</label>
              <input
                type="text"
                placeholder="Masukan alamat..."
                onChange={(e) => setAlamat(e.target.value)}
                required
              />
            </div>

            <div className="penulis-field">
              <label>Email</label>
              <input
                type="email"
                placeholder="Masukan email..."
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="penulis-field">
              <label>Nomor HP</label>
              <input
                type="text"
                placeholder="08123456789"
                onChange={(e) => setNoHp(e.target.value)}
                required
              />
            </div>

            <div className="penulis-field">
              <label>Foto</label>
              <input
                type="file"
                accept="image/*"
                onChange={handlechangeImage}
              />
              {preview && (
                <img src={preview} alt="preview" className="penulis-preview" />
              )}
            </div>

            <div className="penulis-actions">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="penulis-btn-cancel"
              >
                Batal
              </button>

              <button
                type="submit"
                className="penulis-btn-submit"
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

export default AddPenulis;
