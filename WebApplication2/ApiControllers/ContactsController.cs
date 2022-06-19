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
    public class ContactsController : ControllerBase
    {
        private readonly WhatsdownAPIContext _context;
        private string ConnectedUser = "";

        public ContactsController(WhatsdownAPIContext context)
        {
            _context = context;
        }

        //Parse Contact information
        private Dictionary<string, string> ParseContact(Contact contact)
        {
            Dictionary<string, string> summerized = new();
            summerized["id"] = contact.Contacted;
            summerized["name"] = contact.ContactedNickName;
            summerized["server"] = contact.Server;
            summerized["last"] = contact.LastMessage;
            summerized["lastdate"] = contact.LastDate.ToString();

            return summerized;
        }
        private string GetConnectedUserId(string autho)
        {
            Dictionary<string, string> requestHeaders = new Dictionary<string, string>();
            if(autho == null) { return null; }
            var tokey = autho;
            if (autho.Contains("Bearer "))
            {
                tokey = autho.Replace("Bearer ", "");
            }
            try
            {
                var handler = new JwtSecurityTokenHandler();
                var jsonToken = handler.ReadToken(tokey);
                var tokenS = jsonToken as JwtSecurityToken;
                return tokenS.Claims.ToArray()[3].Value;
            }
            catch
            {
                return null;
            }
        }

        // GET: api/Contacts
        [HttpGet]
        public async Task<List<Dictionary<string, string>>> GetContactRelation()
        {
            ConnectedUser = GetConnectedUserId(Request.Headers["Authorization"]);

            //List of all contacts of connected user
            var contacts = await _context.ContactRelation.Where(c => c.Contacter == ConnectedUser).ToListAsync();
            List<Dictionary<string, string>> parsedContacts = new();
            foreach (var contact in contacts.OrderByDescending(x => x.LastDate))
            {
                parsedContacts.Add(ParseContact(contact));
            }
            return parsedContacts;
        }

        // GET: api/Contacts/5
        [HttpGet("{id}")]
        public async Task<Dictionary<string, string>> GetContact(string id)
        {
            ConnectedUser = GetConnectedUserId(Request.Headers["Authorization"]);
            //Contact of connected user
            var contact = await _context.ContactRelation.Where(c => c.Contacter == ConnectedUser).SingleAsync(c => c.Contacted == id);
            return ParseContact(contact);
        }

        // PUT: api/Contacts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContact(string id, Dictionary<string, string> updated)
        {
            ConnectedUser = GetConnectedUserId(Request.Headers["Authorization"]);
            var exists = await _context.ContactRelation.Where(c => c.Contacter == ConnectedUser).AnyAsync(c => c.Contacted == id);
            if (!exists)
            {
                return BadRequest();
            }
            var contact = await _context.ContactRelation.Where(c => c.Contacter == ConnectedUser).SingleAsync(c => c.Contacted == id);
            contact.ContactedNickName = updated["name"];
            contact.Server = updated["server"];

            _context.Entry(contact).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Contacts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //Creates new contact
        [HttpPost]
        public async Task<ActionResult<Contact>> PostContact(Dictionary<string, string> contact)
        {
            ConnectedUser = GetConnectedUserId(Request.Headers["Authorization"]);
            string id = contact["id"];
            string name = contact["name"];
            string server = contact["server"];

            //Check if contact exists
            var exists = await _context.ContactRelation.Where(c => c.Contacter == ConnectedUser).AnyAsync(c => c.Contacted == id);
            if (exists)
            {
                return BadRequest();
            }

            Contact newContact = new Contact()
            {
                Contacted = id,
                Contacter = ConnectedUser, //TODO change to connected user
                ContactedNickName = name,
                Server = server,
                LastDate = DateTime.Now
            };


            _context.ContactRelation.Add(newContact);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Contacts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(string id)
        {
            var contact = await _context.ContactRelation.Where(c => c.Contacter == ConnectedUser).SingleAsync(c => c.Contacted == id);
            if (contact == null)
            {
                return NotFound();
            }

            _context.ContactRelation.Remove(contact);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("{id}/messages")]
        public async Task<IEnumerable<ParsedMessage>> GetMesseges(string id)
        {
            ConnectedUser = GetConnectedUserId(Request.Headers["Authorization"]);
            //Contact of connected user
            var sentMesseges = await _context.Message.Where(m => m.Sender == ConnectedUser && m.Reciever == id).ToListAsync();

            var parsedSent = new List<ParsedMessage>();
            foreach (var message in sentMesseges)
            {
                parsedSent.Add(ParseMessage(message));
            }
            return parsedSent.ToList().OrderBy(x => x.created);

        }

        [HttpGet("{id}/messages/{messageId}")]
        public async Task<ActionResult<ParsedMessage>> GetMessege(string id, int messageId)
        {
            ConnectedUser = GetConnectedUserId(Request.Headers["Authorization"]);
            //Contact of connected user
            var message = await _context.Message.Include(m => m.Sender).Include(m => m.Reciever).SingleAsync(m => m.Id == messageId);

            if (message.Sender != ConnectedUser && message.Reciever != ConnectedUser)
            {
                return BadRequest();
            }
            if (message.Sender != id && message.Reciever != id)
            {
                return BadRequest();
            }

            return Ok(ParseMessage(message));

            //return 
        }
        [HttpPut("{id}/messages/{messageId}")]
        public async Task<ActionResult<ParsedMessage>> UpdateMessege(string id, int messageId, Dictionary<string, string> details)
        {
            ConnectedUser = GetConnectedUserId(Request.Headers["Authorization"]);
            //Contact of connected user
            var message = await _context.Message.Include(m => m.Sender).Include(m => m.Reciever).SingleAsync(m => m.Id == messageId);
            if (message == null)
            {
                return BadRequest();
            }
            if (message.Sender != ConnectedUser && message.Reciever != ConnectedUser)
            {
                return BadRequest();
            }
            if (message.Sender != id && message.Reciever != id)
            {
                return BadRequest();
            }
            message.Content = details["content"];
            _context.Entry(message).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(ParseMessage(message));

            //return 
        }

        [HttpPost("{id}/messages")]
        public async Task<IActionResult> SendMessege(string id, Dictionary<string, string> content)
        {
            ConnectedUser = GetConnectedUserId(Request.Headers["Authorization"]);
            Message msg = new Message()
            {
                Sender = ConnectedUser,
                Reciever = id,
                Content = content["content"],
                Time = DateTime.Now,
                isSent = true
            };
            Contact cont = await _context.ContactRelation.SingleAsync(c => c.Contacter == ConnectedUser && c.Contacted == id);
            cont.LastMessage = msg.Content;
            cont.LastDate = msg.Time;

            _context.Message.Add(msg);
            _context.Entry(cont).State = EntityState.Modified;
            if (msg.Reciever == null)
                return BadRequest();
            await _context.SaveChangesAsync();
            return Ok(msg.Id);
        }

        private ParsedMessage ParseMessage(Message message)
        {
            return new ParsedMessage()
            {
                id = message.Id,
                content = message.Content,
                created = message.Time,
                sent = message.isSent
            };
        }
    }
}

