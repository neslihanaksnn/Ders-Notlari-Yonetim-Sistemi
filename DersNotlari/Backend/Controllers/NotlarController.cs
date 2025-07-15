using Backend.Data;
using Backend.DTO;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class NotlarController : ControllerBase
    {
        private readonly UygulamaDbContext _context;

        public NotlarController(UygulamaDbContext context)
        {
            _context = context;
        }

        // GET: api/notlar
        [HttpGet]
        public async Task<IActionResult> GetNotlar()
        {
            var kullaniciId = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
            if (kullaniciId == null)
                return Unauthorized();

            var notlar = await _context.Notlar
                .Where(n => n.KullaniciId == int.Parse(kullaniciId) && n.DeletedAt == null)
                .ToListAsync();

            return Ok(notlar);
        }

        // POST: api/notlar
        [HttpPost]
        public async Task<IActionResult> NotEkle(NotEkleDto dto)
        {
            var kullaniciId = int.Parse(User.Claims.First(c => c.Type == "id").Value);

            var not = new Not
            {
                DersAdi = dto.DersAdi,
                Aciklama = dto.Aciklama,
                DosyaYolu = dto.DosyaYolu,
                KullaniciId = kullaniciId,
                EklenmeTarihi = DateTime.Now
            };

            _context.Notlar.Add(not);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetNotlar), new { id = not.Id }, not);
        }

        // PUT: api/notlar/{id}
        [HttpPut("{id}")]
            public async Task<IActionResult> NotGuncelle(int id, NotEkleDto dto)
            {
                var kullaniciId = int.Parse(User.Claims.First(c => c.Type == "id").Value);

                var not = await _context.Notlar
                    .FirstOrDefaultAsync(n => n.Id == id && n.KullaniciId == kullaniciId && n.DeletedAt == null);

                if (not == null)
                    return NotFound("Not bulunamadı veya erişim yok.");

                not.DersAdi = dto.DersAdi;
                not.Aciklama = dto.Aciklama;
                not.DosyaYolu = dto.DosyaYolu; // Buraya upload’dan gelen filePath gelecek
                not.GuncellenmeTarihi = DateTime.Now;

                await _context.SaveChangesAsync();

                return Ok(not);
            }


        // DELETE: api/notlar/{id} (Soft Delete)
        [HttpDelete("{id}")]
        public async Task<IActionResult> SoftDelete(int id)
        {
            var kullaniciId = int.Parse(User.Claims.First(c => c.Type == "id").Value);

            var not = await _context.Notlar
                .FirstOrDefaultAsync(n => n.Id == id && n.KullaniciId == kullaniciId && n.DeletedAt == null);

            if (not == null)
                return NotFound("Not bulunamadı veya zaten silinmiş.");

            not.DeletedAt = DateTime.Now;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/notlar/arsiv (Soft Delete edilen notları listeler)
        [HttpGet("arsiv")]
        public async Task<IActionResult> ArsivGetir()
        {
            var kullaniciId = int.Parse(User.Claims.First(c => c.Type == "id").Value);

            var arsivNotlar = await _context.Notlar
                .Where(n => n.KullaniciId == kullaniciId && n.DeletedAt != null)
                .ToListAsync();

            return Ok(arsivNotlar);
        }

        // DELETE: api/notlar/arsivden-sil/{id} (Hard Delete)
        [HttpDelete("arsivden-sil/{id}")]
        public async Task<IActionResult> HardDelete(int id)
        {
            var kullaniciId = int.Parse(User.Claims.First(c => c.Type == "id").Value);

            var not = await _context.Notlar
                .FirstOrDefaultAsync(n => n.Id == id && n.KullaniciId == kullaniciId && n.DeletedAt != null);

            if (not == null)
                return NotFound("Not bulunamadı veya arşivde değil.");

            _context.Notlar.Remove(not);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("upload")]
            [AllowAnonymous]
            public async Task<IActionResult> UploadFile(IFormFile file)
            {
                if (file == null || file.Length == 0)
                    return BadRequest("Dosya yok.");

                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");

                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                var fileUrl = $"{Request.Scheme}://{Request.Host}/uploads/{uniqueFileName}";
                return Ok(new { filePath = fileUrl });
            }

    }
}
