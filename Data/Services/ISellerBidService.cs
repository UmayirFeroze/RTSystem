using System.Collections.Generic;

namespace RTSystem.Data
{
    public interface ISellerBidService
    {
        IEnumerable<SellerBids> GetAllSellerBids();
        SellerBids GetSellerBidsById(int sellerBidId);
        IEnumerable<SellerBids> GetSellerBidsByBuyerBidId(int buyerBidId);
        IEnumerable<SellerBids> GetSellerBidsByUserId(int userId);
        void CreateSellerBid(SellerBids sellerBid);
        void UpdateSellerBid(int sellerBidId, SellerBids sellerBid);
        void DeleteSellerBid(int sellerBidId);
    }
}