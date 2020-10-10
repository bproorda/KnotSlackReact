using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace signalrApi.Models.Identity
{
    public class ksUser : IdentityUser
    {

        public bool LoggedIn { get; set; }

        public DateTime LastVisited { get; set; }

        public string ConnectionId {get; set;}

        // Nav Prop for Many to Many/One to Many Relationships
        public List<UserChannel> UserChannels { get; set; }

        public List<UserMessage> UserMessages { get; set; }
    }
}
