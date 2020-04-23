using System;
using System.Collections.Generic;

namespace RTSystem.Data
{
    public partial class BuyerBids
    {
        public BuyerBids()
        {
            Orders = new HashSet<Orders>();
            SellerBids = new HashSet<SellerBids>();
        }

        public int BuyerBidId { get; set; }
        public int? UserId { get; set; }
        public string Quality { get; set; }
        public double Quantity { get; set; }
        public double Price { get; set; }
        public string PaymentIn { get; set; }
        public string Status { get; set; }
        public DateTime? TimeStamp { get; set; }

        public virtual Users User { get; set; }
        public virtual ICollection<Orders> Orders { get; set; }
        public virtual ICollection<SellerBids> SellerBids { get; set; }
    }
}
