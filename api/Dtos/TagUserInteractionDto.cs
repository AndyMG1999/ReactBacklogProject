using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.Models.ModelEnums;

namespace api.Dtos
{
    public class TagUserInteractionDto
    {
        public int ID { get; set; }
        public Tag? Tag { get; set; }
        public int Amount { get; set; }
        public TagInteractionTypes TagInteractionType {get; set;}
        public UserInfoDto? UserInfoDto { get; set; }
    }
}