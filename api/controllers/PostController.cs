using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.controllers
{
    [ApiController]
    [Route("api/Post")]
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
    }
}