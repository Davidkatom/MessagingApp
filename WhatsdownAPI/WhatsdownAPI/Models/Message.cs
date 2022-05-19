namespace WhatsdownAPI
{
    public class Message
    {
        public string Id { get; set; }
        public bool IsSent { get; set; }
        public string? Content { get; set; }
        public DateTime? time { get; set; }
        public string? Type { get; set; }
    }
}
