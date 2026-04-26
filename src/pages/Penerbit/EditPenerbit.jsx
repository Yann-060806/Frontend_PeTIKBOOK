import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import "./EditPenerbit.css";
import EditImg from "../../assets/editPenerbit.svg";

const EditPenerbit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [namaPenerbit, setNamaPenerbit] = useState("");
  const [email, setEmail] = useState("");
  const [noHp, setNoHp] = useState("");
  const [profil, setProfil] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPenerbitById();
  }, []);

  const getPenerbitById = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/penerbit/cari/${id}`);
      const data = res.data.data;

      setNamaPenerbit(data.nama_penerbit);
      setEmail(data.email);
      setNoHp(data.no_hp);
      setPreview(data.profil);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.patch(
        `/penerbit/update/${id}`,
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
    <div className="penerbit-container">
      <div className="penerbit-header">
        <h3>Edit Penerbit</h3>
      </div>

      <div className="penerbit-layout">
        <div className="penerbit-form-side">
          <form onSubmit={handleSubmit} className="penerbit-form">
            <div className="penerbit-field">
              <label>Nama Penerbit</label>
              <input
                type="text"
                value={namaPenerbit}
                onChange={(e) => setNamaPenerbit(e.target.value)}
                required
              />
            </div>

            <div className="penerbit-field">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="penerbit-field">
              <label>No HP</label>
              <input
                type="text"
                value={noHp}
                onChange={(e) => setNoHp(e.target.value)}
                required
              />
            </div>

            <div className="penerbit-field">
              <label>Gambar</label>
              <input type="file" onChange={handleChangeImage} />
              {preview && (
                <img src={preview} alt="preview" className="penerbit-preview" />
              )}
            </div>

            <div className="penerbit-actions">
              <button
                type="button"
                className="btn-cancel"
                onClick={() => navigate(-1)}
              >
                Batal
              </button>

              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </div>

        <div className="penerbit-image">
          <img src={EditImg} alt="illustration" />
        </div>
      </div>
    </div>
  );
};

export default EditPenerbit;
