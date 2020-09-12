using signalrApi.Data;
using signalrApi.Models;
using signalrApi.Models.DTO;
using signalrApi.services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace signalrApi.Repositories.ChannelRepos
{
    public class ChannelRepository : IChannelRepository
    {
        private knotSlackDbContext _context;
        private IUserManager userManager;

        public ChannelRepository(knotSlackDbContext _context, IUserManager userManager)
        {
            this._context = _context;
            this.userManager = userManager;
        }

        public async Task<Channel> CreateNewChannel(createChannelDTO input)
        {
            Channel newChannel = new Channel
            {
                Name = input.name,
                Type = input.type,

            };

            _context.Channel.Add(newChannel);
            await _context.SaveChangesAsync();

            return newChannel;
        }

        public async Task<List<string>> GetMyChannels(string username)
        {
            var user = await userManager.FindByNameAsync(username);

            List<string> channels = new List<string>();

            user.UserChannels.ForEach(uc => channels.Add(uc.ChannelName));

            return channels;

        }
    }
}
