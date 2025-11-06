using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace api.Models
{
    public class AppUser : IdentityUser
    {
        // Any extra members to add to user logins go here
        public byte[]? ProfileImage { get; set; }
        [JsonIgnore]
        public List<TagUserInteraction> TagUserInteractions { get; set; } = [];
    }
}