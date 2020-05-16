using System.Collections.Generic;
using System.Threading.Tasks;

namespace RTSystem.Data
{
    public interface IUserService
    {
        Users Authenticate(AuthenticateModel user);
        IEnumerable<Users> GetAllUsers();
        Users GetUserById(int userId);
        void RegisterUser(Users user);
        void UpdateUser(int userId, UserUpdateModel user);
        void ResetPassword(int userId, ResetPasswordModel password);
        void UploadImage(int userId, ImageUploadModel profileImage);
        void DeactivateAccount(int userId);
        void DeleteUser(int userId);
    }
}