using System;
using System.Collections.Generic;

namespace RTSystem.Data
{
    public partial class BuyerBid
    {
        public BuyerBid()
        {
            Order = new HashSet<Order>();
            SellerBid = new HashSet<SellerBid>();
        }

        public int BuyerBidId { get; set; }
        public int? UserId { get; set; }
        public string Quality { get; set; }
        public double Quantity { get; set; }
        public double Price { get; set; }
        public string PaymentIn { get; set; }
        public string Status { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<Order> Order { get; set; }
        public virtual ICollection<SellerBid> SellerBid { get; set; }
    }
}
