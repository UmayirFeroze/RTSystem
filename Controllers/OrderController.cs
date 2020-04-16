using System;
using Microsoft.AspNetCore.Mvc;
using RTSystem.Data;

namespace RTSystem.Data
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _service;

        public OrderController(IOrderService service)
        {
            _service = service;
        }

        [HttpGet("getOrders")]
        public IActionResult GetAllOrders()
        {
            try
            {
                var allOrders = _service.GetAllOrders();
                return Ok(allOrders);
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }
        }
    }
}