import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Swal from "sweetalert2";
import "./EditUsers.css";
import editImg from "../../assets/editPenulis.svg";

const EditUsers = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const [profil, setProfil] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get(`/user/cari/${id}`);
      const data = res.data.data;

      setUsername(data.username);
      setRole(data.role);
      setPreview(data.profil);
    } catch (error) {
      console.log(error.response || error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.patch(
        `/user/update/${id}`,
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

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "User berhasil diupdate",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(-1);
    } catch (error) {
      console.log(error.response || error);

      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: error.response?.data?.message || "Tidak bisa update user",
      });
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
    <div className="edituser-container">
      <div className="edituser-header">
        <h3>Edit User</h3>
      </div>

      <div className="edituser-layout">
        <div className="edituser-form-side">
          <form onSubmit={handleSubmit} className="edituser-form">
            <div className="edituser-field">
              <label>Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="edituser-field">
              <label>Password (opsional)</label>
              <input
                type="password"
                placeholder="Kosongkan jika tidak diubah"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="edituser-field">
              <label>Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="edituser-field">
              <label>Foto</label>
              <input type="file" onChange={handleChangeImage} />
              {preview && (
                <img src={preview} alt="preview" className="edituser-preview" />
              )}
            </div>

            <div className="edituser-actions">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn-cancel"
              >
                Batal
              </button>

              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? "Menyimpan..." : "Update"}
              </button>
            </div>
          </form>
        </div>

        <div className="edituser-image">
          <img src={editImg} alt="edit" />
        </div>
      </div>
    </div>
  );
};

export default EditUsers;
