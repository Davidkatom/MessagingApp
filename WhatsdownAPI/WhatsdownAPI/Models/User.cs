namespace WhatsdownAPI.Models
{
    public class User
    {
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public string? NickName { get; set; }
        public string? ProfilePicture { get; set; }
        public Contacts? ContactList { get; set; }
        public DateTime? CreatedDate { get; set; }

    }
}
