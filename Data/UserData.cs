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
                email = "umayir10@gmail.com",
                password="12344567890",
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
    }
}