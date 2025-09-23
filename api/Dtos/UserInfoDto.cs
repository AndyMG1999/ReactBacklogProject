using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos
{
    public class UserInfoDto
    {
        public string? UserName { get; set; } = "";
        public string? Email { get; set; } = "";
        public string? PhoneNumber { get; set; } = "";
        public bool EmailConfirmed { get; set; }
    }
}