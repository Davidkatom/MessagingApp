using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WhatsdownAPI.Data;
using WhatsdownAPI.Models;
namespace WhatsdownAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransferController : ControllerBase
    {
        private readonly WhatsdownAPIContext _context;
        public TransferController(WhatsdownAPIContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Transfer(Dictionary<string, string> details)
        {
            Message msg = new Message()
            {
                Sender = details["from"],
                Reciever = details["to"],
                Content = details["content"],
                Time = DateTime.Now,
                isSent = false
            };
            Contact cont = await _context.ContactRelation.SingleAsync(c => c.Contacter == details["from"] && c.Contacted == details["to"]);
            cont.LastMessage = msg.Content;
            cont.LastDate = msg.Time;

            _context.Message.Add(msg);
            _context.Entry(cont).State = EntityState.Modified;
            if (msg.Reciever == null)
                return BadRequest();
            await _context.SaveChangesAsync();
            return Ok();

        }

    }
}
