using signalrApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace signalrApi.Repositories.UserChannelRepos
{
   public interface IUserChannelRepository
    {
        Task<UserChannel> AddUserToChannel(string username, string channel);

        Task<UserChannel> RemoveUserFromChannel(string username, string channel);
    }
}
