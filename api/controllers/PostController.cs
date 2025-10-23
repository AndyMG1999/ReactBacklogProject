using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Contexts;
using Microsoft.AspNetCore.Authorization;
using api.Dtos;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace api.Controllers
{
    [ApiController]
    [Route("api/post")]
    public class PostController : Controller
    {
        private readonly DatabaseContext _context;
        UserManager<AppUser> _userManager;

        public PostController(DatabaseContext dbContext, UserManager<AppUser> userManager)
        {
            _context = dbContext;
            _userManager = userManager;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            List<Post> posts = await _context.Posts.Include(e=>e.CreatedBy).Include(e=>e.Attachment).Include(e=>e.PostTags).ToListAsync();
            List<GetPostDto> postDtos = [];
            foreach (Post post in posts)
            {
                CreatedByDto createdByDto = new CreatedByDto { Id = post.CreatedBy?.Id, UserName = post.CreatedBy?.UserName, ProfileImage = post.CreatedBy?.ProfileImage, EmailConfirmed = post.CreatedBy?.EmailConfirmed ?? false };
                GetPostDto getPostDto = new GetPostDto { ID = post.ID, PostTitle = post.PostTitle, PostBody = post.PostBody, PostLikeCount = post.PostLikeCount, PostReplyCount = post.PostReplyCount, Attachment = post.Attachment, DateCreated = post.DateCreated, LastEdit = post.DateCreated, CreatedBy = createdByDto, PostTags = post.PostTags };
                postDtos.Add(getPostDto);
            }
            return Ok(postDtos);
        }

        [HttpGet("Get/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            Post? post = await _context.Posts.FindAsync(id);
            if (post == null) return NotFound();

            return Ok(post);
        }

        [Authorize]
        [HttpPost("Create")]
        public async Task<IActionResult> CreatePost([FromBody] CreatePostDto postDto)
        {
            string? userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            if (userEmail == null) return BadRequest();

            AppUser? user = await _userManager.FindByEmailAsync(userEmail);
            if (user == null) return BadRequest();

            List<Tag> postTags = [];
            foreach (TagDto tagDto in postDto.PostTags)
            {
                Tag? tag = await _context.Tags.Where(tag => tag.TagName == tagDto.TagName).FirstOrDefaultAsync();
                if (tag != null) postTags.Add(tag);
                else postTags.Add(new Tag { TagName = tagDto.TagName });
            }

            Post newPost = new Post
            {
                PostTitle = postDto.PostTitle,
                PostTags = postTags,
                PostBody = postDto.PostBody,
                PostSendOff = postDto.PostSendOff,
                AllowMultipleResponses = postDto.AllowMultipleResponses,
                DateCreated = DateTime.Now,
                LastEdit = DateTime.Now,
                CreatedBy = user,
            };
            await _context.Posts.AddAsync(newPost);
            await _context.SaveChangesAsync();

            if (postDto.AttachmentDto == null) return Ok();
            Attachment newAttachment = new Attachment { };
            newAttachment.PostID = newPost.ID;
            newAttachment.AttachmentType = postDto.AttachmentDto.AttachmentType;
            newAttachment.AttachmentLink = postDto.AttachmentDto.AttachmentLink;
            newPost.Attachment = newAttachment;
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}