import { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import phoneImg from "../../assets/figure-hero-image.webp";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {
      username: "",
      password: "",
    };

    if (!username) {
      newErrors.username = "Username wajib diisi";
    }

    if (!password) {
      newErrors.password = "Password wajib diisi";
    }

    if (newErrors.username || newErrors.password) {
      setErrors(newErrors);
      toast.error("Semua field wajib diisi");
      return;
    }

    try {
      const response = await axios.post("/api/login", {
        username,
        password,
      });

      const token = response.data.data.token;
      const decoded = jwtDecode(token);

      localStorage.setItem("token", token);

      toast.success("Login berhasil");

      setTimeout(() => {
        if (decoded.role === "user") {
          navigate("/home", { replace: true });
        } else {
          navigate("/dashboard", { replace: true });
        }
      }, 1200);
    } catch (error) {
      const message = error.response?.data?.message;

      let newErrors = {
        username: "",
        password: "",
      };

      if (message === "Maaf, username tidak ditemukan") {
        newErrors.username = message;
        toast.error(message);
      } else if (message === "Maaf, Password salah") {
        newErrors.password = message;
        toast.error(message);
      } else {
        toast.error("Terjadi kesalahan pada server");
      }

      setErrors(newErrors);
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
          <div className="form-wrapper">
            <h3>Selamat Datang</h3>
            <h1>
              <span>PeTiK Book</span>
            </h1>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="login-field">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Masukan Username..."
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setErrors({ ...errors, username: "" });
                  }}
                  className={errors.username ? "input-error" : ""}
                />
                {errors.username && (
                  <p className="error-text">{errors.username}</p>
                )}
              </div>

              <div className="login-field">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Masukan Password..."
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors({ ...errors, password: "" });
                  }}
                  className={errors.password ? "input-error" : ""}
                />
                {errors.password && (
                  <p className="error-text">{errors.password}</p>
                )}
              </div>

              <button className="btn-login" type="submit">
                Masuk
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
