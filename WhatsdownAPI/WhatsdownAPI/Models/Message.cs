namespace WhatsdownAPI
{
    public class Message
    {
        public int Id { get; set; }
        public string Sender { get; set; }
        public string Reciever { get; set; }
        public string Content { get; set; }
        public DateTime Time { get; set; }
        //public string Type { get; set; }
    }
}
