using System.ComponentModel.DataAnnotations;

namespace RTSystem.Data
{
    public class BuyerBids
    {
        public int buyerBidId { get; set; }
        public int userId { get; set; }
        [Required] public string quality { get; set; }
        [Required] public float quantity { get; set; }
        public float price { get; set; }
        [Required] public string paymentIn { get; set; }
        [Required] public string status { get; set; }
    }
}