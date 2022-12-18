
namespace core7_reactjs.Models
{
  public class UserModel
    {
        public int Id { get; set; }
        public string Firstname { get; set; } = default!;
        public string Lastname { get; set; } = default!;
        public string Email { get; set; } = default!;
        public string Mobile { get; set; } = default!;
        public string Username { get; set; } = default!;
        public string Password { get; set; } = default!;
        public string Profilepic { get; set; } = default!;
        public bool TwoFactorEnabled { get; set; } = default!;
       public string Qrcodeurl { get; set; } = default!;
 

    }
}