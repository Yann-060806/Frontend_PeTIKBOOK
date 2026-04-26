import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import "./AddPenerbit.css";
import Img from "../../assets/addPenerbit.svg";

const AddPenerbit = () => {
  const navigate = useNavigate();

  const [namaPenerbit, setNamaPenerbit] = useState("");
  const [email, setEmail] = useState("");
  const [noHp, setNoHp] = useState("");
  const [profil, setProfil] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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
    } catch (err) {
      console.log(err);
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
    <div className="add-container">
      <div className="add-header">
        <h3>Tambah Penerbit</h3>
      </div>

      <div className="add-layout">
        <div className="add-image">
          <img src={Img} alt="illustration" />
        </div>

        <div className="add-form-side">
          <form onSubmit={handleSubmit} className="add-form">
            <div className="add-field">
              <label>Nama Penerbit</label>
              <input
                type="text"
                onChange={(e) => setNamaPenerbit(e.target.value)}
                required
              />
            </div>

            <div className="add-field">
              <label>Email</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="add-field">
              <label>No HP</label>
              <input
                type="text"
                onChange={(e) => setNoHp(e.target.value)}
                required
              />
            </div>

            <div className="add-field">
              <label>Gambar</label>
              <input type="file" onChange={handleChangeImage} />
              {preview && (
                <img src={preview} className="add-preview" alt="preview" />
              )}
            </div>

            <div className="add-actions">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="add-btn-cancel"
              >
                Batal
              </button>

              <button
                type="submit"
                className="add-btn-submit"
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

export default AddPenerbit;
