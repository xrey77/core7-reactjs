using AutoMapper;
using core7_reactjs.Entities;
using core7_reactjs.Models.products;
using core7_reactjs.Models.users;

namespace core7_reactjs.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserModel>();
            CreateMap<UserRegister, User>();
            CreateMap<UserLogin, User>();
            CreateMap<UserUpdate, User>();

            CreateMap<ProductModel, Product>();
            CreateMap<Product, ProductModel>();
    

        }
    }
}