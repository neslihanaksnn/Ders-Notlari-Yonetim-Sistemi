import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../css/NoteDetail.css";

const NoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [formData, setFormData] = useState({
    dersAdi: "",
    aciklama: "",
    dosyaYolu: "",
  });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    api.get(`/notlar`).then((res) => {
      const selected = res.data.find((n) => n.id === parseInt(id));
      if (selected) {
        setNote(selected);
        setFormData({
          dersAdi: selected.dersAdi,
          aciklama: selected.aciklama,
          dosyaYolu: selected.dosyaYolu || "",
        });
      } else {
        alert("Not bulunamadı.");
        navigate("/notlarim");
      }
    });
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Dosya seçin.");

    const formDataFile = new FormData();
    formDataFile.append("file", file);

    setUploading(true);
    try {
      const res = await api.post("/notlar/upload", formDataFile, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFormData(prev => ({ ...prev, dosyaYolu: res.data.filePath }));
      alert("Dosya yüklendi.");
    } catch (error) {
      alert("Dosya yükleme başarısız.");
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = () => {
    api.put(`/notlar/${id}`, {
      DersAdi: formData.dersAdi,
      Aciklama: formData.aciklama,
      DosyaYolu: formData.dosyaYolu,
    })
    .then(() => alert("Not güncellendi."))
    .catch(() => alert("Güncelleme hatası"));
  };

  const handleDelete = () => {
    if (window.confirm("Dosya arşive taşınacak. Emin misin?")) {
      api.delete(`/notlar/${id}`)
        .then(() => {
          alert("Dosya arşive taşındı.");
          navigate("/notlarim");
        });
    }
  };

  const handleFileDelete = () => {
    if (window.confirm("Dosyayı silmek istediğinize emin misiniz?")) {
      setFormData(prev => ({ ...prev, dosyaYolu: "" }));
      // You might also want to call an API to delete the file from the server
    }
  };

  if (!note) return <p>Yükleniyor...</p>;

  return (
    <div className="note-detail-container">
      <h2>Ders: {note.dersAdi}</h2>

      <label htmlFor="dersAdi">Ders Adı:</label>
      <input
        id="dersAdi"
        name="dersAdi"
        value={formData.dersAdi}
        onChange={handleChange}
      />

      <label htmlFor="aciklama">Açıklama:</label>
      <textarea
        id="aciklama"
        name="aciklama"
        value={formData.aciklama}
        onChange={handleChange}
      />

      {formData.dosyaYolu ? (
        <div className="file-section">
          <label>Mevcut Dosya:</label>
          <p>
            <a href={formData.dosyaYolu} target="_blank" rel="noreferrer">
              {formData.dosyaYolu.split('/').pop()} {/* Show just the filename */}
            </a>
          </p>
          <div className="file-actions">
            <button 
              onClick={handleFileDelete} 
              className="delete-file-btn"
            >
              Dosyayı Sil
            </button>
          </div>
        </div>
      ) : (
        <div className="file-upload-section">
          <label>Dosya Yükle:</label>
          <input type="file" onChange={handleFileChange} />
          <button 
            onClick={handleUpload} 
            disabled={uploading}
            className="upload-btn"
          >
            {uploading ? "Yükleniyor..." : "Yükle"}
          </button>


        </div>
        
      )}

      <div className="button-group">
        <button onClick={handleUpdate} className="update-btn">Güncelle</button>
      </div>
    </div>
  );
};

export default NoteDetail;