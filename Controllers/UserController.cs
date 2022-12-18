using core7_reactjs.Models;
using Microsoft.AspNetCore.Mvc;
// using Microsoft.AspNetCore.Authorization;

namespace core7_reactjs.Controllers;

// [Authorize]
[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{

    private readonly ILogger<WeatherForecastController> _logger;

    public UserController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }
        // [AllowAnonymous]
        [HttpPost("/login")]
        public IActionResult LoginUser([FromBody]UserLogin model)
        {
            return Ok(new { username = model.Username, password = model.Password});

            // var contact = _mapper.Map<UserModel>(model);
            // try
            // {
            //     _contactService.Create(contact);
            //     return Ok(contact);
            // }
            // catch (AppException ex)
            // {
            //     return BadRequest(new { message = ex.Message });
            // }            
        }


        [HttpPost("/user/register")]
        public IActionResult RegisterUser([FromBody]UserModel model)
        {
            return Ok(new { message = "user registration...."});

            // var contact = _mapper.Map<UserModel>(model);
            // try
            // {
            //     _contactService.Create(contact);
            //     return Ok(contact);
            // }
            // catch (AppException ex)
            // {
            //     return BadRequest(new { message = ex.Message });
            // }            
        }

    [HttpGet("/getuser")]
    public IActionResult Get()
    {
        return Ok(new {message = "get user..."});
    }

}
