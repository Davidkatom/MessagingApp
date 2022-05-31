using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WhatsdownAPI.Data;
using WhatsdownAPI.Models;
using Microsoft.AspNetCore.SignalR;

namespace WhatsdownAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvitationsController : ControllerBase
    {
        private readonly WhatsdownAPIContext _context;
        private readonly IHubContext<MyHub> _hubContext;

        public InvitationsController(WhatsdownAPIContext context, IHubContext<MyHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        [HttpPost]
        public async Task<IActionResult> Invite(Dictionary<string, string> details)
        {
            string from = details["from"];
            string to = details["to"];
            string server = details["server"];

            //Check if contact exists
            var exists = await _context.ContactRelation.Where(c => c.Contacter == from).AnyAsync(c => c.Contacted == to);
            if (exists)
            {
                return BadRequest();
            }

            Contact newContact = new Contact()
            {
                Contacted = from,
                Contacter = to,
                ContactedNickName = from,
                Server = server,
                LastDate = DateTime.Now
            };


            _context.ContactRelation.Add(newContact);
            await _context.SaveChangesAsync();
            await UpdateContacts(to);
            return NoContent();
        }

        public async Task UpdateContacts(string to)
        {
            if (MyHub.connectionIDs.ContainsKey(to))
            {
                await _hubContext.Clients.Client(MyHub.connectionIDs[to]).SendAsync("NewContact");
                Console.WriteLine(to);
            }
            else
                Console.WriteLine(to + "not found");
        }

    }
}
