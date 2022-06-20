public sealed class AndroidHub
{
    AndroidHub() { }
    private Dictionary<string, string> FireBaseTokens = new Dictionary<string, string>();
    private static AndroidHub instance = null;

    public static AndroidHub Instance
    {
        get
        {
            if (instance == null)
            {
                instance = new AndroidHub();
            }
            return instance;
        }
    }
    public void addToken(string androidToken, string userId)
    {
        lock (FireBaseTokens)
        {
            FireBaseTokens[userId] = androidToken;
        }
    }
    public string getToken(string userId)
    {
        if (FireBaseTokens.ContainsKey(userId))
        {
            return FireBaseTokens[userId];
        }
        else
        {
            return null;
        }
    }
}