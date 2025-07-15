using System.Security.Cryptography;
using System.Text;

namespace Backend.Helpers
{
    public static class SifreHelper
    {
        public static string HashOlustur(string sifre)
        {
            using var sha256 = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(sifre);
            var hash = sha256.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }

        public static bool SifreKontrol(string girilenSifre, string hash)
        {
            var girilenHash = HashOlustur(girilenSifre);
            return girilenHash == hash;
        }
    }
}
