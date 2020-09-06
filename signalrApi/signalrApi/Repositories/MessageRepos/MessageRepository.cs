using Microsoft.EntityFrameworkCore;
using signalrApi.Data;
using signalrApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace signalrApi.Repositories.MessageRepos
{
    public class MessageRepository : IMessageRepository
    {
        private knotSlackDbContext _context;

        public MessageRepository(knotSlackDbContext _context)
        {
            this._context = _context;
        }
        public async Task<bool> CreateNewMessage(Message message)
        {
            _context.Messages.Add(message);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteMessage(int id)
        {
            Message msg = await GetOneMessage(id);

            _context.Messages.Remove(msg);
            await _context.SaveChangesAsync();
            return true;
            
        }

        public async Task<IEnumerable<Message>> GetMessagesByRecipient(string Recipient)
        {
            var messages = await _context.Messages
                .Where(msg => Recipient == msg.Recipient)
                .ToListAsync();

            return messages;
        }

        public async Task<IEnumerable<Message>> GetMessagesBySender(string User)
        {
            var messages = await _context.Messages
                .Where(msg => User == msg.Sender)
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

        public Task<IEnumerable<Message>> GetPrivateMessages(string UserA, string UserB)
        {
            throw new NotImplementedException();
        }
    }
}
