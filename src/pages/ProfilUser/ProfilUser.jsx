import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import MyNavbar from "../../components/MyNavbar/MyNavbar";
import Footer from "../../components/Footer/Footer";
import "./ProfilUser.css";

const ProfilUser = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const decoded = jwtDecode(token);

      const [userRes, mhsRes] = await Promise.all([
        axios.get("/api/user"),
        axios.get("/api/mahasantri"),
      ]);

      const users = userRes.data.data || userRes.data;
      const mahasantri = mhsRes.data.data;

      const userLogin = users.find((u) => u.username === decoded.username);

      if (!userLogin) {
        setProfile(null);
        setLoading(false);
        return;
      }

      const normalize = (str) => str?.toLowerCase().trim();

      const userProfile = mahasantri.find(
        (m) => normalize(m.nama_mahasantri) === normalize(userLogin.username),
      );

      setProfile({
        ...userProfile,
        username: userLogin.username,
      });
    } catch (error) {
      console.log(error.response || error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-5">Loading profile...</p>;
  }

  if (!profile) {
    return <p className="text-center mt-5">Data profile tidak ditemukan 😢</p>;
  }

  return (
    <div className="profile-page">
      <MyNavbar />

      <div className="profile-container">
        <div className="profile-card">
          <div className="avatar-circle">
            {profile.nama_mahasantri?.charAt(0).toUpperCase()}
          </div>

          <h3>{profile.nama_mahasantri}</h3>
          <p className="text-muted">@{profile.username}</p>

          <div className="profile-info">
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
              <p>{profile.nohp}</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilUser;
