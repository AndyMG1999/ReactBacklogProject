using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Contexts;

namespace api.Controllers
{
    [ApiController]
    [Route("api/post")]
    public class PostController : Controller
    {
        private readonly DatabaseContext _context;

        public PostController(DatabaseContext dbContext)
        {
            _context = dbContext;
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
    }
}