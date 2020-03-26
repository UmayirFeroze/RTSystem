using System.ComponentModel.DataAnnotations;

namespace RTSystem.Data
{
    public class BuyerBid
    {
        [Required] public int buyerBidId { get; set; }
        [Required] public int userId { get; set; }
        [Required] public string quality { get; set; }
        [Required] public int quantity { get; set; }
        public int price { get; set; }
        public int maxPrice { get; set; }
        public int minPrice { get; set; }
        public string paymentIn { get; set; }
        [Required] public string status { get; set; }
    }
}