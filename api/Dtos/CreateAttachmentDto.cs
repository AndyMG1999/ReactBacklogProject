using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models.ModelEnums;

namespace api.Dtos
{
    public class CreateAttachmentDto
    {
        public AttachmentTypes? AttachmentType { get; set; }
        public string? AttachmentLink { get; set; }
    }
}