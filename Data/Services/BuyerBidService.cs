using System;
using System.Collections.Generic;
using System.Linq;


namespace RTSystem.Data
{
    public class BuyerBidService : IBuyerBidService
    {
        public List<BuyerBid> GetAllBuyerBids()
        {
            return Data.BuyerBids.ToList();
        }

        public BuyerBid GetBuyerBidById(int buyerBidId)
        {
            var BuyerBidExists = Data.BuyerBids.FirstOrDefault(n => n.buyerBidId == buyerBidId);
            if (BuyerBidExists == null)
            {
                throw new Exception("Bid Not Found");
            }
            else
            {
                return Data.BuyerBids.FirstOrDefault(n => n.buyerBidId == buyerBidId);
            }
        }
        public void CreateBuyerBid(BuyerBid buyerBid)
        {

            if (buyerBid.quality == null || buyerBid.paymentIn == null)
            {
                throw new Exception("Incomplete Fields");
            }
            else
            {
                Data.BuyerBids.Add(buyerBid);
            }
        }

        public void UpdateBuyerBid(int buyerBidId, BuyerBid buyerBid)
        {
            var buyerBidExists = Data.BuyerBids.FirstOrDefault(n => n.buyerBidId == buyerBidId);
            if (buyerBidExists != null)
            {
                // buyerBidExists.buyerBidId = buyerBid.buyerBidId;
                // buyerBidExists.userId = buyerBid.userId;
                if (buyerBid.quality != null) { buyerBidExists.quality = buyerBid.quality; }
                if (buyerBid.quantity != 0.00) { buyerBidExists.quantity = buyerBid.quantity; }
                if (buyerBid.price != 0.00) { buyerBidExists.price = buyerBid.price; }
                if (buyerBid.paymentIn != null) { buyerBidExists.paymentIn = buyerBid.paymentIn; }
                // buyerBidExists.status = buyerBid.status;
            }
            else
            {
                throw new Exception("Failed to Update");
            }
        }

        public void DeleteBuyerBid(int buyerBidId)
        {
            var buyerBidExists = Data.BuyerBids.FirstOrDefault(n => n.buyerBidId == buyerBidId);
            if (buyerBidExists == null)
            {
                throw new Exception("Bid Not Found");
            }
            else
            {
                Data.BuyerBids.Remove(buyerBidExists);
            }
        }
    }
}