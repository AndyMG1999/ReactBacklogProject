using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Dtos
{
    public class CreatePostDto
    {
        public string PostTitle { get; set; } = "";
        public List<TagDto> PostTags { get; set; } = [];
        public string PostBody { get; set; } = "";

        public CreateAttachmentDto? AttachmentDto { get; set; }
        public bool AllowMultipleResponses { get; set; }
        public string PostSendOff { get; set; } = "";
    }
}