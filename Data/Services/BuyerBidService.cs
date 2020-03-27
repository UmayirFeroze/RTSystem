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
                throw new Exception("Enter All Required Feilds");
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
                buyerBidExists.buyerBidId = buyerBid.buyerBidId;
                buyerBidExists.userId = buyerBid.userId;
                buyerBidExists.quality = buyerBid.quality;
                buyerBidExists.quantity = buyerBid.quantity;
                buyerBidExists.price = buyerBid.price;
                buyerBidExists.paymentIn = buyerBid.paymentIn;
                buyerBidExists.status = buyerBid.status;
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