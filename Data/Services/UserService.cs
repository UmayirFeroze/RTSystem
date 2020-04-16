using System;
using System.IO;
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
        public Users Authenticate(AuthenticateModel user)
        {
            var userExists = _RTSystemContext.Users
                .SingleOrDefault(u => u.Email == user.email && u.Password == user.password);

            if (userExists == null)
            {
                throw new Exception("Incorrect Email or Password");
            }

            return userExists;
        }

        public IEnumerable<Users> GetAllUsers()
        {
            return _RTSystemContext.Users.ToList();
        }

        public Users GetUserById(int userId)
        {
            var userExists = _RTSystemContext.Users.FirstOrDefault(u => u.UserId == userId);
            if (userExists == null)
            {
                throw new Exception("User not Found");
            }
            else
            {
                return userExists;
            }
        }

        public void RegisterUser(Users user)
        {

            if (user.FirstName == null || user.LastName == null || user.Phone == null || user.Email == null || user.Password == null || user.BusinessName == null || user.BusinessPhone == null || user.BusinessAddress == null || user.BusinessType == null)
            {
                throw new Exception("All Data is Required");
            }
            if ((_RTSystemContext.Users.SingleOrDefault(u => u.Email == user.Email) != null))
            {
                throw new Exception("This User Already Exists");
            }
            else if (_RTSystemContext.Users.SingleOrDefault(u => u.BusinessName == user.BusinessName) != null)
            {
                throw new Exception("This Business is Already Registered");
            }
            else
            {
                _RTSystemContext.Users.Add(user);
                _RTSystemContext.SaveChanges();
            }
        }

        public void UpdateUser(int userId, UserUpdateModel user)
        {
            var userToUpdate = _RTSystemContext.Users
                .FirstOrDefault(u => u.UserId == userId);

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
                if (_RTSystemContext.Users.Any(u => u.Email == user.Email))
                {
                    throw new Exception("Email is already registered");
                }

                userToUpdate.Email = user.Email;
            }
            if (!string.IsNullOrWhiteSpace(user.CurrentPassword) && !string.IsNullOrWhiteSpace(user.NewPassword))
            {
                if (user.CurrentPassword != userToUpdate.Password)
                {
                    throw new Exception("Current Password is Incorrect");
                }

                userToUpdate.Password = user.NewPassword;
            }
            if (!string.IsNullOrWhiteSpace(user.BusinessName) && user.BusinessName != userToUpdate.BusinessName)
            {
                if (_RTSystemContext.Users.Any(u => u.BusinessName == user.BusinessName))
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
            if (user.UserImage != null && user.UserImage.Length > 0)
            {
                var userImageStream = new MemoryStream();
                user.UserImage.CopyTo(userImageStream);
                userToUpdate.UserImage = userImageStream.ToArray();
            }
            if (user.BusinessImage != null && user.BusinessImage.Length > 0)
            {
                var businessImageStream = new MemoryStream();
                user.BusinessImage.CopyTo(businessImageStream);
                userToUpdate.BusinessImage = businessImageStream.ToArray();
            }

            _RTSystemContext.SaveChanges();
        }
        public void DeleteUser(int userId)
        {
            var userToDelete = _RTSystemContext.Users.FirstOrDefault(u => u.UserId == userId);

            if (userToDelete == null)
            {
                throw new Exception("User Not Found");
            }

            _RTSystemContext.Remove(userToDelete);
            _RTSystemContext.SaveChanges();
        }
    }
}