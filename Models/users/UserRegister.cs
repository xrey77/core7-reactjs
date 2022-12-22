using System.ComponentModel.DataAnnotations;

namespace core7_reactjs.Models.users
{
  public class UserRegister
    {        
        [Required]
        public string Firstname { get; set; }

        [Required]
        public string Lastname { get; set; }

        [Required]
        public string Email { get; set; }
        public string Mobile { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
        public string Secretkey { get; set; }

    }
}