using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Text;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using RTSystem.Data;
using RTSystem.Helpers;

namespace RTSystem.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private IUserService _service;
        private readonly AppSettings _appSettings;
        public UserController(IUserService service, IOptions<AppSettings> appSettings)
        {
            this._service = service;
            this._appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]AuthenticateModel model)
        {
            try
            {
                var user = _service.Authenticate(model);
                
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.Name, user.userId.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);

                return Ok(new
                {
                    UserId = user.userId,
                    Email = user.email,
                    Token = tokenString
                });
            }
            catch (Exception authException)
            {
                return BadRequest(authException.Message);
            }

        }

        [HttpGet("GetUsers")]
        public IActionResult GetAllUsers()
        {
            try
            {
                var allUsers = _service.GetAllUsers();
                return Ok(allUsers);
            }
            catch (Exception getalluserError)
            {
                return BadRequest(getalluserError.Message);
            }
        }
        [Authorize]
        [HttpGet("GetUsers/{userId}")]
        public IActionResult GetUser(int userId)
        {
            try
            {
                var user = _service.GetUserById(userId);
                return Ok(user);
            }
            catch (Exception getUserError)
            {
                return NotFound(getUserError.Message);
            }
        }

        [HttpPost("RegisterUser")]
        public IActionResult RegisterUser([FromBody]User user)
        {
            try
            {
                if (user != null)
                {
                    _service.RegisterUser(user);
                }
                return Ok(user);
            }
            catch (Exception resgisterError)
            {
                return BadRequest(resgisterError.Message);
            }
        }
        [Authorize]
        [HttpPut("UpdateUser/{userId}")]
        public IActionResult UpdateUser(int userId, [FromBody]User user)
        {
            try
            {
                _service.UpdateUser(userId, user);
                return Ok(user);
            }
            catch (Exception updateUserError)
            {
                return Conflict(updateUserError.Message);
            }

        }
        [Authorize]
        [HttpDelete("DeleteUser/{userId}")]
        public IActionResult DeleteUser(int userId)
        {
            try
            {
                _service.DeleteUser(userId);
                return Ok("Successfully Deleted User");
            }
            catch (Exception deleteUserError)
            {
                return NotFound(deleteUserError.Message);
            }

        }
    }
};