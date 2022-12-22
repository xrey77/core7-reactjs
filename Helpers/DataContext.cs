using Microsoft.EntityFrameworkCore;
// using Microsoft.Extensions.Configuration;
using core7_reactjs.Entities;

namespace core7_reactjs.Helpers
{
    public class DataContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public DataContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to sql server database
            options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
        }

        public DbSet<User> User { get; set; }
        // public DbSet<Contact> Contacts {get; set;}
        // public DbSet<CompanyServices> TServices { get; set; }
    }
}
