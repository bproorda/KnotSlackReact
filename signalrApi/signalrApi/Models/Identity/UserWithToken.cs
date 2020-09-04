using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace signalrApi.Models.Identity
{
    public class UserWithToken
    {
        public string UserId { get; set; }
        public string Token { get; set; }
    }
}
