
namespace core7_reactjs.Models.users
{
  public class UserModel
    {
        public int Id { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Mobile { get; set; }
        public string Profilepic { get; set; }
        public int Isactivated { get; set; }        
        public int Isblocked { get; set; }
        public string Qrcodeurl { get; set; }
        public int Otp { get; set; }
        public bool Twofactorenabled { get; set; }
        public DateTime? Otpactivation { get; set; } = default;
        public DateTime? Otpexpiration { get; set; } = default;
    }
}