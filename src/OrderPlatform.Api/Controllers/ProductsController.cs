using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrderPlatform.Domain;
using OrderPlatform.Infrastructure;

namespace OrderPlatform.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _db;

    public ProductsController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken ct)
    {
        var products = await _db.Products
            .AsNoTracking()
            .OrderBy(p => p.Name)
            .ToListAsync(ct);

        return Ok(products);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id, CancellationToken ct)
    {
        var product = await _db.Products.FindAsync(new object[] { id }, ct);
        return product is null ? NotFound() : Ok(product);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Product product, CancellationToken ct)
    {
        _db.Products.Add(product);
        await _db.SaveChangesAsync(ct);
        return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, Product input, CancellationToken ct)
    {
        var product = await _db.Products.FindAsync(new object[] { id }, ct);
        if (product is null) return NotFound();

        product.Sku = input.Sku;
        product.Name = input.Name;
        product.UnitPrice = input.UnitPrice;
        product.StockQuantity = input.StockQuantity;
        product.ImageUrl = input.ImageUrl;

        await _db.SaveChangesAsync(ct);
        return NoContent();
    }

    [HttpPatch("{id:int}/toggle-status")]
    public async Task<IActionResult> ToggleStatus(int id, CancellationToken ct)
    {
        var product = await _db.Products.FindAsync(new object[] { id }, ct);
        if (product is null) return NotFound();

        product.IsActive = !product.IsActive;
        await _db.SaveChangesAsync(ct);

        return Ok(product);
    }

    [HttpPost("upload-image")]
    public async Task<IActionResult> UploadImage(IFormFile file)
    {
        if (file is null || file.Length == 0)
            return BadRequest("Nenhum arquivo enviado.");

        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".webp" };
        var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
        if (!allowedExtensions.Contains(extension))
            return BadRequest("Formato de imagem não suportado.");

        var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
        Directory.CreateDirectory(uploadsFolder);

        var fileName = $"{Guid.NewGuid()}{extension}";
        var filePath = Path.Combine(uploadsFolder, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        var relativeUrl = $"/uploads/{fileName}";
        return Ok(new { url = relativeUrl });
    }
}