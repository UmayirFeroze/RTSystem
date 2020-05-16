using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace RTSystem.Data
{
    public partial class ImageUploadModel
    {
        public IFormFile Image { get; set; }
    }
}
