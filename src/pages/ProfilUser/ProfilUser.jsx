import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../utils/axiosInstance";
import MyNavbar from "../../components/MyNavbar/MyNavbar";
import Footer from "../../components/Footer/Footer";
import "./ProfilUser.css";

const ProfilUser = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Silakan login terlebih dahulu");
        setLoading(false);
        return;
      }

      const decoded = jwtDecode(token);
      const userId = decoded.id;

      const res = await axiosInstance.get("/mahasantri");

      const data = res.data.data;

      const myProfile = data.find(
        (item) => Number(item.user_id) === Number(userId),
      );

      if (!myProfile) {
        setError("Profil tidak ditemukan");
        setLoading(false);
        return;
      }

      setProfile(myProfile);
    } catch (err) {
      console.log(err);
      setError("Gagal mengambil profil");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="profile-page">
      <MyNavbar />

      <div className="profile-container">
        {loading && <p>Loading...</p>}

        {error && !loading && <p>{error}</p>}

        {profile && !loading && (
          <div className="profile-card">
            <div className="avatar-circle">
              {profile.user?.profil ? (
                <img
                  src={`${profile.user.profil}`}
                  alt="profile"
                  style={{
                    width: "100px",
                    height: "90px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                profile.nama_mahasantri?.charAt(0).toUpperCase()
              )}
            </div>

            <div className="profile-info">
              <div>
                <span>Nama</span>
                <p>{profile.nama_mahasantri}</p>
              </div>

              <div>
                <span>Jurusan</span>
                <p>{profile.jurusan}</p>
              </div>

              <div>
                <span>Alamat</span>
                <p>{profile.alamat}</p>
              </div>

              <div>
                <span>No HP</span>
                <p>{profile.no_hp}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProfilUser;
