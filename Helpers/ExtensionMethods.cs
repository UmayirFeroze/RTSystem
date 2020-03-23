using System.Collections.Generic;
using System.Linq;
using RTSystem.Data;

namespace RTSystem.Helpers
{
    public static class ExtensionMethods
    {
        public static IEnumerable<User> WithoutPasswords(this IEnumerable<User> users)
        {
            return users.Select(x => x.WithoutPasswords());
        }

        public static User WithoutPasswords(this User user)
        {
            user.password = null;
            return user;
        }
    }
}