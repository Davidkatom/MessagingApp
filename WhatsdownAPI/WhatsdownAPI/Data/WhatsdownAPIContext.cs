using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WhatsdownAPI;
using WhatsdownAPI.Models;

namespace WhatsdownAPI.Data
{
    public class WhatsdownAPIContext : DbContext
    {
        public WhatsdownAPIContext (DbContextOptions<WhatsdownAPIContext> options)
            : base(options)
        {
        }

        public DbSet<WhatsdownAPI.Contact>? Contact { get; set; }

        public DbSet<WhatsdownAPI.Models.User>? User { get; set; }
    }
}
