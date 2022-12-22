using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace core7_reactjs.Entities
{

    [Table("users")]
    public class User
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        
        [Column("firstname")]
        public string Firstname { get; set; }

        [Column("lastname",TypeName ="varchar(20)")]
        public string Lastname { get; set; }
        
        [Column("email")]
        public string Email { get; set; }
        
        [Column("username")]
        public string Username { get; set; }
        
        [Column("password")]
        public string Password { get; set; }
        
        [Column("mobile")]
        public string Mobile { get; set; }
        
        [Column("profilepic")]
        public string Profilepic { get; set; }
        
        [Column("isactivated")]
        public int Isactivated { get; set; }        
        
        [Column("secretkey")]
        public string Secretkey { get; set; }
        
        [Column("role")]
        public string Role { get; set; }
        
        [Column("isblocked")]
        public int Isblocked { get; set; }
        
        // [Column("qrucodeurl"]
        public string Qrcodeurl { get; set; }
        
        [Column("otp")]
        public int Otp { get; set; }
        
        [Column("twofactorenabled")]
        public int Twofactorenabled { get; set; }
        
        [Column("otpactivation")]
        public DateTime? Otpactivation { get; set; } = default;
        
        [Column("otpexpiration")]
        public DateTime? Otpexpiration { get; set; } =  default;
        
        [Column("mailtoken")]
        public int Mailtoken {get; set;}
        // public DateTime Createdat { get; set; } = System.DateTime.Now;
        
        [Column(TypeName = "updatedat")]
        [DisplayFormat(DataFormatString = "{0:MM/dd/yy H:mm:ss}")]
        [DataType(DataType.Date)]
        public DateTime? Updatedat { get; set; }
        //{0:MM/dd/yy H:mm:ss zzz}
    }
}