using System;
using System.Collections.Generic;
using System.Linq;


namespace RTSystem.Data
{
    public class BuyerBidService : IBuyerBidService
    {
        readonly RTSystemContext _RTSystemContext;

        public BuyerBidService(RTSystemContext systemContext)
        {
            _RTSystemContext = systemContext;
        }
        public IEnumerable<BuyerBid> GetAllBuyerBids()
        {
            return _RTSystemContext.BuyerBid.ToList();
        }

        public BuyerBid GetBuyerBidById(int buyerBidId)
        {
            var BuyerBidExists = _RTSystemContext.BuyerBid.FirstOrDefault(n => n.BuyerBidId == buyerBidId);
            if (BuyerBidExists == null)
            {
                throw new Exception("Bid Not Found");
            }
            else
            {
                return _RTSystemContext.BuyerBid.FirstOrDefault(n => n.BuyerBidId == buyerBidId);
            }
        }

        public void CreateBuyerBid(BuyerBid buyerBid)
        {

            if (buyerBid.Quality == null || buyerBid.PaymentIn == null)
            {
                throw new Exception("Incomplete Fields");
            }
            else
            {
                _RTSystemContext.BuyerBid.Add(buyerBid);
                _RTSystemContext.SaveChanges();
            }
        }

        public void UpdateBuyerBid(int buyerBidId, BuyerBid buyerBid)
        {
            var buyerBidExists = _RTSystemContext.BuyerBid.FirstOrDefault(n => n.BuyerBidId == buyerBidId);
            if (buyerBidExists != null)
            {
                // buyerBidExists.buyerBidId = buyerBid.buyerBidId;
                // buyerBidExists.userId = buyerBid.userId;
                if (buyerBid.Quality != null) { buyerBidExists.Quality = buyerBid.Quality; }
                if (buyerBid.Quantity != 0.00) { buyerBidExists.Quantity = buyerBid.Quantity; }
                if (buyerBid.Price != 0.00) { buyerBidExists.Price = buyerBid.Price; }
                if (buyerBid.PaymentIn != null) { buyerBidExists.PaymentIn = buyerBid.PaymentIn; }
                // buyerBidExists.status = buyerBid.status;
                _RTSystemContext.SaveChanges();
            }
            else
            {
                throw new Exception("Failed to Update");
            }
        }

        public void DeleteBuyerBid(int buyerBidId)
        {
            var buyerBidExists = _RTSystemContext.BuyerBid.FirstOrDefault(n => n.BuyerBidId == buyerBidId);
            if (buyerBidExists == null)
            {
                throw new Exception("Bid Not Found");
            }
            else
            {
                _RTSystemContext.BuyerBid.Remove(buyerBidExists);
                _RTSystemContext.SaveChanges();
            }
        }
    }
}