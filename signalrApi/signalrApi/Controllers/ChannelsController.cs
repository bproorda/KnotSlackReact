using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using signalrApi.Data;
using signalrApi.Models;
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


        public ChannelsController(knotSlackDbContext context, IChannelRepository channelRepository, IUserChannelRepository userChannelRepository)
        {
           this._context = context;
           this.channelRepository = channelRepository;
           this.userChannelRepository = userChannelRepository;
        }

        // GET: api/Channels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Channel>>> GetChannel()
        {
            return await _context.Channel.ToListAsync();
        }

        // GET: api/Channels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Channel>> GetChannel(string id)
        {
            var channel = await _context.Channel.FindAsync(id);

            if (channel == null)
            {
                return NotFound();
            }

            return channel;
        }

        // PUT: api/Channels/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChannel(string id, Channel channel)
        {
            if (id != channel.Name)
            {
                return BadRequest();
            }

            _context.Entry(channel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChannelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Channels
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Channel>> PostChannel(Channel channel)
        {
            
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
