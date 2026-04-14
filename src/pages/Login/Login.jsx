import { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import phoneImg from "../../assets/figure-hero-image.webp";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/login", {
        username,
        password,
      });

      console.log("Response", response.data);
      const token = response.data.data.token;
      const decoded = jwtDecode(token);

      localStorage.setItem("token", token);
      if (decoded.role === "user") {
        navigate("/home", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.role === "user") {
        navigate("/home", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    }
  }, []);

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-left">
          <img src={phoneImg} alt="preview" />
        </div>

        <div className="login-right">
          <div className="from-wrapper">
            <h3>Selamat Datang</h3>
            <h1>
              <span>PeTiK Book</span>
            </h1>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="login-field">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  placeholder="Masukan Username...."
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  required
                  autoFocus
                />
              </div>

              <div className="login-field">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="Masukan Password...."
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </div>

              <button className="btn-login" type="submit">
                Masuk
              </button>
            </form>

            <p className="footer-text">
              Don't have an account? <span>Call Admin</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
