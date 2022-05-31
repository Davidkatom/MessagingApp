using System.ComponentModel.DataAnnotations;
namespace WhatsdownAPI.Models
{
    public class User
    {
        [StringLength(10, MinimumLength = 3, ErrorMessage = "NickName Length must be between 3 and 10")]
        public string Id { get; set; }
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [Required]
        [StringLength(10, MinimumLength = 3, ErrorMessage = "NickName Length must be between 3 and 10")]
        public string NickName { get; set; }
        public string ProfilePicture { get; set; }
    }
}
