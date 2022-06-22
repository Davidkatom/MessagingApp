using FirebaseAdmin;
using FirebaseAdmin.Messaging;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using WhatsdownAPI.Data;
using WhatsdownAPI.Models;
using System;
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
            WhatsdownAPI.Models.Message msg = new WhatsdownAPI.Models.Message()
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
            await SentMessage(details["from"], cont.Server, details["to"], details["content"], msg);
            return Ok();
        }
        public async Task SentMessage(string from, string fromServer, string to, string content, WhatsdownAPI.Models.Message msg)
        {
            //SIGNALR
            if (MyHub.connectionIDs.ContainsKey(to))
                await _hubContext.Clients.Client(MyHub.connectionIDs[to]).SendAsync("SentMessage", from, content);
            //FIREBASE
            if (AndroidHub.Instance.getToken(to) != null)
            {
                string androidToken = AndroidHub.Instance.getToken(to);
                // See documentation on defining a message payload.
                if (FirebaseApp.DefaultInstance == null)
                {
                    FirebaseApp.Create(new AppOptions()
                    {
                        Credential = GoogleCredential.FromFile("Hubs\\private_key.json") //CHECK THIS
                    });
                }

                var testMessage = new FirebaseAdmin.Messaging.Message()
                {
                    Data = new Dictionary<string, string>()//for sending extra data
                        {
                            { "id", msg.Id.ToString()},
                            {"fromServer", fromServer},
                            { "created", msg.Time.ToString() },
                        },
                    Token = androidToken,
                    Notification = new Notification()
                    {
                        Title = from,
                        Body = content
                    }
                };
                // Send a message to the device corresponding to the provided
                _ = FirebaseMessaging.DefaultInstance.SendAsync(testMessage).Result;
                // Response is a message ID string.
                //Console.WriteLine("Successfully sent message: " + response);


            }
        }
    }
}
