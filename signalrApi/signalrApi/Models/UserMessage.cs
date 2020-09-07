using signalrApi.Models.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace signalrApi.Models
{
    public class UserMessage
    {
        public string UserId { get; set; }

        public ksUser User { get; set; }

        public int MessageId { get; set; }

        public Message Message { get; set; }
    }
}
