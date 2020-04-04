using System;
using Microsoft.AspNetCore.Mvc;
using RTSystem.Data;

namespace RTSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BuyerBidController : ControllerBase
    {
        private readonly IBuyerBidService _service;
        public BuyerBidController(IBuyerBidService service)
        {
            this._service = service;
        }

        [HttpGet("getbuyerbids")]
        public IActionResult GetAllBuyerBids()
        {
            try
            {
                var allBuyerBids = _service.GetAllBuyerBids();
                return Ok(allBuyerBids);
            }
            catch (Exception getAllBidError)
            {
                return BadRequest(getAllBidError.Message);
            }

        }

        [HttpGet("getbuyerbids/{buyerBidId}")]
        public IActionResult GetBuyerBidById(int buyerBidId)
        {
            try
            {
                var buyerBid = _service.GetBuyerBidById(buyerBidId);
                return Ok(buyerBid);
            }
            catch (Exception getBuyerBidByIdError)
            {
                return NotFound(getBuyerBidByIdError.Message);
            }
        }

        [HttpPost("createBuyerBid")]
        public IActionResult CreateBuyerBid([FromBody]BuyerBid buyerBid)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }
                
                _service.CreateBuyerBid(buyerBid);
                return Ok(buyerBid);
            }
            catch (Exception createBidError)
            {
                return BadRequest(createBidError.Message);
            }


        }

        [HttpPut("updateBuyerBid/{buyerBidId}")]
        public IActionResult UpdateBuyerBid(int buyerBidId, BuyerBid buyerBid)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }

                _service.UpdateBuyerBid(buyerBidId, buyerBid);
                return Ok(buyerBid);
            }
            catch (Exception updateBidError)
            {
                return Conflict(updateBidError.Message);
            }
        }

        [HttpDelete("deleteBuyerBid/{buyerBidId}")]
        public IActionResult DeleteBuyerBid(int buyerBidId)
        {
            try
            {
                _service.DeleteBuyerBid(buyerBidId);
                return Ok("Successfully Deleted Bid");
            }
            catch (Exception deleteBidError)
            {
                return NotFound(deleteBidError.Message);
            }

        }
    }
}