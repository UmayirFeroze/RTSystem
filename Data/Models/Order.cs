using System;
using System.Collections.Generic;

namespace RTSystem.Data
{
    public partial class Order
    {
        public int OrderId { get; set; }
        public int? BuyerBidId { get; set; }
        public int? SellerBidId { get; set; }

        public virtual BuyerBid BuyerBid { get; set; }
        public virtual SellerBid SellerBid { get; set; }
    }
}
