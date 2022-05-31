using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using WhatsdownAPI.Data;
using WhatsdownAPI.Models;
namespace WhatsdownAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransferController : ControllerBase
    {
        private readonly IHubContext<MyHub> _hubContext;

        private readonly WhatsdownAPIContext _context;
        public TransferController(WhatsdownAPIContext context, IHubContext<MyHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        [HttpPost]
        public async Task<IActionResult> Transfer(Dictionary<string, string> details)
        {
            Message msg = new Message()
            {
                Sender = details["to"],
                Reciever = details["from"],
                Content = details["content"],
                Time = DateTime.Now,
                isSent = false
            };
            
            Contact cont = await _context.ContactRelation.SingleAsync(c => c.Contacter == details["to"] && c.Contacted == details["from"]);
            cont.LastMessage = msg.Content;
            cont.LastDate = msg.Time;

            _context.Message.Add(msg);
            _context.Entry(cont).State = EntityState.Modified;
            if (msg.Reciever == null)
                return BadRequest();
            await _context.SaveChangesAsync();
            await SentMessage(details["from"], details["to"], details["content"]);
            return Ok();

        }
        public async Task SentMessage(string from, string to, string content)
        {
            if (MyHub.connectionIDs.ContainsKey(to))
                await _hubContext.Clients.Client(MyHub.connectionIDs[to]).SendAsync("SentMessage", from, content);
        }
    }
}
