using Microsoft.EntityFrameworkCore;
using signalrApi.Data;
using signalrApi.Models;
using signalrApi.Models.Identity;
using signalrApi.Repositories.UserChannelRepos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace signalrApi.Repositories.MessageRepos
{
    public class MessageRepository : IMessageRepository
    {
        private knotSlackDbContext _context;
        private IUserChannelRepository userChannelRepository;

        public MessageRepository(knotSlackDbContext _context, IUserChannelRepository userChannelRepository)
        {
            this._context = _context;
            this.userChannelRepository = userChannelRepository;
        }
        public async Task<bool> CreateNewMessage(Message message)
        {
            _context.Messages.Add(message);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Message> DeleteMessage(int id)
        {
            Message msg = await GetOneMessage(id);

            _context.Messages.Remove(msg);
            await _context.SaveChangesAsync();
            return msg;
            
        }

        public async Task<bool> DeleteMessagesBySender(string username)
        {
            var messages = await GetMessagesBySender(username);
            messages.ForEach( msg => _context.Messages.Remove(msg));
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<Message>> GetMessagesByRecipient(string Recipient)
        {
            var messages = await _context.Messages
                .Where(msg => Recipient == msg.Recipient)
                .ToListAsync();

            return messages;
        }

        public async Task<List<Message>> GetMessagesBySender(string User)
        {
            var messages = await _context.Messages
                .Where(msg => User == msg.Sender)
                .ToListAsync();

            return messages;
        }

        public async Task<IEnumerable<Message>> GetMyMessages(ksUser User)
        {
            var channels = await userChannelRepository.GetUserChannels(User);

            var messages = await _context.Messages
                .Where(msg => User.UserName == msg.Sender 
                || User.UserName == msg.Recipient
                || channels.Contains(msg.Recipient))
                .ToListAsync();

            return messages;
        }

        public async Task<Message> GetOneMessage(int id)
        {
            var message = await _context.Messages
                .Select(msg => new Message
                {
                    Id = msg.Id,
                    Sender = msg.Sender,
                    Recipient = msg.Recipient,
                    Date = msg.Date,
                    Contents = msg.Contents,
                    UserId = msg.UserId,

                }).FirstOrDefaultAsync(msg => id == msg.Id);

            return message;
        }

        public async Task<IEnumerable<Message>> GetPrivateMessages(string UserA, string UserB)
        {
            var messages = await _context.Messages
                .Where(msg => (UserA == msg.Sender || UserA == msg.Recipient) 
                &&
                (UserB == msg.Sender || UserB == msg.Recipient))
                .ToListAsync();

            return messages;
        }
    }
}
