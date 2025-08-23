using api.Models;
using Microsoft.EntityFrameworkCore;

public class DatabaseContext(DbContextOptions<DatabaseContext> options) : DbContext(options)
{
    public DbSet<Post> Posts { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<Attachment> Attachments { get; set; }

    // Optional: Override OnModelCreating for advanced model configuration
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configure entity properties, relationships, etc.
    }
}
