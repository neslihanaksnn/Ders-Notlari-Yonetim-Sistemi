namespace Backend.Models
{
   public class Kullanici
    {
        public int Id { get; set; }
        public string KullaniciAdi { get; set; }
        public string SifreHash { get; set; }

        public ICollection<Not> Notlar { get; set; }
    }
 
}
