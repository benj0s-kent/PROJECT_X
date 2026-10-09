using Microsoft.EntityFrameworkCore;

namespace Kent.Api.Data;

public class KentDbContext : DbContext
{
    public KentDbContext(DbContextOptions<KentDbContext> options)
        : base(options)
    {
    }
}