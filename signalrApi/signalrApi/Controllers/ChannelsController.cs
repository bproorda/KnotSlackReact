using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using signalrApi.Data;
using signalrApi.Models;
using signalrApi.Models.DTO;
using signalrApi.Repositories.ChannelRepos;
using signalrApi.Repositories.UserChannelRepos;

namespace signalrApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChannelsController : ControllerBase
    {
        private readonly knotSlackDbContext _context;
        private IChannelRepository channelRepository;
        private IUserChannelRepository userChannelRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;


        public ChannelsController(knotSlackDbContext context, IChannelRepository channelRepository, IUserChannelRepository userChannelRepository, IHttpContextAccessor _httpContextAccessor)
        {
           this._context = context;
           this.channelRepository = channelRepository;
           this.userChannelRepository = userChannelRepository;
            this._httpContextAccessor = _httpContextAccessor;
        }



        // POST: api/Channels
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Channel>> PostChannel(createChannelDTO input)
        {
            var newChannel = await channelRepository.CreateNewChannel(input);
            var username = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            await userChannelRepository.AddUserToChannel(username, input.name);

            return newChannel;
        }

        [HttpPost("mychannels")]
        public async Task<IEnumerable<string>> MyChannels(userDTO input)
        {
            var channels = await channelRepository.GetMyChannels(input.Username);

            return channels;
        }

        [HttpPost("newuc")]
        public async Task<UserChannel> AddToChannel(ucDTO input)
        {
            var thisChannel = await userChannelRepository.AddUserToChannel(input.Username, input.ChannelName);

            return thisChannel;
        }

        [HttpPost("olduc")]
        public async Task<UserChannel> RemoveFromChannel(ucDTO input)
        {
            var thisChannel = await userChannelRepository.RemoveUserFromChannel(input.Username, input.ChannelName);

            return thisChannel;
        }

        // DELETE: api/Channels/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Channel>> DeleteChannel(string id)
        {
            var channel = await _context.Channel.FindAsync(id);
            if (channel == null)
            {
                return NotFound();
            }

            _context.Channel.Remove(channel);
            await _context.SaveChangesAsync();

            return channel;
        }

        private bool ChannelExists(string id)
        {
            return _context.Channel.Any(e => e.Name == id);
        }
    }
}
