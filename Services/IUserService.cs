using core7_reactjs.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.Extensions.Options;
using core7_reactjs.Helpers;

namespace core7_reactjs.Services
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
        IEnumerable<User> GetAll();
        User GetById(int id);
        string GetEmailAdd(string uname);
        string GetUsername(string usrname);
        string GetoldProfilepic(int idno);
        string GetTOTP(int idno);
        User Create(User user, string password);
        void Update(User user, string password = null);
        void Delete(int id);
        void ActivateUser(int id);
        User TwoFactor(int id, string qrcode, bool enabletwofactor);
        User ValidToken(int id);
        void ChangePassword(User user);
        int SendEmailToken(string email);
        int ValidateMailtoken(int token);
    }

    public class UserService : IUserService
    {
        private DataContext _context;
        private readonly AppSettings _appSettings;

         IConfiguration config = new ConfigurationBuilder()
        .AddJsonFile("appsettings.json")
        .AddEnvironmentVariables()
        .Build();


        public UserService(DataContext context,IOptions<AppSettings> appSettings)
        {
            _context = context;
            _appSettings = appSettings.Value;
        }

        public User Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password)) {
                throw new AppException("Username and Password are required,,,");
            }
            var xuser =  _context.User.AsQueryable().FirstOrDefault(c => c.Username == username);
            if (xuser == null) {
                throw new AppException("Username does not exists...");
            }

           if (!BCrypt.Net.BCrypt.Verify(password, xuser.Password)) {
               throw new AppException("Incorrect Password...");
           }
           if (xuser.Isactivated == 0) {
               throw new AppException("Please activate your account, check your email inbox.");
           }
           return xuser;
        }

        public IEnumerable<User> GetAll()
        {
            var users = _context.User.ToList();
            return users;
        }

        public User GetById(int id)
        {
                var user = _context.User.Find(id);
                if (user == null) {
                    throw new AppException("User does'nt exists....");
                }
                return user;
        }

        public User Create(User user, string password)
        {
            // GET SECRET KEY FROM appsettings.json===========
            var tokenHandler = new JwtSecurityTokenHandler();
            var xkey = config["AppSettings:Secret"];
            var key = Encoding.ASCII.GetBytes(xkey);
            //================================================

            // CREATE SECRET KEY FOR USER TOKEN===============
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Email)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var secret = tokenHandler.CreateToken(tokenDescriptor);
            var secretkey = tokenHandler.WriteToken(secret);

            user.Secretkey = secretkey.ToUpper(); 
            //===============================================

            // if (string.IsNullOrWhiteSpace(user.Qrcodeurl)) {
            //     user.Qrcodeurl = "";
            // }

            if (string.IsNullOrWhiteSpace(user.Mobile)) {
                user.Mobile = "";
            }
            if (string.IsNullOrWhiteSpace(user.Profilepic)) {
                user.Profilepic = "";
            }

            // Validation
            if (string.IsNullOrWhiteSpace(password)) {
                throw new AppException("Password is required");
            }
            if (_context.User.Any(x => x.Email == user.Email)) {
                throw new AppException("Email Address is already taken");
            }
            if (_context.User.Any(x => x.Username == user.Username)) {
                throw new AppException("Username is already taken");
            }
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            // SAVE USER DATA TO DATABASE
            _context.User.Add(user);                
            _context.SaveChanges();
            return user;
        }

        public void Update(User userParam, string password)
        {
            var user = _context.User.Find(userParam.Id);

            if (user == null)
                throw new AppException("User not found");

            // update username if it has changed
            // if (!string.IsNullOrWhiteSpace(userParam.Username))
            // {
            //     user.Username = userParam.Username;
            // }

            if (userParam.Twofactorenabled == 1) {
                user.Twofactorenabled = 1;
            } else {
                user.Twofactorenabled = 0;
            }

            // update user properties if provided
            if (!string.IsNullOrWhiteSpace(userParam.Firstname)) {
                user.Firstname = userParam.Firstname;
            }

            if (!string.IsNullOrWhiteSpace(userParam.Lastname)) {
                user.Lastname = userParam.Lastname;
            }

            // if (!string.IsNullOrWhiteSpace(userParam.Email)) {
            //     user.Email = userParam.Email;
            // }

            if (!string.IsNullOrWhiteSpace(userParam.Mobile)) {
                user.Mobile = userParam.Mobile;
            }
            if (!string.IsNullOrWhiteSpace(userParam.Profilepic)) {
                user.Profilepic = userParam.Profilepic;
            }

            // update password if provided
            if (!string.IsNullOrWhiteSpace(userParam.Password))
            {
                 user.Password = BCrypt.Net.BCrypt.HashPassword(userParam.Password);

            }
            user.Updatedat = DateTime.Now;
            _context.User.Update(user);
            _context.SaveChanges();
            
        }

        public void Delete(int id)
        {
            var user = _context.User.Find(id);
            if (user != null)
            {
                _context.User.Remove(user);
                _context.SaveChanges();
            }
            else {
               throw new AppException("User not found");
            }
        }

       public void ActivateUser(int id) 
       {
            var user = _context.User.Find(id);
            if (user.Isblocked == 1) {
                throw new AppException("Account has been blocked.");
            }
            if ( user.Isactivated == 1) {
                throw new AppException("Account is alread activated.");
            }
            user.Isactivated = 1;
            if (user == null)
            {
                throw new AppException("User not found");
            }
            _context.User.Update(user);
            _context.SaveChanges();            
       }

        public User TwoFactor(int id, string qrcode, bool enabletwofactor)
        {
             var user = _context.User.Find(id);
             if (user != null) {
                if (enabletwofactor == true) {
                    user.Twofactorenabled = 1;
                    user.Qrcodeurl =  Base64Encode(qrcode);
                    // user.Qrcodeurl =  qrcode

                } else {
                    user.Twofactorenabled = 0;
                     user.Qrcodeurl = "";
                }
                _context.User.Update(user);
                _context.SaveChanges();
                return user;
            } 
            else {
                // return false;
               throw new AppException("User not found");
            }
           
        }

        public static string Base64Encode(string plainText) {
        var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
        return System.Convert.ToBase64String(plainTextBytes);
        }

        public User ValidToken(int id) {
             var user = _context.User.Find(id);
             if (user != null) {
                 return user;
            } else {
               throw new AppException("User not found");
            }
        }

        public void ChangePassword(User userParam)
        {
           var xuser =  _context.User.AsQueryable().FirstOrDefault(c => c.Email == userParam.Email);
           var etoken = GenerateEmailToken(xuser.Mailtoken);


            if (xuser == null) {
                throw new AppException("Email Address not found...");
            }           
            if (xuser.Username != userParam.Username)
            {
                throw new AppException("Username not found...");
            }
            if (xuser.Password == null)
            {
                throw new AppException("Please enter Password...");
            }
            xuser.Password = BCrypt.Net.BCrypt.HashPassword(userParam.Password);
            _context.User.Update(xuser);
            _context.SaveChanges();
        }

        public int SendEmailToken(string email)
        {
           var euser =  _context.User.AsQueryable().FirstOrDefault(c => c.Email == email);
           if (euser == null) {
                throw new AppException("Email Address not found...");
           }
           var etoken = GenerateEmailToken(euser.Mailtoken);
            Console.WriteLine("Mail Token : " + etoken);
            euser.Mailtoken = etoken;
            _context.User.Update(euser);
            _context.SaveChanges();
            return etoken;
        }

        public int GenerateEmailToken(int etoken)
        {
            int _min = etoken;
            int _max = 9999;
            Random _rdm = new Random();
            return _rdm.Next(_min, _max);
        }
 
        public int ValidateMailtoken(int token)
        {
           var euser =  _context.User.AsQueryable().FirstOrDefault(c => c.Mailtoken == token);
           if (euser == null) {
                throw new AppException("eEmail Token not found...");
           }
           return token;
        }

        public string GetEmailAdd(string username) {
           var xkey =  _context.User.AsQueryable().FirstOrDefault(c => c.Email == username);
           return xkey.Email;
        }

        public string GetoldProfilepic(int idno) {
            var user = _context.User.Find(idno);
           return user.Profilepic;
        }

        public string GetTOTP(int idno) {
            var user = _context.User.Find(idno);
           return user.Qrcodeurl;
        }
        public string GetUsername(string usrname) {
            var uname = _context.User.AsQueryable().FirstOrDefault(c => c.Username == usrname);
            if (uname == null) {
                throw new AppException("There is no recipient by that name");
            }
           return uname.Username;
        }


    }
}