namespace WhatsdownAPI.Models
{
    public class Contact
    {
        public int Id { get; set; }
        public string Contacter { get; set; }
        public string Contacted { get; set; }
        public string ContactedNickName { get; set; }
        public string Server { get; set; }        
        public string LastMessage { get; set; }
        public DateTime LastDate { get; set; }

    }
}
