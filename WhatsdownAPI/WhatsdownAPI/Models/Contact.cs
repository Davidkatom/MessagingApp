namespace WhatsdownAPI.Models
{
    public class Contact
    {
        public int Id { get; set; }
        public User Contacter { get; set; }
        public User Contacted { get; set; }
        public string ContactedNickName { get; set; }
        public string Server { get; set; }
        
        public string LastMessage { get; set; }
        public DateTime LastDate { get; set; }


    }
}
