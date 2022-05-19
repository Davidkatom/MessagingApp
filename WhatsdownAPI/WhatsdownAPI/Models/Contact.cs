namespace WhatsdownAPI.Models
{
    public class Contact
    {
        public string? Id { get; set; }
        public string? Name { get; set; }
        public List<Message>? Messages { get; set; }

    }
}
