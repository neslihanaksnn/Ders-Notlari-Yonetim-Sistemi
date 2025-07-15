import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../css/dashboard.css"; 
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/notlar")
      .then((res) => setNotes(res.data))
      .catch((err) => console.error("Notlar alınamadı:", err));
  }, []);

  // Satır tıklanınca buradan yönlendirme yapılacak
  const handleRowClick = (id) => {
    navigate(`/notlarim/${id}`);
  };

  return (
    <div className="dashboard-container">
      <h2 style={{ textAlign: "center" }}>Ders Notlarım</h2>

      <table className="notes-table">
        <thead>
          <tr>
            <th>Ders Adı</th>
            <th>Açıklama</th>
            <th>Dosya</th>
            <th>Eklenme</th>
            <th>Güncelleme</th>
          </tr>
        </thead>
        <tbody>
          {notes.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>Not bulunamadı</td>
            </tr>
          ) : (
            notes.map((note) => (
              <tr
                key={note.id}
                style={{ cursor: "pointer" }}
                onClick={() => handleRowClick(note.id)}
              >
                <td>{note.dersAdi}</td>
                <td>{note.aciklama}</td>
                <td>
                  {note.dosyaYolu ? (
                    <a
                      href={note.dosyaYolu}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="file-link"
                    >
                      <span className="file-icon">📄</span>
                      {note.dosyaYolu.split('/').pop().slice(0, 15)}...
                    </a>
                  ) : (
                    <span className="no-file">Yok</span>
                  )}
                </td>
                <td>{new Date(note.eklenmeTarihi).toLocaleDateString()}</td>
                <td>
                  {note.guncellenmeTarihi
                    ? new Date(note.guncellenmeTarihi).toLocaleDateString()
                    : "-"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
