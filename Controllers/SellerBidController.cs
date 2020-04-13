using System;
using Microsoft.AspNetCore.Mvc;
using RTSystem.Data;

namespace RTSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SellerBidController : ControllerBase
    {
        private readonly ISellerBidService _service;

        public SellerBidController(ISellerBidService service)
        {
            _service = service;
        }

        [HttpGet("getSellerBids")]
        public IActionResult GetAllSellerBids()
        {
            try
            {
                var allSellerBids = _service.GetAllSellerBids();
                return Ok(allSellerBids);
            }
            catch (Exception Error)
            {
                return BadRequest(Error.Message);
            }
        }

        [HttpGet("getSellerBids/{sellerBidId}")]
        public IActionResult GetSellerBidById(int sellerBidId)
        {
            try
            {
                var sellerBid = _service.GetSellerBidsById(sellerBidId);
                return Ok(sellerBid);
            }
            catch (Exception Error)
            {
                return NotFound(Error.Message);
            }
        }

        [HttpGet("getSellerBids/buyerbid/{buyerBidId}")]
        public IActionResult GetSellerBidByBuyerBidId(int buyerBidId)
        {
            try
            {
                var sellerBid = _service.GetSellerBidsByBuyerBidId(buyerBidId);
                return Ok(sellerBid);
            }
            catch (Exception Error)
            {
                return NotFound(Error.Message);
            }
        }

        [HttpGet("getSellerBids/user/{userId}")]
        public IActionResult GetSellerBidsByUserId(int userId)
        {
            try
            {
                var sellerBids = _service.GetSellerBidsByUserId(userId);
                return Ok(sellerBids);
            }
            catch (Exception Error)
            {
                return NotFound(Error.Message);
            }
        }

        [HttpPost("createSellerBid")]
        public IActionResult CreateSellerBid([FromBody] SellerBids sellerBid)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }
                _service.CreateSellerBid(sellerBid);
                return Ok(sellerBid);
            }
            catch (Exception Error)
            {
                return BadRequest(Error.Message);
            }
        }

        [HttpPut("updateSellerBid/{sellerBidId}")]
        public IActionResult UpdateSellerBid(int sellerBidId, SellerBids sellerBid)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }
                _service.UpdateSellerBid(sellerBidId, sellerBid);
                return Ok(sellerBid);
            }
            catch (Exception Error)
            {
                return Conflict(Error.Message);
            }
        }

        [HttpDelete("deleteSellerBid/{sellerBidId}")]
        public IActionResult DeleteSellerBid(int sellerBidId)
        {
            try
            {
                _service.DeleteSellerBid(sellerBidId);
                return Ok("Successfully Deleted Seller Bid");
            }
            catch (Exception Error)
            {
                return NotFound(Error.Message);
            }
        }
    }
}
f