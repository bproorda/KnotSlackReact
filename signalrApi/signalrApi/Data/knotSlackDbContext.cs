using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using signalrApi.Models;
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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserChannel>()
                .HasKey(uc => new { uc.UserId, uc.ChannelName });

        }
        public DbSet<ksUser> ksUser { get; set; }
        public DbSet<Channel> Channel { get; set; }
        public DbSet<UserChannel> UserChannels { get; set; }
        public DbSet<Message> Messages { get; set; }
    }
}
