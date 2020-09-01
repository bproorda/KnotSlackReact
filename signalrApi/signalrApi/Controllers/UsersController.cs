using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using signalrApi.Hubs;
using signalrApi.Models.Identity;
using signalrApi.services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace signalrApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserManager userManager;
        private ChatHub chatHub;

        public UsersController(IUserManager userManager, ChatHub chatHub)
        {
            this.userManager = userManager;
            this.chatHub = chatHub;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginData login)
        {
            var user = await userManager.FindByNameAsync(login.UserName);
            if (user != null)
            {
                var result = await userManager.CheckPasswordAsync(user, login.Password);
                if (result)
                {
                    user.LoggedIn = true;
                    await chatHub.DisplayUsers();
                    return Ok(new UserWithToken
                    {
                        UserId = user.Id,
                        Token = userManager.CreateToken(user)

                    });
                }

                await userManager.AccessFailedAsync(user);
            }
            return Unauthorized();
        }

        //To update LoggedIn prop in db
        [HttpPost("Logout")]
        public async Task<IActionResult> Logout(string UserName)
        {
            var user = await userManager.FindByNameAsync(UserName);
            if (user != null)
            {
                user.LoggedIn = false;
                await chatHub.DisplayUsers();
                return Ok();

            }
            return Unauthorized();
        }

        [HttpPost("Register")]

        public async Task<IActionResult> Register(RegisterData register)
        {
            var user = new ksUser
            {
                Email = register.Email,
                UserName = register.Email,
                LoggedIn = true,

            };

            var result = await userManager.CreateAsync(user, register.Password);
            if (!result.Succeeded)
            {
                return BadRequest(new
                {
                    message = "registration failed",
                    errors = result.Errors
                });
            }

            return Ok(new UserWithToken
            {
                UserId = user.Id,
                Token = userManager.CreateToken(user)
            });


        }

        [Authorize]
        [HttpGet("Self")]
        public async Task<IActionResult> Self()
        {
            if (HttpContext.User.Identity is ClaimsIdentity identity)
            {
                var usernameClaim = identity.FindFirst("UserId");
                var userId = usernameClaim.Value;

                var user = await userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    return Unauthorized();
                }

                return Ok(new
                {
                    user.Email,

                });
            }
            return Unauthorized();
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUser(string userId)
        {
            var user = await userManager.FindByIdAsync(userId);
            if (user == null)
                return NotFound();

            return Ok(new
            {
                UserId = user.Id,
                user.Email,

            });
        }

        [HttpPut("userId")]

        public async Task<IActionResult> UpdateUser(string userId, ksUser data)
        {
            var user = await userManager.FindByIdAsync(userId);
            if (user == null)
                return NotFound();


            await userManager.UpdateAsync(user);

            return Ok(new
            {
                UserId = user.Id,
                user.Email,

            });
        }

    }
}
