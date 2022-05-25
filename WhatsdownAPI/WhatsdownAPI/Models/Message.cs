using System.ComponentModel.DataAnnotations;
namespace WhatsdownAPI.Models
{
    public class Message
    {
        public int Id { get; set; }
        public Contact Sender { get; set; }
        public Contact Reciever { get; set; }
        public string Content { get; set; }
        [Required]
        public DateTime Time { get; set; }

        //public string Type { get; set; }
    }
}
