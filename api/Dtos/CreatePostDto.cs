using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos
{
    public class CreatePostDto
    {
        public string PostTitle { get; set; } = "";
        public string PostBody { get; set; } = "";

        public CreateAttachmentDto? AttachmentDto { get; set; }
    }
}