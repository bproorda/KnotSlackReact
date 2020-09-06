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

        public Task<bool> DeleteMessage(Message message)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Message>> GetMessagesByRecipient(string Recipient)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Message>> GetMessagesBySender(string User)
        {
            throw new NotImplementedException();
        }

        public Task<Message> GetOneMessage(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Message>> GetPrivateMessages(string UserA, string UserB)
        {
            throw new NotImplementedException();
        }
    }
}
