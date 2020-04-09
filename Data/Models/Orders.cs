using System;
using System.Collections.Generic;

namespace RTSystem.Data

{
    public partial class Orders
    {
        public int OrderId { get; set; }
        public int? BuyerBidId { get; set; }
        public int? SellerBidId { get; set; }

        public virtual BuyerBids BuyerBid { get; set; }
        public virtual SellerBids SellerBid { get; set; }
    }
}
