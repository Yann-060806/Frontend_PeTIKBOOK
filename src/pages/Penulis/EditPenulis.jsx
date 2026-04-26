import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import editImg from "../../assets/editPenulis.svg";
import axiosInstance from "../../utils/axiosInstance";
import "./EditPenulis.css";

const EditPenulis = () => {
  const navigate = useNavigate();
  const [namaPenulis, setNamaPenulis] = useState("");
  const [alamat, setAlamat] = useState("");
  const [email, setEmail] = useState("");
  const [noHp, setNoHp] = useState("");
  const [profil, setProfil] = useState(null);

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getPenulisById();
  }, []);

  const getPenulisById = async () => {
    setLoading(true);
    try {
      const penulis = await axiosInstance.get(`/penulis/cari/${id}`);
      console.log(penulis.data.data);

      setNamaPenulis(penulis.data.data.nama_penulis);
      setAlamat(penulis.data.data.alamat);
      setEmail(penulis.data.data.email);
      setNoHp(penulis.data.data.no_hp);
      setPreview(penulis.data.data.profil);
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
        `/penulis/update/${id}`,
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

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    setProfil(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="penulis-container">
      <div className="penulis-header-edit">
        <h3>Edit Penulis</h3>
      </div>

      <div className="penulis-layout">
        <div className="penulis-form-side">
          <form onSubmit={handleSubmit} className="penulis-form">
            <div className="penulis-field">
              <label>Nama Penulis</label>
              <input
                type="text"
                value={namaPenulis}
                onChange={(e) => setNamaPenulis(e.target.value)}
                required
              />
            </div>

            <div className="penulis-field">
              <label>Alamat</label>
              <input
                type="text"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                required
              />
            </div>

            <div className="penulis-field">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="penulis-field">
              <label>Nomor HP</label>
              <input
                type="text"
                value={noHp}
                onChange={(e) => setNoHp(e.target.value)}
                required
              />
            </div>

            <div className="penulis-field">
              <label>Foto</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleChangeImage}
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

        <div className="penulis-image">
          <img src={editImg} alt="preview" />
        </div>
      </div>
    </div>
  );
};

export default EditPenulis;
