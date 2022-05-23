using System.ComponentModel.DataAnnotations;
namespace WhatsdownAPI.Models
{
    public class User
    {
        public string Id { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [Required]
        public string NickName { get; set; }
        public string ProfilePicture { get; set; }
    }
}
