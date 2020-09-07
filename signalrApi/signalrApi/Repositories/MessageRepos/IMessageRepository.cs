using signalrApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace signalrApi.Repositories.MessageRepos
{
    public interface IMessageRepository
    {
        Task<IEnumerable<Message>> GetMessagesByRecipient(string Recipient );
        Task<IEnumerable<Message>> GetMessagesBySender(string User);

        Task<IEnumerable<Message>> GetPrivateMessages(string UserA, string UserB);

        Task<bool> CreateNewMessage(Message message);

        Task<Message> GetOneMessage(int id);
        Task<Message> DeleteMessage(int id);
    }
}
