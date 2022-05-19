namespace WhatsdownAPI
{
    public class Message
    {
        public int Id { get; set; }
        public bool IsSent { get; set; }
        public string? Content { get; set; }
        public DateTime? Time { get; set; }
        public string? Type { get; set; }
    }
}
