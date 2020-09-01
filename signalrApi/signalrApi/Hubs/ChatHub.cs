using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace signalrApi.Hubs
{
    public class ChatHub : Hub
    {
        private List<string> users;

        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public async Task AddUser(string user)
        {
            users.Add(user);

            await Clients.All.SendAsync("ShowUsers", users.ToArray());
        }

        public async Task RemoveUser(string user)
        {
            users.Remove(users.Find(x => x == user));

            await Clients.All.SendAsync("ShowUsers", users.ToArray());
        }
    }
}
