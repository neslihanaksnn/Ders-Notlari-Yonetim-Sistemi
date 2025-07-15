using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data
{
    public class UygulamaDbContext : DbContext
    {
        public UygulamaDbContext(DbContextOptions<UygulamaDbContext> options) : base(options) {}

        public DbSet<Kullanici> Kullanicilar { get; set; }
        public DbSet<Not> Notlar { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Kullanici>()
                .HasMany(k => k.Notlar)
                .WithOne(n => n.Kullanici)
                .HasForeignKey(n => n.KullaniciId);
        }
    }
}
