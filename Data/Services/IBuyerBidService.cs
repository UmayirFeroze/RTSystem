using System.Collections.Generic;

namespace RTSystem.Data
{
    public interface IBuyerBidService
    {
        IEnumerable<BuyerBids> GetAllBuyerBids();
        BuyerBids GetBuyerBidById(int buyerBidId);
        IEnumerable<BuyerBids> GetBuyerBidByUserId(int userId);
        IEnumerable<BuyerBids> GetBuyerBidNotByUserId(int userId);
        void CreateBuyerBid(BuyerBids buyerBid);
        void UpdateBuyerBid(int buyerBidId, BuyerBids buyerbid);
        void DeleteBuyerBid(int buyerBidId);
    }
}