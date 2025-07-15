import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../css/dashboard.css";  // İstersen ayrı css ismi de verebilirsin

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/notlar")
      .then((res) => setNotes(res.data))
      .catch((err) => console.error("Notlar alınamadı:", err));
  }, []);

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
              <td colSpan="5" style={{ textAlign: "center" }}>
                Not bulunamadı
              </td>
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
                    >
                      Dosya
                    </a>
                  ) : (
                    "Yok"
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

export default NotesList;
