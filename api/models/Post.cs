using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Post
    {
        public int ID { get; set; }
        public string PostTitle { get; set; } = "";
        public string PostBody { get; set; } = "";
        public int PostLikeCount { get; set; } = 0;
        public int PostReplyCount { get; set; } = 0;
        public DateTime? DateCreated { get; set; } = DateTime.Now;
        public DateTime? LastEdit { get; set; } = DateTime.Now;

        // References
        public AppUser? CreatedBy { get; set; }
        public Post? ParentPost { get; set; }
        public Attachment? Attachment { get; set; }
        public List<Post> ReplyPosts { get; set; } = [];
        public List<Tag> PostTags { get; set; } = [];
    }
}