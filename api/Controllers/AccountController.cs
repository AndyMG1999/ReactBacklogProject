using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Contexts;
using api.Dtos;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/account")]
    public class AccountController : Controller
    {
        DatabaseContext _context;
        UserManager<AppUser> _userManager;
        SignInManager<AppUser> _signInManager;

        public AccountController(DatabaseContext databaseContext, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
        {
            _context = databaseContext;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser(RegisterUserDto registerUserDto)
        {
            AppUser newUser = new AppUser { UserName = registerUserDto.UserName, Email = registerUserDto.Email };
            var createdUser = await _userManager.CreateAsync(newUser, registerUserDto.Password);
            if (createdUser.Succeeded) return Ok();
            return BadRequest();
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUser(LoginUserDto loginUserDto)
        {
            AppUser? user = await _userManager.FindByEmailAsync(loginUserDto.Email);
            if (user == null) return Unauthorized("Invalid Username or Password");

            var result = await _signInManager.PasswordSignInAsync(user, loginUserDto.Password, false, false);
            if (!result.Succeeded) return Unauthorized("Invalid Username or Password");

            UserInfoDto userInfo = new UserInfoDto { Email = user.Email, UserName = user.UserName, PhoneNumber = user.PhoneNumber, EmailConfirmed = user.EmailConfirmed };
            return Ok(userInfo);
        }

        [HttpPost("logout")]
        public async Task<IActionResult> LogoutUser()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }
    }
}