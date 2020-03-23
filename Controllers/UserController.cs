using System;
using Microsoft.AspNetCore.Mvc;
using RTSystem.Data;

namespace RTSystem.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private IUserService _service;
        public UserController(IUserService service)
        {
            this._service = service;
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