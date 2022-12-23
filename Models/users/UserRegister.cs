using System.ComponentModel.DataAnnotations;

namespace core7_reactjs.Models.users
{
  public class UserRegister
    {        
        [Required]
        public string Firstname { get; set; }

        [Required]
        public string Lastname { get; set; }

        // [Required]
        [Required(ErrorMessage = "The Email field is required.")]
        [EmailAddress(ErrorMessage = "The Email field is not a valid email address.")]
        [Display(Name = "Email")]        
        public string Email { get; set; }
        public string Mobile { get; set; }

        [Required]
        public string Username { get; set; }

        // [Required]
        [Required(ErrorMessage = "The Password field is required.")]
        [StringLength(8, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]        
        public string Password { get; set; }

        // [DataType(DataType.Password)]
        // [Display(Name = "Confirm password")]
        // [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        // public string ConfirmPassword { get; set; }

        public string Secretkey { get; set; }

    }
}