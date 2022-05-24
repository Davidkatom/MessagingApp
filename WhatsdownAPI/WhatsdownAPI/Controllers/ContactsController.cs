using System;
using System.Collections.Generic;
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

        public ContactsController(WhatsdownAPIContext context)
        {
            _context = context;
        }

        //Parse Contact information
        private Dictionary<string, string> ParseContact(Contact contact)
        {
            Dictionary<string, string> summerized = new();
            summerized["id"] = contact.Contacted.Id;
            summerized["name"] = contact.Contacted.NickName;
            summerized["server"] = contact.Server;
            summerized["last"] = contact.LastMessage;
            summerized["lastdate"] = contact.LastDate.ToString();

            return summerized;
        }

        // GET: api/Contacts
        [HttpGet]
        public async Task<List<Dictionary<string, string>>> GetContactRelation()
        {
            //List of all contacts of connected user
            var contacts = await _context.ContactRelation.Include(c => c.Contacter).Include(c => c.Contacted).Where(c => c.Contacter.Id == "omer").ToListAsync();
            List<Dictionary<string, string>> parsedContacts = new();
            foreach(var contact in contacts)
            {
                parsedContacts.Add(ParseContact(contact));
            }
            return parsedContacts;
        }

        // GET: api/Contacts/5
        [HttpGet("{id}")]
        public async Task<Dictionary<string, string>> GetContact(string id)
        {
            //Contact of connected user
            var contact = await _context.ContactRelation.Include(c => c.Contacter).Include(c => c.Contacted).Where(c => c.Contacter.Id == "omer").SingleAsync(c => c.Contacted.Id == id); 
            return ParseContact(contact);
        }

        // PUT: api/Contacts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContact(string id, Dictionary<string, string> updated)
        {
            var exists = await _context.ContactRelation.Include(c => c.Contacter).Include(c => c.Contacted).Where(c => c.Contacter.Id == "omer").AnyAsync(c => c.Contacted.Id == id);
            if (!exists)
            {
                return BadRequest();
            }
            var contact = await _context.ContactRelation.Include(c => c.Contacter).Include(c => c.Contacted).Where(c => c.Contacter.Id == "omer").SingleAsync(c => c.Contacted.Id == id);
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
        public async Task<ActionResult<Contact>> PostContact(Dictionary<string,string> contact)
        {
            string id = contact["id"];
            string name = contact["name"];
            string server = contact["server"];

            //Check if contact exists
            var exists = await _context.ContactRelation.Include(c => c.Contacter).Include(c => c.Contacted).Where(c => c.Contacter.Id == "omer").AnyAsync(c => c.Contacted.Id == id);
            if (exists)
            {
                return BadRequest();
            }

            Contact newContact = new Contact()
            {
                Contacted = await _context.User.FindAsync(id),
                Contacter = await _context.User.FindAsync("Omer"), //TODO change to connected user
                ContactedNickName = name,                
                Server = server,
            };
                       

            _context.ContactRelation.Add(newContact);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Contacts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            var contact = await _context.ContactRelation.FindAsync(id);
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
            //Contact of connected user
            //var contact = await _context.ContactRelation.Include(c => c.Contacter).Include(c => c.Contacted).Where(c => c.Contacter.Id == "omer").SingleAsync(c => c.Contacted.Id == id);
            var sentMesseges = await _context.Message.Where(m => m.Sender.Id == "Omer" || m.Reciever.Id == id).ToListAsync();
            var recMesseges = await _context.Message.Where(m => m.Reciever.Id == "Omer" || m.Sender.Id == id).ToListAsync();
            
            var parsedSent = new List<ParsedMessage>();
            var parsedRec = new List<ParsedMessage>();
            foreach (var message in sentMesseges)
            {
                parsedSent.Add(ParseMessage(message, true));
            }
            foreach (var message in recMesseges)
            {
                parsedRec.Add(ParseMessage(message, false));
            }

            var combined = parsedRec.Concat(parsedSent).ToList().OrderByDescending(x => x.created);
            return combined;

        }

        [HttpGet("{id}/messages/{messageId}")]
        public async Task<ActionResult<ParsedMessage>> GetMessege(string id, int messageId)
        {
            //Contact of connected user
            //var contact = await _context.ContactRelation.Include(c => c.Contacter).Include(c => c.Contacted).Where(c => c.Contacter.Id == "omer").SingleAsync(c => c.Contacted.Id == id);
            var message = await _context.Message.Include(m => m.Sender).Include(m => m.Reciever).SingleAsync(m => m.Id == messageId);

            if(message.Sender.Id != "Omer" && message.Reciever.Id != "Omer")
            {
                return BadRequest();
            }
            if (message.Sender.Id != id && message.Reciever.Id != id)
            {
                return BadRequest();
            }

            bool isSent = false;
            if (message.Sender.Id == "Omer")
                isSent = true;
            return Ok(ParseMessage(message, isSent));

            //return 
        }

        private ParsedMessage ParseMessage(Message message, bool sent)
        {
            return new ParsedMessage()
            {
                id = message.Id,
                content = message.Content,
                created = message.Time,
                sent = sent
            };
        }
        private bool ContactExists(int id)
        {
            return _context.ContactRelation.Any(e => e.Id == id);
        }
    }
}
