namespace WhatsdownAPI.Models
{
    public class Message
    {
        public bool IsSent { get; set; }
        public string? Content { get; set; }
        public DateTime? time { get; set; }
        public string? Type { get; set; }
    }
}
