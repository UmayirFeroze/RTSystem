using System;
using System.Collections.Generic;

namespace RTSystem.Data
{
    public partial class User
    {
        public User()
        {
            BuyerBid = new HashSet<BuyerBid>();
            SellerBid = new HashSet<SellerBid>();
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
        public byte[] UserImage { get; set; }
        public byte[] BusinessImage { get; set; }

        public virtual ICollection<BuyerBid> BuyerBid { get; set; }
        public virtual ICollection<SellerBid> SellerBid { get; set; }
    }
}
