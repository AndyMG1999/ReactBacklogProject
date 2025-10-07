using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;


namespace api.Models
{
    [Index(nameof(TagName),IsUnique = true)]
    public class Tag
    {
        public int ID { get; set; }
        public string? TagName { get; set; }
    }
}