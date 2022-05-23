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
    public class ContactRelationsController : ControllerBase
    {
        private readonly WhatsdownAPIContext _context;

        public ContactRelationsController(WhatsdownAPIContext context)
        {
            _context = context;
        }

        // GET: api/ContactRelations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactRelation>>> GetContactRelation()
        {
            return await _context.ContactRelation.ToListAsync();
        }

        // GET: api/ContactRelations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ContactRelation>> GetContactRelation(int id)
        {
            var contactRelation = await _context.ContactRelation.FindAsync(id);

            if (contactRelation == null)
            {
                return NotFound();
            }

            return contactRelation;
        }

        // PUT: api/ContactRelations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContactRelation(int id, ContactRelation contactRelation)
        {
            if (id != contactRelation.Id)
            {
                return BadRequest();
            }

            _context.Entry(contactRelation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactRelationExists(id))
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

        // POST: api/ContactRelations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ContactRelation>> PostContactRelation(ContactRelation contactRelation)
        {
            _context.ContactRelation.Add(contactRelation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetContactRelation", new { id = contactRelation.Id }, contactRelation);
        }

        // DELETE: api/ContactRelations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContactRelation(int id)
        {
            var contactRelation = await _context.ContactRelation.FindAsync(id);
            if (contactRelation == null)
            {
                return NotFound();
            }

            _context.ContactRelation.Remove(contactRelation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ContactRelationExists(int id)
        {
            return _context.ContactRelation.Any(e => e.Id == id);
        }
    }
}
