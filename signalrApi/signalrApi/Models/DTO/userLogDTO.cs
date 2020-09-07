using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace signalrApi.Models.DTO
{
    public class userLogDTO
    {
        public string Username { get; set; }

        public string[] Channels { get; set; }
    }
}
