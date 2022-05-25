using System.ComponentModel.DataAnnotations;
namespace WhatsdownAPI.Models
{
    public class Message
    {
        public int Id { get; set; }
        public string Sender { get; set; }
        public string Reciever { get; set; }
        public string Content { get; set; }
        [Required]
        public DateTime Time { get; set; }

        //public string Type { get; set; }
    }
}
