using api.Models;

namespace api.Dtos
{
    public class GetPostDto
    {
        public int ID { get; set; }
        public string PostTitle { get; set; } = "";
        public string PostBody { get; set; } = "";
        public DateTime? DateCreated { get; set; } = DateTime.Now;
        public DateTime? LastEdit { get; set; } = DateTime.Now;

        // References
        public CreatedByDto? CreatedBy { get; set; }
        public GetPostDto? ParentPost { get; set; }
        public Attachment? Attachment { get; set; }
        public List<GetPostDto> ReplyPosts { get; set; } = [];
        public List<Tag> PostTags { get; set; } = [];
    }
}