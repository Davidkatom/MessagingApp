using Microsoft.AspNetCore.SignalR;

    public class MyHub : Hub
    {
    public static Dictionary<string, string> connectionIDs = new Dictionary<string, string>();

        public void Connect(string id) {
            connectionIDs[id] = Context.ConnectionId;
            Console.WriteLine(connectionIDs);
        }
        public async Task SentMessage(string from, string to, string content)
        {
            await Clients.Client(connectionIDs[to]).SendAsync("SentMessage",from);
            Console.WriteLine("ID:   -  " + Context.ConnectionId);
        }
    }

