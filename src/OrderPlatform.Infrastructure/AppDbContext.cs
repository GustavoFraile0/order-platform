using Microsoft.EntityFrameworkCore;
using OrderPlatform.Domain;

namespace OrderPlatform.Infrastructure;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Product> Products => Set<Product>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>(e =>
        {
            e.HasKey(p => p.Id);
            e.Property(p => p.Sku).HasMaxLength(40);
            e.Property(p => p.Name).HasMaxLength(200);
            e.Property(p => p.UnitPrice).HasColumnType("decimal(12,2)");
        });
    }
}