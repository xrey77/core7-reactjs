using Microsoft.EntityFrameworkCore;

namespace core7_reactjs.Helpers
{
    public class SQLDataContext : DataContext
    {
        public SQLDataContext(IConfiguration configuration) : base(configuration) { }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
        }
    }
}