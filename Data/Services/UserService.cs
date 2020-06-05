using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RTSystem.Helpers;
using System.Text.RegularExpressions;

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
                .SingleOrDefault(u => u.Email == user.email);

            if (userExists == null || !VerifyPassword(userExists.Password, user.password))
            {
                throw new Exception("Incorrect Email or Password");
            }
            if (userExists.Status == "deactivated")
            {
                userExists.Status = "active";
            }

            _RTSystemContext.SaveChanges();

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
            string passwordPattern = @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&]{8,}$";
            bool isPasswordValid = Regex.IsMatch(user.Password, passwordPattern);
            if (user.FirstName == null || user.LastName == null || user.Phone == null || user.Email == null || user.Password == null || user.BusinessName == null || user.BusinessPhone == null || user.BusinessAddress == null || user.BusinessType == null)
            {
                throw new Exception("All Data is Required");
            }
            if ((_RTSystemContext.Users.SingleOrDefault(u => u.Email == user.Email) != null))
            {
                throw new Exception("This User Already Exists");
            }
            if (_RTSystemContext.Users.SingleOrDefault(u => u.BusinessName == user.BusinessName) != null)
            {
                throw new Exception("This Business is Already Registered");
            }
            if (user.Password.Length < 8)
            {
                throw new Exception("Password Too Short");
            }
            if (!isPasswordValid)
            {
                throw new Exception("This Password is not in correct format!");
            }

            var passwordHash = HashPassword(user.Password);
            user.Password = passwordHash;

            user.Status = "active";

            _RTSystemContext.Users.Add(user);
            _RTSystemContext.SaveChanges();
        }

        public void UpdateUser(int userId, UserUpdateModel user)
        {
            var userToUpdate = _RTSystemContext.Users
                .FirstOrDefault(u => u.UserId == userId);

            if (userToUpdate == null) { throw new Exception("Failed to Update"); }

            if (!string.IsNullOrWhiteSpace(user.FirstName)) { userToUpdate.FirstName = user.FirstName; }
            if (!string.IsNullOrWhiteSpace(user.LastName)) { userToUpdate.LastName = user.LastName; }
            if (!string.IsNullOrWhiteSpace(user.Phone)) { userToUpdate.Phone = user.Phone; }
            if (!string.IsNullOrWhiteSpace(user.Email) && user.Email != userToUpdate.Email)
            {
                if (_RTSystemContext.Users.Any(u => u.Email == user.Email)) { throw new Exception("Email is already registered"); }
                userToUpdate.Email = user.Email;
            }

            if (!string.IsNullOrWhiteSpace(user.BusinessName) && user.BusinessName != userToUpdate.BusinessName)
            {
                if (_RTSystemContext.Users.Any(u => u.BusinessName == user.BusinessName)) { throw new Exception("Business Name is already registered"); }
                userToUpdate.BusinessName = user.BusinessName;
            }

            if (!string.IsNullOrWhiteSpace(user.BusinessDescription)) { userToUpdate.BusinessDescription = user.BusinessDescription; }
            if (!string.IsNullOrWhiteSpace(user.BusinessPhone)) { userToUpdate.BusinessPhone = user.BusinessPhone; }
            if (!string.IsNullOrWhiteSpace(user.BusinessAddress)) { userToUpdate.BusinessAddress = user.BusinessAddress; }
            if (!string.IsNullOrWhiteSpace(user.BusinessType)) { userToUpdate.BusinessType = user.BusinessType; }

            _RTSystemContext.SaveChanges();
        }

        public void ResetPassword(int userId, ResetPasswordModel password)
        {
            var userToUpdate = _RTSystemContext.Users
                .FirstOrDefault(u => u.UserId == userId);

            if (userToUpdate == null)
            {
                throw new Exception("Failed to Update");
            }

            if (string.IsNullOrWhiteSpace(password.CurrentPassword) || string.IsNullOrWhiteSpace(password.NewPassword) || string.IsNullOrWhiteSpace(password.ConfirmNewPassword))
            {
                throw new Exception("All feilds required");
            }

            if (!VerifyPassword(userToUpdate.Password, password.CurrentPassword))
            {
                throw new Exception("Current password is incorrect");
            }

            if (password.CurrentPassword == password.NewPassword)
            {
                throw new Exception("Your new password cannot be the same as your current password");
            }

            if (password.NewPassword != password.ConfirmNewPassword)
            {
                throw new Exception("New password and its confirmation do not match");
            }

            var passwordHash = HashPassword(password.NewPassword);
            userToUpdate.Password = passwordHash;

            _RTSystemContext.SaveChanges();
        }

        public void UploadImage(int userId, ImageUploadModel profileImage)
        {
            var userToUpdate = _RTSystemContext.Users
                .FirstOrDefault(u => u.UserId == userId);

            if (userToUpdate == null) { throw new Exception("Failed to Update"); }
            if (profileImage.Image == null || profileImage.Image.Length < 0) { throw new Exception("No image file detected"); }

            var userImageStream = new MemoryStream();
            profileImage.Image.CopyTo(userImageStream);
            userToUpdate.UserImage = userImageStream.ToArray();

            _RTSystemContext.SaveChanges();
        }

        public void DeactivateAccount(int userId)
        {
            var userToDeactivate = _RTSystemContext.Users.FirstOrDefault(u => u.UserId == userId);

            var buyerBidCheck = _RTSystemContext.BuyerBids.Where(b => b.UserId == userId && b.Status == "open");
            var sellerBidCheck = _RTSystemContext.SellerBids.Where(s => s.UserId == userId && s.Status == "accepted");

            if (userToDeactivate == null) { throw new Exception("User Not Found"); }

            if (buyerBidCheck == null || sellerBidCheck == null) { throw new Exception("Unable to Deactivate Account!"); }

            userToDeactivate.Status = "deactivated";
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

        private static string HashPassword(string password)
        {
            var algorithm = new Rfc2898DeriveBytes(password, 16, 10000);

            var key = Convert.ToBase64String(algorithm.GetBytes(32));
            var salt = Convert.ToBase64String(algorithm.Salt);

            return $"{salt}|{key}";
        }

        private static bool VerifyPassword(string passwordHash, string password)
        {
            var parts = passwordHash.Split('|', 2);

            if (parts.Length != 2)
            {
                throw new FormatException("Unexpected hash format");
            }

            var salt = Convert.FromBase64String(parts[0]);
            var key = Convert.FromBase64String(parts[1]);

            using (var algorithm = new Rfc2898DeriveBytes(password, salt, 10000))
            {
                var keyToCheck = algorithm.GetBytes(32);

                return keyToCheck.SequenceEqual(key);
            }
        }
    }
}