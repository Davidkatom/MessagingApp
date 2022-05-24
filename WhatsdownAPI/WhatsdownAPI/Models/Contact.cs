namespace WhatsdownAPI.Models
{
    public class Contact
    {
        public int Id { get; set; }
        public User Contacter { get; set; }
        public User Contacted { get; set; }
        public string ContactedNickName { get; set; }

    }
}
