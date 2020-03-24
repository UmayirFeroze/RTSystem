using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RTSystem.Helpers;

namespace RTSystem.Data
{
    public class UserService : IUserService
    {
        public async Task<User> Authenticate(AuthenticateModel user)
        {
            var userExist = await Task.Run(() => Data.Users.SingleOrDefault(x => x.email == user.email && x.password == user.password));
            if (userExist == null)
            {
                throw new Exception("Incorrect Email or Password");
            }
            // return userExist.WithoutPasswords()
            return userExist;
        }

        public List<User> GetAllUsers()
        {
            return Data.Users.ToList();
        }

        public User GetUserById(int userId)
        {
            var userExsits = Data.Users.FirstOrDefault(n => n.userId == userId);
            if (userExsits == null)
            {
                throw new Exception("User Not Found");
            }
            else
            {
                return Data.Users.FirstOrDefault(n => n.userId == userId);
            }
        }

        public void RegisterUser(User user)
        {
            bool errorFlag = false;
            if (Data.Users.FirstOrDefault(n => n.businessName == user.businessName) != null)
            {
                errorFlag = true;
                throw new Exception("This Business is Already Registered");
            }
            if (Data.Users.FirstOrDefault(n => n.email == user.email) != null)
            {
                errorFlag = true;
                throw new Exception("This User Already Exists");
            }
            if (errorFlag == false)
            {
                Data.Users.Add(user);
            }
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
            else
            {
                throw new Exception("Failed to Update");
            }
        }
        public void DeleteUser(int userId)
        {
            var userExist = Data.Users.FirstOrDefault(n => n.userId == userId);
            if (userExist == null)
            {
                throw new Exception("User Not Found");
            }
            else
            {
                Data.Users.Remove(userExist);
            }
        }
    }
}