using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WhatsdownAPI.Data;
using WhatsdownAPI.Models;

namespace WhatsdownAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class UsersController : ControllerBase
    {
        private readonly WhatsdownAPIContext _context;

        public UsersController(WhatsdownAPIContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUser()
        {
            return await _context.User.ToListAsync();
        }

        [HttpGet("GetAllHeaders")]
        public ActionResult<Dictionary<string, string>> GetAllHeaders()
        {
            Dictionary<string, string> requestHeaders =
               new Dictionary<string, string>();
            foreach (var header in Request.Headers)
            {
                requestHeaders.Add(header.Key, header.Value);
            }
            return requestHeaders;
        }
        [HttpGet("GetHeaderData")]
        public ActionResult<string> GetHeaderData(string headerKey)
        {
            Request.Headers.TryGetValue(headerKey, out var headerValue);
            return Ok(headerValue);
        }
        // GET: api/Users/Me
        [HttpGet("Me")]
        //public async Task<Dictionary<string,string>> GetMe()
        public Dictionary<string, string> GetUserMe()
        {
            Dictionary<string, string> requestHeaders =new Dictionary<string, string>();
            string autho = Request.Headers["Authorization"];
            var tokey = autho.Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            try
            {
                var jsonToken = handler.ReadToken(tokey);
                var tokenS = jsonToken as JwtSecurityToken;
                var me_userid = tokenS.Claims.ToArray()[3].Value;
                var foundUser = _context.User.Where(c => c.Id == me_userid).ToList().First();
                
                return new Dictionary<string, string>()
                {
                    {"Error",""},
                    {"Id",me_userid },
                    {"NickName",foundUser.NickName},
                    {"ProfilePicture", foundUser.ProfilePicture}
                };
            }
            catch{
                return new Dictionary<string, string>()
                {
                    {"Error","Authontication Error"},
                };
            }
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(string id)
        {
            var user = await _context.User.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(string id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754

        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.User.Add(user);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserExists(user.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.User.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(string id)
        {
            return _context.User.Any(e => e.Id == id);
        }
    }
}
