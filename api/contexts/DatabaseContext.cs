using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Contexts
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions dbContextOptions)
        : base(dbContextOptions)
        {

        }

        public DbSet<Post> Posts { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Attachment> Attachments { get; set; }
    }
    
}
