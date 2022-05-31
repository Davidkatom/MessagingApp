namespace WhatsdownAPI.Models
{
    public class ParsedMessage
    {
        public int id { get; set; }
        public string content { get; set; }
        public DateTime created { get; set; }
        public bool sent { get; set; }
    }
}
