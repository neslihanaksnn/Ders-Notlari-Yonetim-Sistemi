namespace Backend.Models
{
    public class Not
    {
        public int Id { get; set; }
        public int KullaniciId { get; set; }

        // Navigation property ekle
        public Kullanici Kullanici { get; set; }

        public string DersAdi { get; set; }
        public string Aciklama { get; set; }
        public string DosyaYolu { get; set; }
        public DateTime EklenmeTarihi { get; set; }
        public DateTime? GuncellenmeTarihi { get; set; }
        public DateTime? DeletedAt { get; set; }
    }
}
