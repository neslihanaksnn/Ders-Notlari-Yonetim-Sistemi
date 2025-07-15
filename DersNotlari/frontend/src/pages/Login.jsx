import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authServices";
import "../css/login.css";
import AtaturkLogo from '../images/Ataturkuni_logo.png';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginUser({ KullaniciAdi: username, Sifre: password });
      
      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/notlarim");
      } else {
        setError("Geçersiz yanıt: Token alınamadı");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Kullanıcı adı veya şifre hatalı");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-box">
          <img src={AtaturkLogo} alt="Atatürk Üniversitesi Logosu" className="login-logo" />

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <span className="input-icon">👤</span>
              <input
                type="text"
                placeholder="Kullanıcı Adı"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            
            <div className="input-group">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                placeholder="Şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;