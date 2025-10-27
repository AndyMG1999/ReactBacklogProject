using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using api.Models.ModelEnums;

namespace api.Models
{
    public class Attachment
    {
        public int ID { get; set; }
        public AttachmentTypes? AttachmentType { get; set; }
        public string? AttachmentLink { get; set; }
        public string? WebsiteLinkTitle { get; set; }
        public string? WebsiteLinkIcon { get; set; }
        public int PostID { get; set; }

    }
}