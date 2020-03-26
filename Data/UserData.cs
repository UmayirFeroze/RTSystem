using System.Collections.Generic;

namespace RTSystem.Data
{
    public static class Data
    {
        public static List<User> Users => allUsers;

        static List<User> allUsers = new List<User>()
        {
            new User()
            {
                userId = 1,
                firstName = "Umair",
                lastName = "Feroze",
                phone = "0769991191",
                email = "asd@asd",
                password="asd",
                businessName = "Rangamuwa Stores",
                businessPhone = "0112729729",
                businessAddress = "59/2, Peterson Lane, Wellawatte",
                businessDescription = "Dealers in Rubber and Spices",
                businessType="Dealer"
            },

            new User()
            {
                userId = 2,
                firstName = "Shuaib",
                lastName = "Feroze",
                phone = "0761661191",
                email = "shuaib@gmail.com",
                password="12344567890",
                businessName = "Rangamuwa Rubber Exporters",
                businessPhone = "0112729729",
                businessAddress = "61, Kurunegala Road, Rambukkana",
                businessDescription = "Exporters of Rubber and Spices",
                businessType="Exporter"
            }
        };

        public static List<BuyerBid> BuyerBids => allBuyerBids;

        static List<BuyerBid> allBuyerBids = new List<BuyerBid>()
        {
            new BuyerBid()
            {
                buyerBidId = 1,
                userId = 1,
                quality = "RSS1",
                quantity = 100,
                price = 100,
                status = "Pending"
            },
            new BuyerBid()
            {
                buyerBidId=2,
                userId=1,
                quality = "RSS5",
                quantity = 100,
                price = 100,
                maxPrice = 101,
                minPrice = 90,
                status = "pending"

            }
        };
    }
}