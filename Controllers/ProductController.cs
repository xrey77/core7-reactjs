using Microsoft.Extensions.Options;
using core7_reactjs.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using core7_reactjs.Services;
using AutoMapper;
using core7_reactjs.Models.products;
using core7_reactjs.Entities;
using System.Linq;

namespace core7_reactjs.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize]
public class ProductController : ControllerBase
{
        private IProductService _productService;
        private IMapper _mapper;
        private readonly IWebHostEnvironment env;

        public ProductController(
                IProductService productService,
                IMapper mapper,
                IWebHostEnvironment _env,
                IOptions<AppSettings> appSettings)
        {
                _productService = productService;
                _mapper = mapper;
                env = _env;        
        }

        [AllowAnonymous]
        [HttpPost("/createproduct")]
        public IActionResult CreateProduct([FromBody]ProductModel model)
        {
            var product = _mapper.Map<Product>(model);
            try
            {
                // user.Lastname = model.Lastname;
                // user.Firstname = model.Firstname;
                // user.Email = model.Email;
                // user.Mobile = model.Mobile;
                // user.Username = model.Username;

                _productService.Create(product);
                return Ok(new {message = "Product inserted successfully."});
            }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpGet("/getallproducts/{currpage}")]
        public IActionResult GetAllProducts(int currpage)
        {
            var pagelimit = 10f;
            var pageCount = Math.Ceiling(_productService.TotalRecotds() / pagelimit);
            try {
                var prods = _productService.GetAllProducts(currpage);
                var model =  _mapper.Map<IList<ProductModel>>(prods);

                return Ok(new {products = model, CurrentPage = currpage, TotalPage = (int)pageCount});
            }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpGet("/getproduct/{id}")]
        public IActionResult GetProductById(int id)
        {
            try {
                var product = _productService.GetById(id);
                var model = _mapper.Map<ProductModel>(product);
                return Ok(model);
            }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }

        // [HttpPut("/api/updateuser/{id}"),DisableRequestSizeLimit]
        // public IActionResult Update(int id,[FromForm]UserUpdate model)
        // {

        //     // map model to entity and set id
        //     var user = _mapper.Map<User>(model);

        //     user.Id = id;
        //     user.Mobile = model.Mobile;            
        //     user.Updatedat = user.Updatedat;
        //         if (!Directory.Exists("/Resources")) {
        //             if (model.Profilepic.FileName != null) {
        //                 try {

        //                     // CREATE A NEW UNIQUE IMAGE NAME
        //                     var uniqueFileName = GetUniqueFileName(model.Profilepic.FileName, id.ToString());
        //                     var uploads = "Resources/users";
        //                     var filePath = Path.Combine(uploads,uniqueFileName);

        //                     // GET THE OLD PROFILE PICTURE
        //                     var quedelete = _userService.GetoldProfilepic(id);
        //                     Uri xfile = new Uri(quedelete);
        //                     string fileName = xfile.Segments.Last();
        //                     var oldfile = Path.Combine(uploads,fileName);

        //                     // DELETE THE OLD PROFILE PICTURE FROM Resources/users folder
        //                     FileInfo file = new FileInfo(oldfile);
        //                     if (file.Exists) {
        //                         file.Delete();
        //                     }

        //                     // CREATE THE NEW PROFILE PICTURE
        //                     user.Profilepic = "http://localhost:5006/resources/users/" + uniqueFileName;                            
        //                     model.Profilepic.CopyTo(new FileStream(filePath, FileMode.Create)); 
        //                 } catch(Exception ex) {
        //                     Console.WriteLine(ex.Message);
        //                 }
        //             }
        //         } 
                          
        //     try
        //     {
        //         _userService.Update(user, model.Password);
        //         return Ok(new {message = "Record(s) updated successuflly."});
        //     }
        //     catch (AppException ex)
        //     {
        //         return BadRequest(new { message = ex.Message });
        //     }
        // }



}