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
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _service;
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
                        new Claim(ClaimTypes.Name, user.UserId.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);

                return Ok(new
                {
                    UserId = user.UserId,
                    Email = user.Email,
                    Token = tokenString
                });
            }
            catch (Exception authException)
            {
                return BadRequest(authException.Message);
            }

        }

        [AllowAnonymous]
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

        [HttpGet("GetUsers/{userId}")]
        [AllowAnonymous]
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
        [AllowAnonymous]
        public IActionResult RegisterUser([FromBody]Users user)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest("Please Enter Valid Data");
                }

                _service.RegisterUser(user);
                return Ok(user);
            }
            catch (Exception resgisterError)
            {
                return BadRequest(resgisterError.Message);
            }
        }

        [HttpPut("UpdateUser/{userId}")]

        public IActionResult UpdateUser(int userId, [FromForm]UserUpdateModel user)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }

                _service.UpdateUser(userId, user);
                return Ok(_service.GetUserById(userId));
            }
            catch (Exception updateUserError)
            {
                return Conflict(updateUserError.Message);
            }

        }
        [AllowAnonymous]
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