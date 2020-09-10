using signalrApi.Models.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace signalrApi.Models
{
    //Join Table for Many to Many relationships
    public class UserChannel
    {
        public string UserId { get; set; }

        public ksUser User { get; set; }

        public string ChannelName { get; set; }

        public Channel Channel { get; set; }
    }
}
