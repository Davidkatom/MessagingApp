namespace WhatsdownAPI.Models
{
    public class Contact
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string NickName { get; set; }
        public List<Message> Messages { get; set; }

    }
}
