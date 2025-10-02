using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos
{
    public class CreatedByDto
    {
        public string? Id { get; set; }
        public string? UserName { get; set; }
        public byte[]? ProfileImage { get; set; }
        public bool EmailConfirmed { get; set; }
    }
}