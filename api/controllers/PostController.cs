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
            var posts = await _context.Posts.ToListAsync();
            return Ok(posts);
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

            Post newPost = new Post
            {
                PostTitle = postDto.PostTitle,
                PostBody = postDto.PostBody,
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