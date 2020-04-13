using System;
using System.Collections.Generic;
using System.Linq;

namespace RTSystem.Data
{
    public class SellerBidService : ISellerBidService
    {
        readonly RTSystemsContext _RTSystemContext;

        public SellerBidService(RTSystemsContext systemsContext)
        {
            _RTSystemContext = systemsContext;
        }
        public IEnumerable<SellerBids> GetAllSellerBids()
        {
            return _RTSystemContext.SellerBids.ToList();
        }
        public SellerBids GetSellerBidsById(int sellerBidId)
        {
            var SellerBidExist = _RTSystemContext.SellerBids.FirstOrDefault(s => s.SellerBidId == sellerBidId);
            if (SellerBidExist == null)
            {
                throw new Exception("Bid Not Found");
            }
            else
            {
                return _RTSystemContext.SellerBids.FirstOrDefault(s => s.SellerBidId == sellerBidId);
            }
        }

        public IEnumerable<SellerBids> GetSellerBidsByBuyerBidId(int buyerBidId)
        {
            var SellerBidExist = _RTSystemContext.SellerBids.FirstOrDefault(s => s.BuyerBidId == buyerBidId);
            if (SellerBidExist == null)
            {
                throw new Exception("Bid Not Found");
            }
            else
            {
                return _RTSystemContext.SellerBids.Where(s => s.BuyerBidId == buyerBidId).ToList();
            }
        }

        public IEnumerable<SellerBids> GetSellerBidsByUserId(int userId)
        {
            var SellerBidExist = _RTSystemContext.SellerBids.FirstOrDefault(s => s.UserId == userId);
            if (SellerBidExist == null)
            {
                throw new Exception("Bid Not Found");
            }
            else
            {
                return _RTSystemContext.SellerBids.Where(s => s.UserId == userId).ToList();
            }
        }
        public void CreateSellerBid(SellerBids sellerBid)
        {
            if (sellerBid == null)
            {
                throw new Exception("Incomplete Fields");
            }
            else
            {
                _RTSystemContext.SellerBids.Add(sellerBid);
                _RTSystemContext.SaveChanges();
            }
        }

        public void UpdateSellerBid(int sellerBidId, SellerBids sellerBid)
        {
            var sellerBidExist = _RTSystemContext.SellerBids.FirstOrDefault(s => s.SellerBidId == sellerBidId);
            if (sellerBidExist == null)
            {
                if (sellerBid.Price != 00.00) { sellerBidExist.Price = sellerBid.Price; }
                if (sellerBid.Quantity != 00.00) { sellerBidExist.Quantity = sellerBid.Quantity; }
                if (sellerBid.DeliveryDate != null) { sellerBidExist.DeliveryDate = sellerBid.DeliveryDate; }
                if (sellerBid.ValidityPeriod != null) { sellerBidExist.ValidityPeriod = sellerBid.ValidityPeriod; }
                // to be completed and ammendded
            }
            else
            {
                throw new Exception("Failed to Update");
            }
        }

        public void DeleteSellerBid(int sellerBidId)
        {
            var sellerBidExist = _RTSystemContext.SellerBids.FirstOrDefault(n => n.SellerBidId == sellerBidId);
            if (sellerBidExist == null)
            {
                throw new Exception("Bid Not Found");
            }
            else
            {
                _RTSystemContext.SellerBids.Remove(sellerBidExist);
                _RTSystemContext.SaveChanges();
            }
        }

    }
}