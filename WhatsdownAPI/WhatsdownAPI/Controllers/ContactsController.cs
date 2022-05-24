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

        private Dictionary<string, string> Parse(Contact contact)
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
        public async Task<ActionResult<IEnumerable<Contact>>> GetContactRelation()
        {
            return await _context.ContactRelation.Include(c => c.Contacter).Include(c => c.Contacted).Where(c => c.Contacter.Id == "omer").ToListAsync();
        }

        // GET: api/Contacts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Contact>> GetContact(string id)
        {            
            return await _context.ContactRelation.Include(c => c.Contacter).Include(c => c.Contacted).Where(c => c.Contacter.Id == "omer").SingleAsync(c => c.Contacted.Id == id); ;
        }

        // PUT: api/Contacts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContact(int id, Contact contact)
        {
            if (id != contact.Id)
            {
                return BadRequest();
            }

            _context.Entry(contact).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactExists(id))
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

        // POST: api/Contacts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Contact>> PostContact(Dictionary<string,string> contact)
        {
            string id = contact["id"];
            string name = contact["name"];
            string server = contact["server"];

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
            //string id = contact.Contacted.Id;
            //string name = contact.Contacted.NickName;

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

        private bool ContactExists(int id)
        {
            return _context.ContactRelation.Any(e => e.Id == id);
        }
    }
}
