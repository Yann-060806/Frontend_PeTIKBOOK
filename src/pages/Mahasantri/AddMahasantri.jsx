import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import addImg from "../../assets/addPenulis.svg";

const AddMahasantri = () => {
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noHp, setNoHp] = useState("");

  const [user, setUser] = useState("");
  const [usersList, setUsersList] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getListUsers();
  }, []);

  const getListUsers = async () => {
    try {
      const result = await axiosInstance.get("/user");
      console.log("USERS API:", result.data.data);

      setUsersList(result.data.data);
    } catch (error) {
      console.log("GET USERS ERROR:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      nama_mahasantri: nama,
      jurusan,
      alamat,
      no_hp: noHp,
      user_id: user,
    };

    console.log("PAYLOAD SEND:", payload);

    try {
      await axiosInstance.post("/mahasantri/tambah", payload);

      navigate(-1);
    } catch (error) {
      console.log("SUBMIT ERROR:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mahasantri-header-add">
        <h3>Tambah Mahasantri</h3>
      </div>

      <div className="mahasantri-layout">
        <div className="mahasantri-image">
          <img src={addImg} alt="preview" />
        </div>

        <div className="mahasantri-form-side">
          <form onSubmit={handleSubmit} className="mahasantri-form">
            <div className="mahasantri-field">
              <label>User</label>

              <select
                value={user}
                onChange={(e) => {
                  console.log("SELECTED USER ID:", e.target.value); // 🔥 DEBUG
                  setUser(e.target.value);
                }}
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
                type="text"
                onChange={(e) => setNama(e.target.value)}
                required
              />
            </div>

            <div className="mahasantri-field">
              <label>Jurusan</label>
              <input
                type="text"
                onChange={(e) => setJurusan(e.target.value)}
                required
              />
            </div>

            <div className="mahasantri-field">
              <label>Alamat</label>
              <input
                type="text"
                onChange={(e) => setAlamat(e.target.value)}
                required
              />
            </div>

            <div className="mahasantri-field">
              <label>No HP</label>
              <input
                type="text"
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
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMahasantri;
