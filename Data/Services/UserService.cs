using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RTSystem.Helpers;

namespace RTSystem.Data
{
    public class UserService : IUserService
    {
        readonly RTSystemsContext _RTSystemContext;

        public UserService(RTSystemsContext systemContext)
        {
            _RTSystemContext = systemContext;
        }
        public User Authenticate(AuthenticateModel user)
        {
            var userExists = _RTSystemContext.User
                .SingleOrDefault(u => u.Email == user.email && u.Password == user.password);

            if (userExists == null)
            {
                throw new Exception("Incorrect Email or Password");
            }

            return userExists;
        }

        public IEnumerable<User> GetAllUsers()
        {
            return _RTSystemContext.User.ToList();
        }

        public User GetUserById(int userId)
        {
            var userExists = _RTSystemContext.User
                .SingleOrDefault(u => u.UserId == userId);

            if (userExists == null)
            {
                throw new Exception("User not found");
            }
            else
            {
                return userExists;
            }
        }

        public void RegisterUser(User user)
        {
            if (_RTSystemContext.User.SingleOrDefault(u => u.Email == user.Email) != null)
            {
                throw new Exception("This User Already Exists");
            }
            else if (_RTSystemContext.User.SingleOrDefault(u => u.BusinessName == user.BusinessName) != null)
            {
                throw new Exception("This Business is Already Registered");
            }
            else
            {
                _RTSystemContext.User.Add(user);
                _RTSystemContext.SaveChanges();
            }
        }

        public void UpdateUser(int userId, User user)
        {
            var userToUpdate = _RTSystemContext.User
                .Single(u => u.UserId == userId);

            if (userToUpdate == null)
            {
                throw new Exception("Failed to Update");
            }

            if (!string.IsNullOrWhiteSpace(user.FirstName))
            {
                userToUpdate.FirstName = user.FirstName; 
            }
            if (!string.IsNullOrWhiteSpace(user.LastName))
            {
                userToUpdate.LastName = user.LastName; 
            }
            if (!string.IsNullOrWhiteSpace(user.Phone))
            {
                userToUpdate.Phone = user.Phone;
            }
            if (!string.IsNullOrWhiteSpace(user.Email) && user.Email != userToUpdate.Email)
            {
                if (_RTSystemContext.User.Any(u => u.Email == user.Email))
                {
                    throw new Exception("Email is already registered");
                }

                userToUpdate.Email = user.Email;
            }
            if (!string.IsNullOrWhiteSpace(user.Password))
            {
                userToUpdate.Password = user.Password;
            }
            if (!string.IsNullOrWhiteSpace(user.BusinessName) && user.BusinessName != userToUpdate.BusinessName)
            {
                if (_RTSystemContext.User.Any(u => u.BusinessName == user.BusinessName))
                {
                    throw new Exception("Business Name is already registered");
                }

                userToUpdate.BusinessName = user.BusinessName;
            }
            if (!string.IsNullOrWhiteSpace(user.BusinessDescription))
            {
                userToUpdate.BusinessDescription = user.BusinessDescription;
            }
            if (!string.IsNullOrWhiteSpace(user.BusinessPhone))
            {
                userToUpdate.BusinessPhone = user.BusinessPhone;
            }
            if (!string.IsNullOrWhiteSpace(user.BusinessAddress))
            {
                userToUpdate.BusinessAddress = user.BusinessAddress;
            }
            if (!string.IsNullOrWhiteSpace(user.BusinessType))
            {
                userToUpdate.BusinessType = user.BusinessType;
            }

            _RTSystemContext.SaveChanges();
        }
        public void DeleteUser(int userId)
        {
            var userToDelete = _RTSystemContext.User
                .Single(u => u.UserId == userId);

            if (userToDelete == null)
            {
                throw new Exception("User Not Found");
            }

            _RTSystemContext.Remove(userToDelete);
            _RTSystemContext.SaveChanges();
        }
    }
}