using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace signalrApi.Models.DTO
{
    public class messageCreateDTO
    {
        public string Sender { get; set; }

        public string Recipient { get; set; }

        public string Contents { get; set; }
    }
}
