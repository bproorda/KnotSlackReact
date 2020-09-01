using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using signalrApi.Data;
using signalrApi.Models.DTO;
using signalrApi.services;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace signalrApi.Hubs
{
    public class ChatHub : Hub
    {
        private knotSlackDbContext _context;

        private readonly IUserManager userManager;

        public ChatHub(knotSlackDbContext _context, IUserManager userManager)
        {
            this._context = _context;
            this.userManager = userManager;
        }

        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public async Task DisplayUsers()
        {
            var users = _context.Users
                .Where(user => user.LoggedIn)
                .Select(user => new userDTO
                {
                    Username = user.Email
                }).ToList();


            await Clients.All.SendAsync("ShowUsers", users.ToArray());
        }

        //public async Task RemoveUser(string user)
        //{
        //    Users.Remove(Users.Find(x => x == user));

        //    await Clients.All.SendAsync("ShowUsers", Users.ToArray());
        //}
    }
}
