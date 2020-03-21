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
            var allUsers = _service.GetAllUsers();
            return Ok(allUsers);
        }

        [HttpGet("GetUsers/{userId}")]
        public IActionResult GetUser(int userId)
        {
            var user = _service.GetUserById(userId);
            return Ok(user);
        }

        [HttpPost("RegisterUser")]
        public IActionResult RegisterUser([FromBody]User user)
        {
            if (user != null)
            {
                _service.RegisterUser(user);
            }
            return Ok(user);
        }

        [HttpPut("UpdateUser/{userId}")]
        public IActionResult UpdateUser(int userId, [FromBody]User user)
        {
            _service.UpdateUser(userId, user);
            return Ok(user);
        }

        [HttpDelete("DeleteUser/{userId}")]
        public IActionResult DeleteUser(int userId)
        {
            _service.DeleteUser(userId);
            return Ok();
        }
    }
}