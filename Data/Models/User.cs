using System.ComponentModel.DataAnnotations;

namespace RTSystem.Data
{
    public class User
    {
        [Required] public int userId { get; set; }

        [Required] public string firstName { get; set; }

        [Required] public string lastName { get; set; }

        [Required] public string phone { get; set; }

        [Required] [EmailAddress] public string email { get; set; }

        [Required] public string password { get; set; }

        [Required] public string businessName { get; set; }

        public string businessDescription { get; set; }

        public string businessPhone { get; set; }

        [Required] public string businessAddress { get; set; }

        [Required] public string businessType { get; set; }

    }
}