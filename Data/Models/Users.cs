using System;
using System.Collections.Generic;

namespace RTSystem.Data
{
    public partial class Users
    {
        public Users()
        {
            BuyerBids = new HashSet<BuyerBids>();
            SellerBids = new HashSet<SellerBids>();
        }

        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string BusinessName { get; set; }
        public string BusinessDescription { get; set; }
        public string BusinessPhone { get; set; }
        public string BusinessAddress { get; set; }
        public string BusinessType { get; set; }

        public virtual ICollection<BuyerBids> BuyerBids { get; set; }
        public virtual ICollection<SellerBids> SellerBids { get; set; }
    }
}
