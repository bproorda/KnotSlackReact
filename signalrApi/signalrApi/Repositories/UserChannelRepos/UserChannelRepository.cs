using Microsoft.EntityFrameworkCore;
using signalrApi.Data;
using signalrApi.Models;
using signalrApi.Models.DTO;
using signalrApi.Models.Identity;
using signalrApi.services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace signalrApi.Repositories.UserChannelRepos
{
    public class UserChannelRepository : IUserChannelRepository
    {
        private knotSlackDbContext _context;
        private IUserManager userManager;

        public UserChannelRepository(knotSlackDbContext _context, IUserManager userManager)
        {
            this._context = _context;
            this.userManager = userManager;
        }

        public async Task<UserChannel> AddUserToChannel(string username, string channel)
        {
            var user = await userManager.FindByNameAsync(username);

            var newUC = new UserChannel
            {
                UserId = user.Id,
                ChannelName = channel,
            };

             _context.UserChannels.Add(newUC);
            await _context.SaveChangesAsync();

            return newUC;
        }

        public async Task<UserChannel> AddNewUserToGeneral(string username)
        {
            var user = await userManager.FindByNameAsync(username);

            var newUC = new UserChannel
            {
                UserId = user.Id,
                ChannelName = "General",
            };

            _context.UserChannels.Add(newUC);
            await _context.SaveChangesAsync();

            return newUC;
        }

        public async Task<UserChannel> RemoveUserFromChannel(string username, string channel)
        {
            var user = await userManager.FindByNameAsync(username);

            var uc = _context.UserChannels.Find(user.Id, channel);

            _context.Remove(uc);
            await _context.SaveChangesAsync();

            return uc;
        }

        public async Task<string[]> GetUserChannels(ksUser user)
        {
            var userChannels = await _context.UserChannels
                .Where(uc => uc.UserId == user.Id)
                .Select(uc => new ucDTO
                {
                    ChannelName = uc.ChannelName,
                }).ToListAsync();

            var middleMan = new List<string>();

            userChannels.ForEach(uc => middleMan.Add(uc.ChannelName));

            var output = middleMan.ToArray();

            return output;
        }
    }
}
