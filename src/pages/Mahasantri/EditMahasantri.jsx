import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Swal from "sweetalert2";
import "./EditMahasantri.css";
import editImg from "../../assets/editPenulis.svg";

const EditMahasantri = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [nama, setNama] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noHp, setNoHp] = useState("");

  const [user, setUser] = useState("");
  const [usersList, setUsersList] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchById();
    getListUsers();
  }, []);

  const fetchById = async () => {
    try {
      const res = await axiosInstance.get(`/mahasantri/cari/${id}`);
      const data = res.data.data;

      setNama(data.nama_mahasantri);
      setJurusan(data.jurusan);
      setAlamat(data.alamat);
      setNoHp(data.no_hp);
      setUser(data.user_id);
    } catch (error) {
      console.log(error.response || error);
    }
  };

  const getListUsers = async () => {
    try {
      const result = await axiosInstance.get("/user");
      setUsersList(result.data.data);
    } catch (error) {
      console.log("GET USERS ERROR:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.patch(`/mahasantri/ubah/${id}`, {
        nama_mahasantri: nama,
        jurusan,
        alamat,
        no_hp: noHp,
        user_id: user,
      });

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Data berhasil diupdate",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(-1);
    } catch (error) {
      console.log("EDIT ERROR FULL:", error);
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);
      console.log("MESSAGE:", error.message);

      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Tidak bisa update data",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mahasantri-container">
      <div className="mahasantri-header-edit">
        <h3>Edit Mahasantri</h3>
      </div>

      <div className="mahasantri-layout reverse">
        <div className="mahasantri-form-side">
          <form onSubmit={handleSubmit} className="mahasantri-form">
            <div className="mahasantri-field">
              <label>User</label>
              <select
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
              >
                <option value="">-- Pilih User --</option>

                {usersList.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.id} - {item.username || item.email}
                  </option>
                ))}
              </select>
            </div>

            <div className="mahasantri-field">
              <label>Nama Mahasantri</label>
              <input
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required
              />
            </div>

            <div className="mahasantri-field">
              <label>Jurusan</label>
              <input
                value={jurusan}
                onChange={(e) => setJurusan(e.target.value)}
                required
              />
            </div>

            <div className="mahasantri-field">
              <label>Alamat</label>
              <input
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                required
              />
            </div>

            <div className="mahasantri-field">
              <label>No HP</label>
              <input
                value={noHp}
                onChange={(e) => setNoHp(e.target.value)}
                required
              />
            </div>

            <div className="mahasantri-actions">
              <button
                type="button"
                className="mahasantri-btn-cancel"
                onClick={() => navigate(-1)}
              >
                Batal
              </button>

              <button
                type="submit"
                className="mahasantri-btn-submit"
                disabled={loading}
              >
                {loading ? "Menyimpan..." : "Update"}
              </button>
            </div>
          </form>
        </div>

        <div className="mahasantri-image">
          <img src={editImg} alt="edit" />
        </div>
      </div>
    </div>
  );
};

export default EditMahasantri;
