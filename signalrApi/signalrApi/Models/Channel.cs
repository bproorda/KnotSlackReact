using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace signalrApi.Models
{
    public class Channel
    {
        [Key]
        [Required]
        public string Name { get; set; }

        public List<string> Members { get; set; }

    }
}
