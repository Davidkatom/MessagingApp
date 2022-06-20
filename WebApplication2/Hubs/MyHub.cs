using Microsoft.AspNetCore.SignalR;

public class MyHub : Hub
{
    public static MyHub Instance { get; set; }
    public static Dictionary<string, string> connectionIDs = new Dictionary<string, string>();




    public MyHub()
    {
        Instance = this;
    }

    public static MyHub GetHub()
    {
        return Instance;
    }

    public void Connect(string id)
    {
        if (id == null)
        {
            return;
        }

        connectionIDs[id] = Context.ConnectionId;
        Console.WriteLine(connectionIDs);
    }
    public async Task SentMessage(string from, string to, string content)
    {
        if (connectionIDs.ContainsKey(to))
            await Clients.Client(connectionIDs[to]).SendAsync("SentMessage", from, content);
    }

    public async Task UpdateContacts(string to)
    {
        if (connectionIDs.ContainsKey(to))
            await Clients.Client(connectionIDs[to]).SendAsync("NewContact");
    }
}

