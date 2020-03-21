using System.Collections.Generic;

namespace RTSystem.Data
{
    public interface IUserService
    {
        List<User> GetAllUsers();
        User GetUserById(int userId);
        void RegisterUser(User user);
        void UpdateUser(int userId, User user);
        void DeleteUser(int userId);
    }
}