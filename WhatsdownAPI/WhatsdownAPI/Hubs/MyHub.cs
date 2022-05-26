using Microsoft.AspNetCore.SignalR;

    public class MyHub : Hub
    {
        public async Task SentMessage()
        {
            await Clients.All.SendAsync("SentMessage");
        }
    }

