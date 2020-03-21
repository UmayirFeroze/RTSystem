using System.Collections.Generic;
using System.Linq;

namespace RTSystem.Data
{
    public class UserService : IUserService
    {

        public List<User> GetAllUsers()
        {
            return Data.Users.ToList();
        }

        public User GetUserById(int userId)
        {
            return Data.Users.FirstOrDefault(n => n.userId == userId);
        }

        public void RegisterUser(User user)
        {
            Data.Users.Add(user);
        }

        public void UpdateUser(int userId, User user)
        {
            var userExist = Data.Users.FirstOrDefault(n => n.userId == userId);
            if (userExist != null)
            {
                userExist.firstName = user.firstName;
                userExist.lastName = user.lastName;
                userExist.phone = user.phone;
                userExist.email = user.email;
                userExist.password = user.password;
                userExist.businessName = user.businessName;
                userExist.businessDescription = user.businessDescription;
                userExist.businessPhone = user.businessPhone;
                userExist.businessAddress = user.businessAddress;
                userExist.businessType = user.businessType;
            }
        }
        public void DeleteUser(int userId)
        {
            var user = Data.Users.FirstOrDefault(n => n.userId == userId);
            if (user != null)
            {
                Data.Users.Remove(user);
            }
        }
    }
}