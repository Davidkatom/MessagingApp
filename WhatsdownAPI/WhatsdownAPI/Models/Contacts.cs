using System.ComponentModel.DataAnnotations;
namespace WhatsdownAPI
{
    public class Contacts
    {
        [Key]
        public string Id { get; set; }
        public Dictionary<string, string> ContactDictionary { get; set; }
        //public Dictionary<string, List<Message>> ContactDictionary { get; set; }

    }
}
