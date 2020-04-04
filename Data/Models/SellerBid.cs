using System;
using System.Collections.Generic;

namespace RTSystem.Data
{
    public partial class SellerBid
    {
        public SellerBid()
        {
            Order = new HashSet<Order>();
        }

        public int SellerBidId { get; set; }
        public int? UserId { get; set; }
        public int? BuyerBidId { get; set; }
        public double Quantity { get; set; }
        public double Price { get; set; }
        public DateTime DeliveryDate { get; set; }
        public double? BestPrice { get; set; }
        public string Status { get; set; }
        public int ValidityPeriod { get; set; }

        public virtual BuyerBid BuyerBid { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<Order> Order { get; set; }
    }
}
