#  Ders Notları Yönetim Sistemi

Bu proje, kullanıcıların kendi hesaplarıyla giriş yaparak ders notlarını yönetebilecekleri bir sistem sunmayı amaçlamaktadır.

---

## Proje Amacı

Kullanıcılar, sisteme giriş yaptıktan sonra ders notlarını:

-  Listeleyebilir  
-  Yeni not ekleyebilir (dosya yükleme destekli)  
-  Mevcut notları güncelleyebilir  
-  Notları silebilir (soft delete)  
-  Arşivden kalıcı olarak silebilir (hard delete)

---

##  Kullanıcı Yetkilendirme ve Kimlik Doğrulama

- Her kullanıcı yalnızca kendi notlarına erişebilir ve işlem yapabilir.

---

##  Ders Notları Özellikleri

- **Not Ekleme:**
  - Ders Adı
  - Açıklama
  - Dosya (PDF, Word vb.)
  - Eklenme Tarihi (otomatik)
  - Güncellenme Tarihi (otomatik)

- **Not Listeleme:**
  - Giriş yapan kullanıcıya ait notlar listelenir

- **Not Güncelleme:**
  - Ders bilgileri ve dosya güncellenebilir

- **Soft Delete (Silme):**
  - `deleted_at` alanı işaretlenir
  - Notlar arşiv bölümünde tutulur

- **Hard Delete (Kalıcı Silme):**
  - `deleted_at` işaretli notlar tamamen silinir

---

##  Kullanılan Teknolojiler

###  Frontend

- React.js (isteğe bağlı Next.js)
- Tailwind CSS veya Material UI

###  Backend

- ASP.NET Core Web API
- Entity Framework Core

### Veritabanı

- Microsoft SQL Server
- Migration yapısı ile veri tabanı kurulumu
- Örnek veriler için Seeder dosyası

---

