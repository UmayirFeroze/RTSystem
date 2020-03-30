using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using RTSystem.Data;

namespace RTSystem.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private IUserService _service;
        public UserController(IUserService service)
        {
            this._service = service;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody]AuthenticateModel model)
        {
            try
            {
                var user = await _service.Authenticate(model);
                if (user == null)
                {
                    return BadRequest();
                }
                return Ok(user);
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