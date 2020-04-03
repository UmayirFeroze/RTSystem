using System.Collections.Generic;

namespace RTSystem.Data
{
    public interface IBuyerBidService
    {
        IEnumerable<BuyerBid> GetAllBuyerBids();
        BuyerBid GetBuyerBidById(int buyerBidId);
        void CreateBuyerBid(BuyerBid buyerBid);
        void UpdateBuyerBid(int buyerBidId, BuyerBid buyerbid);
        void DeleteBuyerBid(int buyerBidId);
    }
}