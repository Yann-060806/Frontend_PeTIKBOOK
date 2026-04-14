import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const AddUsers = () => {
  const navigate = useNavigate();

  // State data User
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

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
        "/api/user/create",
        {
          username,
          password,
          role,
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
    <div className="user-page">
      <div className="users-header">
        <h3>Tambah Kategori</h3>
      </div>
      <form onSubmit={handleSubmit} className="from-wrapper">
        <div className="from-grid">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Contoh: Budiono Siregar"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {errors.username && (
            <span className="error" style={{ color: "red" }}>
              {errors.username}
            </span>
          )}
        </div>

        <div className="from-grid">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="*******"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && (
            <span className="error" style={{ color: "red" }}>
              {errors.password}
            </span>
          )}
        </div>

        <div className="from-grid">
          <label htmlFor="role">Role</label>
          <select
            value={role}
            id="role"
            onChange={(e) => setRole(e.target.value)}
          >
            <option disabled>-Pilih Role-</option>
            <option value="pelanggan">user</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && (
            <span className="error" style={{ color: "red" }}>
              {errors.role}
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

export default AddUsers;
