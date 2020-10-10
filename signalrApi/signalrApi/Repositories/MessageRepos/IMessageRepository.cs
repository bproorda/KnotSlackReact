using signalrApi.Models;
using signalrApi.Models.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace signalrApi.Repositories.MessageRepos
{
    public interface IMessageRepository
    {
        Task<List<Message>> GetMessagesByRecipient(string Recipient );
        Task<List<Message>> GetMessagesBySender(string User);
        Task<IEnumerable<Message>> GetMyMessages(ksUser User);

        Task<IEnumerable<Message>> GetPrivateMessages(string UserA, string UserB);

        Task<bool> CreateNewMessage(Message message);

        Task<Message> GetOneMessage(int id);
        Task<Message> DeleteMessage(int id);
        Task<bool> DeleteMessagesBySender(string username);

    }
}
