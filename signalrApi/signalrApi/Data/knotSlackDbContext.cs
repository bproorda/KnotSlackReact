using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using signalrApi.Models.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace signalrApi.Data
{
    public class knotSlackDbContext : IdentityDbContext<ksUser>
    {
        public knotSlackDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<ksUser> ksUser { get; set; }
    }
}
