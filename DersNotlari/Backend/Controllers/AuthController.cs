using Backend.Data;
using Backend.DTO;
using Backend.Helpers;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UygulamaDbContext _context;
        private readonly JwtHelper _jwtHelper;

        public AuthController(UygulamaDbContext context, JwtHelper jwtHelper)
        {
            _context = context;
            _jwtHelper = jwtHelper;
        }

        [HttpPost("kayit")]
        public async Task<IActionResult> Kayit(KullaniciKayitDto dto)
        {
            if (await _context.Kullanicilar.AnyAsync(k => k.KullaniciAdi == dto.KullaniciAdi))
                return BadRequest("Bu kullanıcı adı zaten kayıtlı.");

            var kullanici = new Kullanici
            {
                KullaniciAdi = dto.KullaniciAdi,
                SifreHash = SifreHelper.HashOlustur(dto.Sifre)
            };

            _context.Kullanicilar.Add(kullanici);
            await _context.SaveChangesAsync();

            return Ok("Kayıt başarılı.");
        }

        [HttpPost("giris")]
        public async Task<IActionResult> Giris(KullaniciGirisDto dto)
        {
            var kullanici = await _context.Kullanicilar.FirstOrDefaultAsync(k => k.KullaniciAdi == dto.KullaniciAdi);
            if (kullanici == null)
                return Unauthorized("Kullanıcı bulunamadı.");

            if (!SifreHelper.SifreKontrol(dto.Sifre, kullanici.SifreHash))
                return Unauthorized("Şifre yanlış.");

            var token = _jwtHelper.TokenOlustur(kullanici.Id, kullanici.KullaniciAdi);

            return Ok(new KullaniciTokenDto { Token = token, KullaniciAdi = kullanici.KullaniciAdi });
        }
    }
}
