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
        void UpdateUser(int userId, Users user);
        void DeleteUser(int userId);
    }
}