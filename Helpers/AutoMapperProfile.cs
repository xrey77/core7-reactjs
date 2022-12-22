using AutoMapper;
using core7_reactjs.Entities;
// using core7_reactjs.Models;
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
            
            // CreateMap<Contact, ContactModel>();
            // CreateMap<Contact, ContactListModel>();
            // CreateMap<ContactUpdateModel, Contact>();
            // CreateMap<CompanyServices,ServiceModel>();
            // CreateMap<ServiceUpdateModel, CompanyServices>();
            // CreateMap<ForgotPassword, User>();
        }
    }
}