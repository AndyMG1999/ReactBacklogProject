using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Contexts;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("/api/tag")]
    public class TagController : Controller
    {
        private readonly DatabaseContext _context;
        public TagController(DatabaseContext dbContext)
        {
            _context = dbContext;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            List<Tag> tags = await _context.Tags.ToListAsync();
            if (tags == null) return BadRequest();
            return Ok(tags);
        }
    }
}