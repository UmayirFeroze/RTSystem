using System.Collections.Generic;
using System.Threading.Tasks;

namespace RTSystem.Data
{
    public interface IUserService
    {
        Task<User> Authenticate(string email, string password);
        List<User> GetAllUsers();
        User GetUserById(int userId);
        void RegisterUser(User user);
        void UpdateUser(int userId, User user);
        void DeleteUser(int userId);
    }
}