using core7_reactjs.Models;
using core7_reactjs.Models.users;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using core7_reactjs.Helpers;
using AutoMapper;
using core7_reactjs.Services;
using Microsoft.Extensions.Options;
using core7_reactjs.Entities;
using MimeKit;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
// using System.Net.Http.Headers;
using MailKit.Net.Smtp;
// using Google.Authenticator;
using AspNetCore.Totp;
using AspNetCore.Totp.Interface;
// using core7_reactjs.models;
// using Microsoft.AspNetCore.SignalR;
// using Microsoft.AspNetCore.SignalR;

namespace core7_reactjs.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize]
public class UserController : ControllerBase
{
        IConfiguration config = new ConfigurationBuilder()
        .AddJsonFile("appsettings.json")
        .AddEnvironmentVariables()
        .Build();


        private readonly ITotpGenerator _totpGenerator;
        private readonly ITotpSetupGenerator _totpQrGenerator;
        private readonly ITotpValidator _totpValidator;        

        private IUserService _userService;
        private IMapper _mapper;
 
        private readonly IWebHostEnvironment env;

        public UserController(
                IUserService userService,
                IMapper mapper,
                IWebHostEnvironment _env,
                IOptions<AppSettings> appSettings)
        {
            _totpGenerator = new TotpGenerator();
            _totpValidator = new TotpValidator(_totpGenerator);
            _totpQrGenerator = new TotpSetupGenerator();

            _userService = userService;
                _mapper = mapper;
                env = _env;        
        }

        [AllowAnonymous]
        [HttpPost("/login")]
        public IActionResult LoginUser([FromBody]UserLogin model)
        {
            var user = new User();
            try {
                user = _userService.Authenticate(model.Username, model.Password);
            }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }

          var tokenHandler = new JwtSecurityTokenHandler();
            var xkey = config["AppSettings:Secret"];
            var key = Encoding.ASCII.GetBytes(xkey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);
            return Ok(new
            {
                Id = user.Id,
                Username = user.Username,
                FirstName = user.Firstname,
                LastName = user.Lastname,
                Otp =user.Otp,
                role = user.Role,
                isotpenabled = user.Twofactorenabled,
                Token = tokenString,
                profilepic = user.Profilepic
            });
        }

        [AllowAnonymous]
        [HttpPost("/register")]
        public IActionResult RegisterUser([FromBody]UserRegister model)
        {
            var user = _mapper.Map<User>(model);
            try
            {
                user.Lastname = model.Lastname;
                user.Firstname = model.Firstname;
                user.Email = model.Email;
                user.Mobile = model.Mobile;
                user.Username = model.Username;

                user.Profilepic = "http://localhost:5006/resources/users/pix.png";
                _userService.Create(user, model.Password);

                // //===Send Email confirmation for account activation================
                //     string htmlmsg = "<div><p>Please click Activate button below to confirm you email address and activate your account.</p>"+
                //               "<a href=\"http://localhost:4000/activate?id=" + user.Id.ToString() + "\" style=\"background-color: green;color:white;text-decoration: none;border-radius: 20px; \">&nbsp;&nbsp; Activate Account &nbsp;&nbsp;</a></div>";

                //     MimeMessage message = new MimeMessage();
                //     MailboxAddress from = new MailboxAddress("Administrator", "rey107@gmail.com.com");
                //     message.From.Add(from);
                //     MailboxAddress to = new MailboxAddress(model.Firstname + ' ' + model.Lastname, model.Email);
                //     message.To.Add(to);
                //     message.Subject = "Account Activation";
                //     BodyBuilder bodyBuilder = new BodyBuilder();
                //     bodyBuilder.HtmlBody = htmlmsg;

                return Ok(new {message = "You have registered successfully."});
            }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("/api/getallusers")]
        public IActionResult GetAll()
        {
            try {
                var users = _userService.GetAll();
                var model = _mapper.Map<IList<UserModel>>(users);
                return Ok(model);
            }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("/api/getuser/{id}")]
        public IActionResult GetById(int id)
        {
            try {
                var user = _userService.GetById(id);
                var model = _mapper.Map<UserModel>(user);
                return Ok(model);
            }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }

        [HttpPut("/api/updateuser/{id}"),DisableRequestSizeLimit]
        public IActionResult Update(int id,[FromForm]UserUpdate model)
        {

            // map model to entity and set id
            var user = _mapper.Map<User>(model);

            user.Id = id;
            user.Mobile = model.Mobile;            
            user.Updatedat = user.Updatedat;
                if (!Directory.Exists("/Resources")) {
                    if (model.Profilepic.FileName != null) {
                        try {

                            // CREATE A NEW UNIQUE IMAGE NAME
                            var uniqueFileName = GetUniqueFileName(model.Profilepic.FileName, id.ToString());
                            var uploads = "Resources/users";
                            var filePath = Path.Combine(uploads,uniqueFileName);

                            // GET THE OLD PROFILE PICTURE
                            var quedelete = _userService.GetoldProfilepic(id);
                            Uri xfile = new Uri(quedelete);
                            string fileName = xfile.Segments.Last();
                            var oldfile = Path.Combine(uploads,fileName);

                            // DELETE THE OLD PROFILE PICTURE FROM Resources/users folder
                            FileInfo file = new FileInfo(oldfile);
                            if (file.Exists) {
                                file.Delete();
                            }

                            // CREATE THE NEW PROFILE PICTURE
                            user.Profilepic = "http://localhost:5006/resources/users/" + uniqueFileName;                            
                            model.Profilepic.CopyTo(new FileStream(filePath, FileMode.Create)); 
                        } catch(Exception ex) {
                            Console.WriteLine(ex.Message);
                        }
                    }
                } 
                          
            try
            {
                _userService.Update(user, model.Password);
                return Ok(new {message = "Record(s) updated successuflly."});
            }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        private string GetUniqueFileName(string fileName, string newfilename)
        {
            fileName = Path.GetFileName(fileName);
            return "00" + newfilename + Path.GetExtension(fileName);
        }

        [HttpDelete("/api/deleteuser/{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
               _userService.Delete(id);
                return Ok(new { message = "Record(s) deleted successfully." });
           }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }
// sendMail(model.Email,
// "Change Password Token",
// "Please copy or enter this token in forgot password option. " + etoken.ToString());

        // [HttpPost("/api/sendmail")]
        public void sendMail(string recipient, string subject, string msgBody) {
                    MimeMessage message = new MimeMessage();

                    MailboxAddress from = new MailboxAddress("Administrator", "rey107@gmail.com");
                    message.From.Add(from);

                    MailboxAddress to = new MailboxAddress("User", recipient);
                    message.To.Add(to);
                    message.Subject = subject;

                    BodyBuilder bodyBuilder = new BodyBuilder();
                    bodyBuilder.HtmlBody = msgBody;

                    // bodyBuilder.TextBody = "";
                    // bodyBuilder.Attachments.Add(env.WebRootPath + "/Users/reynald/My-Programs/DotnetCore/coremssqlapi/attachments/rey.JPG");

                    message.Body = bodyBuilder.ToMessageBody();
                    SmtpClient client = new SmtpClient();
                    client.Connect("smtp.gmail.com", 465, true);
                    client.Authenticate("rey107@gmail.com", "Reynaldo@77.88");
                    client.Send(message);
                    client.Disconnect(true);
                    client.Dispose();

                    // return Ok("Email Sent");
        }


        private static string TwoFactorKey2(TokenDocument user)
        {
            return user.secretKey+user.Email;
        }


        [AllowAnonymous]
        [HttpPut("/forgot/{email}")]
        public IActionResult ForgotPassword(string email, [FromBody]ForgotPassword model)
        {
           model.Email = email;

           var user = _mapper.Map<User>(model);
            try
            {

                _userService.ChangePassword(user);
                return Ok(new {message = "Password successfully changed.." });
            }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("/emailtoken")]
        public IActionResult EmailToken([FromBody]MailTokenModel model)
        {
           try {
             int etoken = _userService.SendEmailToken(model.Email);
            //  Console.WriteLine("Mail Token : " + etoken);
              try {
                sendMail(model.Email,"Change Password Token","Please copy or enter this token in forgot password option. " + etoken.ToString());
              } catch(Exception) {}

            return Ok(new { etoken = etoken});
           }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("/validatemailtoken")]
        public IActionResult ValidateMailtoken([FromBody]MailTokenModel model)
        {
           try {
             int etoken = _userService.ValidateMailtoken(model.Mailtoken);
            return Ok(new { etoken = etoken});
           }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


        [AllowAnonymous]
        [HttpPut("/enableqrcode/{id}")]
        public ActionResult EnableQrcode(int id, [FromBody]UserDocument model)
        {
           try {
                // QRCode qrimageurl = new QRCode()   ; 
                if (model.Isenable == true)
                {
                    var user = _userService.GetById(id);
                    model.Email = user.Email;
                    model.Secretkey = user.Secretkey;
                    var fullname = user.Firstname + " " + user.Lastname;
                    // var qrGenerator = new TotpSetupGenerator();
                    var qrCode = _totpQrGenerator.Generate(
                        issuer: fullname,
                        accountIdentity: user.ToString(),
                        accountSecretKey: user.Secretkey
                    );
                    // File(qrCode.QrCodeImageBytes, "image/png");

                    var res = _userService.TwoFactor(id,qrCode.QrCodeImage,model.Isenable);
                    return Ok(true);
                }
                else {
                    Console.WriteLine("disable");
                    var user = _userService.TwoFactor(id,"",false);
                    return Ok(false);
                }
           }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpGet("/getqrcodeurl/{id}")]
        public IActionResult GetTOTP(int id)
        {
            try {
                var user = _userService.GetById(id);
                var qrurl = Base64Decode(user.Qrcodeurl);
                var fullname = user.Firstname + " " + user.Lastname;
                var qrcodeurl = _totpQrGenerator.Generate(
                    issuer: fullname,
                    accountIdentity: user.Id.ToString(),
                    accountSecretKey: user.Secretkey
                );                                
                return Ok(qrcodeurl.QrCodeImage);
            }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPut("/validatetoken/{id}/{otp}")]
        public IActionResult ValidateToken(int id,int otp)
        {
            try {
                var user = _userService.GetById(id);
                return Ok(_totpValidator.Validate(user.Secretkey, otp));
           }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // [AllowAnonymous]
        // [HttpPost("/chat")]
        // public async Task<IActionResult> Chat([FromBody]ChatModel model)
        // {
        //     var uname = model.recipient;

        //     try {
        //         var user = _userService.GetUsername(uname);
        //         // await _clients.All.SendAsync("ReceiveMessage", model.recipient, model.chatmessage);

        //         return Ok(new {recipient = model.recipient, message = model.chatmessage});
        //    }
        //     catch (AppException ex)
        //     {
        //         return BadRequest(new { message = ex.Message });
        //     }
        // }

       public static string Base64Decode(string base64EncodedData) {
            var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
       }
        private static string TwoFactorKey(UserDocument user)
        {
            return user.Secretkey+user.Email;
        }

        // public string GenerateQrCodeUri(string email, string unformattedKey)
        // {
        //     return string.Format(
        //         AuthenticatorUriFormat,
        //         _urlEncoder.Encode("Razor Pages"),
        //         _urlEncoder.Encode(email),
        //         unformattedKey);
        // }

}
