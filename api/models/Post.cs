using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Post
    {
        public int ID;
        public string? PostTitle;
        public string? PostBody;
        public DateTime? DateCreated;
        public DateTime? LastEdit;

        // References
        public int CreatedBy;
        public Post? ParentPost;
        public ICollection<Post>? ReplyPosts;
    }
}