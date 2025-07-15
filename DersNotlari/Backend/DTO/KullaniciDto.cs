namespace Backend.DTO
{
    public class KullaniciKayitDto
    {
        public string KullaniciAdi { get; set; }
        public string Sifre { get; set; }
    }

    public class KullaniciGirisDto
    {
        public string KullaniciAdi { get; set; }
        public string Sifre { get; set; }
    }

    public class KullaniciTokenDto
    {
        public string Token { get; set; }
        public string KullaniciAdi { get; set; }
    }
}
