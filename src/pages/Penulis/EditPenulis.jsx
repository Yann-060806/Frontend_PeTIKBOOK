import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import editPelanggan from "../../assets/monyet.png";
import axiosInstance from "../../utils/axiosInstance";

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
      const penulis = await axiosInstance.get(`/api/penulis/cari/${id}`);
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
      await axiosInstance.patch(`/api/penulis/update/${id}`, {
        nama_penulis: namaPenulis,
        alamat,
        email,
        no_hp: noHp,
        profil,
      });
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
    <div>
      <div className="pelanggan-header-tambah">
        <h3>Edit Pelanggan</h3>
      </div>

      <div className="add-pelanggan-layout">
        <div className="image-side">
          <img src={editPelanggan} alt="preview" />
        </div>

        <div className="form-side">
          <form onSubmit={handleSubmit} className="from-wrapper">
            <div className="from-grid">
              <label htmlFor="nama_penulis">Nama Penulis</label>
              <input
                type="text"
                id="nama_penulis"
                value={namaPenulis}
                placeholder="Contoh: Andrea Hirata"
                onChange={(e) => setNamaPenulis(e.target.value)}
                required
              />
            </div>

            <div className="from-grid">
              <label>Alamat</label>
              <input
                type="text"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                required
              />
            </div>

            <div className="from-grid">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="from-grid">
              <label>Nomor HP</label>
              <input
                type="tel"
                value={noHp}
                onChange={(e) => setNoHp(e.target.value)}
                required
              />
            </div>

            <div className="from-grid">
              <label htmlFor="profil">Gambar</label>
              <input
                type="file"
                id="profil"
                accept="image/*"
                onChange={handleChangeImage}
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
      </div>
    </div>
  );
};

export default EditPenulis;
