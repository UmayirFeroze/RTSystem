using System;
using System.Collections.Generic;

namespace RTSystem.Data
{
    public partial class SellerBids
    {
        public SellerBids()
        {
            Orders = new HashSet<Orders>();
        }

        public int SellerBidId { get; set; }
        public int? UserId { get; set; }
        public int? BuyerBidId { get; set; }
        public double Quantity { get; set; }
        public double Price { get; set; }
        public DateTime DeliveryDate { get; set; }
        public DateTime ValidityPeriod { get; set; }
        public double? BestPrice { get; set; }
        public string Status { get; set; }

        public virtual BuyerBids BuyerBid { get; set; }
        public virtual Users User { get; set; }
        public virtual ICollection<Orders> Orders { get; set; }
    }
}
