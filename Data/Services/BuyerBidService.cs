using System;
using System.Collections.Generic;
using System.Linq;

namespace RTSystem.Data
{
    public class BuyerBidService : IBuyerBidService
    {
        readonly RTSystemsContext _RTSystemContext;

        public BuyerBidService(RTSystemsContext systemContext)
        {
            _RTSystemContext = systemContext;
        }
        public IEnumerable<BuyerBids> GetAllBuyerBids()
        {
            return _RTSystemContext.BuyerBids.ToList();
        }

        public BuyerBids GetBuyerBidById(int buyerBidId)
        {
            var BuyerBidExists = _RTSystemContext.BuyerBids.FirstOrDefault(n => n.BuyerBidId == buyerBidId);
            if (BuyerBidExists == null)
            {
                throw new Exception("Bid Not Found");
            }
            else
            {
                return _RTSystemContext.BuyerBids.FirstOrDefault(n => n.BuyerBidId == buyerBidId);
            }
        }

        public IEnumerable<BuyerBids> GetBuyerBidByUserId(int userId)
        {
            var BuyerBidExists = _RTSystemContext.BuyerBids.FirstOrDefault(n => n.UserId == userId);
            if (BuyerBidExists == null)
            {
                throw new Exception("No Bids Found");
            }
            else
            {
                return _RTSystemContext.BuyerBids.Where(n => n.UserId == userId).ToList();
            }
        }

        public IEnumerable<BuyerBids> GetBuyerBidNotByUserId(int userId)
        {
            var UserExists = _RTSystemContext.Users.FirstOrDefault(u => u.UserId == userId);
            if (UserExists == null)
            {
                throw new Exception("User does not exist");
            }
            else
            {
                return _RTSystemContext.BuyerBids.Where(n => n.UserId != userId).ToList();
            }
        }

        public void CreateBuyerBid(BuyerBids buyerBid)
        {

            if (buyerBid.Quality == null || buyerBid.PaymentIn == null)
            {
                throw new Exception("Incomplete Fields");
            }
            else
            {
                _RTSystemContext.BuyerBids.Add(buyerBid);
                _RTSystemContext.SaveChanges();
            }
        }

        public void UpdateBuyerBid(int buyerBidId, BuyerBids buyerBid)
        {
            var buyerBidExists = _RTSystemContext.BuyerBids.FirstOrDefault(n => n.BuyerBidId == buyerBidId);
            if (buyerBidExists != null)
            {
                if (buyerBid.Quality != null) { buyerBidExists.Quality = buyerBid.Quality; }
                if (buyerBid.Quantity != 0.00) { buyerBidExists.Quantity = buyerBid.Quantity; }
                if (buyerBid.Price != 0.00) { buyerBidExists.Price = buyerBid.Price; }
                if (buyerBid.PaymentIn != null) { buyerBidExists.PaymentIn = buyerBid.PaymentIn; }
                if (buyerBid.Status != null) { buyerBidExists.Status = buyerBid.Status; }
                _RTSystemContext.SaveChanges();
            }
            else
            {
                throw new Exception("Failed to Update");
            }
        }

        public void DeleteBuyerBid(int buyerBidId)
        {
            var buyerBidExists = _RTSystemContext.BuyerBids.FirstOrDefault(n => n.BuyerBidId == buyerBidId);
            if (buyerBidExists == null)
            {
                throw new Exception("Bid Not Found");
            }
            else
            {
                _RTSystemContext.BuyerBids.Remove(buyerBidExists);
                _RTSystemContext.SaveChanges();
            }
        }
    }
}