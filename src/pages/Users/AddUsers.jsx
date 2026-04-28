import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import "./AddUsers.css";
import addImg from "../../assets/addPenerbit.svg";

const AddUsers = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const [profil, setProfil] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.post(
        "/user/create",
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

      navigate("/dashboard/users");
    } catch (error) {
      console.log(error.response || error);
    } finally {
      setLoading(false);
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setProfil(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="user-container">
      <div className="user-header">
        <h3>Tambah User</h3>
      </div>

      <div className="user-layout">
        <div className="user-image">
          <img src={addImg} alt="add" />
        </div>

        <div className="user-form-side">
          <form onSubmit={handleSubmit} className="user-form">
            <div className="user-field">
              <label>Username</label>
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="user-field">
              <label>Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="user-field">
              <label>Role</label>
              <select onChange={(e) => setRole(e.target.value)} value={role}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="user-field">
              <label>Foto</label>
              <input type="file" onChange={handleImage} />
              {preview && (
                <img src={preview} className="preview" alt="preview" />
              )}
            </div>

            <div className="user-actions">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn-cancel"
              >
                Batal
              </button>

              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUsers;
