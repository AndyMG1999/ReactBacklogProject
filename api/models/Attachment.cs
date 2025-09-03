using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public enum AttachmentTypes
    {
        Souncloudlink,
        YoutubeLink,
    }
    public class Attachment
    {
        public int ID { get; set; }
        public AttachmentTypes? AttachmentType { get; set; }
        public string? AttachmentLink { get; set; }
        public int PostID { get; set; }

    }
}