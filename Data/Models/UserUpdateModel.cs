using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace RTSystem.Data
{
    public partial class UserUpdateModel
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string BusinessName { get; set; }
        public string BusinessDescription { get; set; }
        public string BusinessPhone { get; set; }
        public string BusinessAddress { get; set; }
        public string BusinessType { get; set; }
        
        // [FromForm(Name ="userImage")]
        public IFormFile UserImage { get; set; }

        // [FromForm(Name ="businessImage")]
        public IFormFile BusinessImage { get; set; }
    }
}
