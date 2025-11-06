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
using api.Interfaces;

namespace api.Controllers
{
    [ApiController]
    [Route("api/post")]
    public class PostController : Controller
    {
        private readonly DatabaseContext _context;
        ILinkServices _linkServices;
        UserManager<AppUser> _userManager;

        public PostController(DatabaseContext dbContext, UserManager<AppUser> userManager, ILinkServices linkServices)
        {
            _context = dbContext;
            _linkServices = linkServices;
            _userManager = userManager;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            List<Post> posts = await _context.Posts.Include(e => e.CreatedBy).Include(e => e.Attachment).Include(e => e.PostTags).ToListAsync();
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
                if (tag != null)
                {
                    TagUserInteraction? interaction = await _context.TagUserInteractions.Where(interaction => interaction.Tag == tag && interaction.User == user && interaction.TagInteractionType == Models.ModelEnums.TagInteractionTypes.CreatedPostTag).FirstOrDefaultAsync();
                    if (interaction != null) interaction.Amount += 1;
                    else _context.TagUserInteractions.Add(new TagUserInteraction { Tag = tag, TagInteractionType = Models.ModelEnums.TagInteractionTypes.CreatedPostTag, User = user, Amount = 1 });
                    tag.PostsTaggedCount += 1;
                    postTags.Add(tag);
                }
                else
                {
                    Tag newTag = new Tag { TagName = tagDto.TagName, PostsTaggedCount = 1 };
                    _context.TagUserInteractions.Add(new TagUserInteraction { Tag = newTag, TagInteractionType = Models.ModelEnums.TagInteractionTypes.CreatedPostTag, User = user, Amount = 1 });
                    postTags.Add(newTag);
                    
                }
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
            if (postDto.AttachmentDto.AttachmentType == Models.ModelEnums.AttachmentTypes.Link && postDto.AttachmentDto.AttachmentLink != null)
            {
                try
                {
                    LinkMetadataDto metadataDto = await _linkServices.GetLinkMetadata(postDto.AttachmentDto.AttachmentLink);
                    newAttachment.WebsiteLinkTitle = metadataDto.LinkTitle;
                    newAttachment.WebsiteLinkIcon = metadataDto.LinkIcon;

                }
                catch (Exception e)
                {
                    Console.WriteLine($"{e}: Leaving Link Attachment Blank");
                    newAttachment.WebsiteLinkTitle = "";
                    newAttachment.WebsiteLinkIcon = "";
                }
            }
            newPost.Attachment = newAttachment;
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("TestLink")]
        public async Task<IActionResult> TestLink([FromBody] string url)
        {
            LinkMetadataDto linkMetadataDto = await _linkServices.GetLinkMetadata(url);
            return Ok(linkMetadataDto);
        }

        [HttpGet("GetTagInteractions")]
        public async Task<IActionResult> GetTagInterations()
        {
            List<TagUserInteractionDto> tagUserInteractionDtos = [];
            List<TagUserInteraction> tagUserInteractions = await _context.TagUserInteractions.Include(t => t.Tag).Include(t => t.User).ToListAsync();
            foreach (TagUserInteraction interaction in tagUserInteractions)
            {
                AppUser? user = interaction.User;
                if (user == null) continue;
                UserInfoDto userInfoDto = new UserInfoDto { UserId = user.Id, Email = user.Email, UserName = user.UserName, EmailConfirmed = user.EmailConfirmed, PhoneNumber = user.PhoneNumber, ProfileImage = user.ProfileImage};
                TagUserInteractionDto tagUserInteractionDto = new TagUserInteractionDto { ID = interaction.ID, Amount = interaction.Amount, Tag = interaction.Tag, TagInteractionType = interaction.TagInteractionType, UserInfoDto = userInfoDto };
                tagUserInteractionDtos.Add(tagUserInteractionDto);
            }
            return Ok(tagUserInteractionDtos);
        }
    }
}