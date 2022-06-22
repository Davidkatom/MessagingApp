using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WhatsdownAPI.Data;
using WhatsdownAPI.Models;
using Microsoft.AspNetCore.SignalR;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using FirebaseAdmin.Messaging;

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
            if(server == "http://10.0.2.2:7087")
            {
                server = "http://localhost:7087";
            }

            //Check if contact exists
            var exists = await _context.ContactRelation.Where(c => c.Contacter == to).AnyAsync(c => c.Contacted == from);
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
            //SIGNAL R
            if (MyHub.connectionIDs.ContainsKey(to))
            {
                await _hubContext.Clients.Client(MyHub.connectionIDs[to]).SendAsync("NewContact");
                Console.WriteLine(to);
            }
            else { 
                Console.WriteLine(to + "not found");
            }
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
                    //Data = new Dictionary<string, string>()//for sending extra data
                    //    {
                    //        { "id", msg.Id.ToString()  },
                    //        { "created", msg.Time.ToString() },
                    //    },
                    Token = androidToken,
                    Notification = new Notification()
                    {
                        Title = "Contact Invite",
                        Body = "Invite Body"
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
    